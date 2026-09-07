import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT * FROM posts
       WHERE published = true
       ORDER BY created_at DESC`
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("POST BODY:", body);

    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      video_url,
      author,
      category,
      content_type,
    } = body;

    const result = await pool.query(
      `INSERT INTO posts
      (
        title,
        slug,
        excerpt,
        content,
        cover_image,
        video_url,
        author,
        category,
        content_type
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        title,
        slug,
        excerpt,
        content,
        cover_image,
        video_url || null,
        author || "Admin",
        category || null,
        content_type || "article",
      ]
    );

    return NextResponse.json(result.rows[0], {
      status: 201,
    });
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}