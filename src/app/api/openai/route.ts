import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface CreateTestBody {
  user_id?: number;
  title: string;
  content: string;
  subject: string;
  anzahl: number;
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as CreateTestBody;

    const response = await fetch("http://localhost:8000/create_test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: data.user_id ?? 1,
        title: data.title,
        content: data.content,
        subject: data.subject,
        anzahl: data.anzahl,
      }),
    });

    if (!response.ok) {
      throw new Error(`FastAPI returned ${response.status}`);
    }

    const result: unknown = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create test" },
      { status: 500 },
    );
  }
}
