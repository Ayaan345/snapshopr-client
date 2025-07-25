import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/conversation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
