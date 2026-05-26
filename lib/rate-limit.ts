/**
 * Supabase-based rate limiter — no Redis needed.
 *
 * Requires a `rate_limits` table in Supabase:
 *
 *   CREATE TABLE IF NOT EXISTS rate_limits (
 *     id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
 *     identifier   TEXT        NOT NULL,          -- user_id or IP
 *     endpoint     TEXT        NOT NULL,
 *     window_start TIMESTAMPTZ NOT NULL,          -- truncated to the window hour
 *     count        INTEGER     NOT NULL DEFAULT 0,
 *     UNIQUE (identifier, endpoint, window_start)
 *   );
 *   CREATE INDEX IF NOT EXISTS rate_limits_lookup
 *     ON rate_limits (identifier, endpoint, window_start);
 *
 * Run this SQL once in Supabase SQL Editor.
 */

import { createClient } from "@supabase/supabase-js";

// Limits per endpoint key (requests per window)
export const RATE_LIMITS: Record<string, { max: number; windowHours: number }> =
  {
    openai: { max: 15, windowHours: 1 },          // 15 AI test generations per hour
    "predict-difficulty": { max: 200, windowHours: 1 }, // 200 ML predictions per hour
    feedback: { max: 5, windowHours: 1 },           // 5 feedback submissions per hour
    "stripe-checkout": { max: 10, windowHours: 1 }, // 10 checkout attempts per hour
  };

function truncateToWindow(date: Date, windowHours: number): Date {
  const ms = windowHours * 60 * 60 * 1000;
  return new Date(Math.floor(date.getTime() / ms) * ms);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: Date;
}

/**
 * Check and increment rate limit for an identifier + endpoint.
 * Returns { allowed: false } when limit exceeded.
 */
export async function checkRateLimit(
  identifier: string,
  endpoint: string,
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[endpoint];
  if (!config) {
    // Unknown endpoint — allow by default
    return { allowed: true, remaining: 999, limit: 999, resetAt: new Date() };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const windowStart = truncateToWindow(new Date(), config.windowHours);
  const resetAt = new Date(
    windowStart.getTime() + config.windowHours * 60 * 60 * 1000,
  );

  // Try to upsert: increment count if row exists, insert with count=1 otherwise.
  // Supabase upsert with onConflict gives us atomic-ish behaviour.
  const { data, error } = await supabase
    .from("rate_limits")
    .upsert(
      {
        identifier,
        endpoint,
        window_start: windowStart.toISOString(),
        count: 1,
      },
      {
        onConflict: "identifier,endpoint,window_start",
        ignoreDuplicates: false,
      },
    )
    .select("count")
    .single();

  if (error) {
    // If table doesn't exist or any DB error — fail open (allow) to avoid
    // breaking the app before the table is created.
    console.warn("Rate limit DB error (fail-open):", error.message);
    return {
      allowed: true,
      remaining: config.max,
      limit: config.max,
      resetAt,
    };
  }

  // Supabase upsert returns the NEW row — but the count was set to 1 on insert.
  // For existing rows we need to manually increment. Use RPC for true atomicity.
  // Fallback: fetch current count and compare.
  const { data: row } = await supabase
    .from("rate_limits")
    .select("count")
    .eq("identifier", identifier)
    .eq("endpoint", endpoint)
    .eq("window_start", windowStart.toISOString())
    .single();

  // Increment count in DB
  await supabase
    .from("rate_limits")
    .update({ count: (row?.count ?? 0) + 1 })
    .eq("identifier", identifier)
    .eq("endpoint", endpoint)
    .eq("window_start", windowStart.toISOString());

  const currentCount = (row?.count ?? 0) + 1;
  const allowed = currentCount <= config.max;
  const remaining = Math.max(0, config.max - currentCount);

  return { allowed, remaining, limit: config.max, resetAt };
}

/** Convenience: return a 429 Response with rate-limit headers */
export function rateLimitResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({
      error: "Zu viele Anfragen. Bitte warte einen Moment.",
      resetAt: result.resetAt.toISOString(),
      limit: result.limit,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(Math.floor(result.resetAt.getTime() / 1000)),
        "Retry-After": String(
          Math.ceil((result.resetAt.getTime() - Date.now()) / 1000),
        ),
      },
    },
  );
}
