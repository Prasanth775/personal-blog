import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET single post
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// UPDATE post
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      author,
      category,
    } = body;

    const result = await pool.query(
      `UPDATE posts
       SET
         title = $1,
         slug = $2,
         excerpt = $3,
         content = $4,
         cover_image = $5,
         author = $6,
         category = $7,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [
        title,
        slug,
        excerpt,
        content,
        cover_image,
        author,
        category,
        id,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE post
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await pool.query(
      "DELETE FROM posts WHERE id = $1",
      [id]
    );

    return NextResponse.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}