import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

// GET /api/articles
export async function GET(request: NextRequest) {
  
  const searchParams = request.nextUrl.searchParams;

  const pageNum = Number(searchParams.get("pageNum")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 2;
  const title = searchParams.get("title") || "";
  const content = searchParams.get("content") || "";

  const data = db.data.posts;

  const filteredData = data.filter((item) => {
    return (
      item.title.includes(title.toLowerCase()) &&
      item.content.includes(content.toLowerCase())
    );
  });

  const total = filteredData.length;

  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const paginatedData =
    startIndex < endIndex ? filteredData.slice(startIndex, endIndex) : [];

  return NextResponse.json({ data: paginatedData, total, pageNum, pageSize });
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
