import { NextResponse } from "next/server";
import db from "@/db";

interface IParams {
  params: {
    id: string;
  };
}

// GET /api/articles/[id]
export async function GET(request: Request, { params }: IParams) {
  const post = await db.data.posts.find((post) => post.id === params.id);
  return Response.json(post);
}

// DELETE /api/articles/[id]
export async function DELETE(request: Request, { params }: IParams) {
  await db.update(({ posts }) => {
    const idx = posts.findIndex((post) => post.id === params.id);
    if (idx !== -1) {
      posts.splice(idx, 1);
    }
  });

  return Response.json({ message: "success" });
}

// PATCH /api/articles/[id]
export async function PATCH(request: Request, { params }: IParams) {
  const body = await request.json();
  await db.update(({ posts }) => {
    const idx = posts.findIndex((post) => post.id === params.id);
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...body };
    }
  });

  return Response.json({ message: "success" });
}
