import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const response = await fetch("http://localhost:8000/create_test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: data.user_id || 1, // TODO: Get from auth session
        title: data.title,
        content: data.content,
        subject: data.subject,
        anzahl: data.anzahl,
      }),
    });

    if (!response.ok) {
      throw new Error(`FastAPI returned ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create test" },
      { status: 500 },
    );
  }
}
