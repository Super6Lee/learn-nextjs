import { NextResponse } from "next/server";
import db from "@/db";

// GET /api/articles
export async function GET(request: Request) {
  // ...
}

// POST /api/articles
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  db.update(({ posts }) =>
    posts.unshift({
      id: Math.random().toString(36).slice(-8),
      ...body,
    })
  );

  return NextResponse.json({ message: "success" });
}
