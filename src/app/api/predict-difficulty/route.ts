import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface PredictBody {
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as PredictBody;

    const response = await fetch("http://localhost:8000/predict-difficulty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: data.text,
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
      { error: "Failed to predict difficulty" },
      { status: 500 },
    );
  }
}
