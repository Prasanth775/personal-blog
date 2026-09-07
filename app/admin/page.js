"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const response = await fetch("/api/posts");
    const data = await response.json();

    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function deletePost(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadPosts();
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your articles and videos
          </p>
        </div>

        <Link
          href="/admin/create"
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
        >
          + Create Content
        </Link>

      </div>

      {/* Posts */}
      <div className="space-y-4">

        {posts.length === 0 ? (
          <div className="text-center py-20 border rounded-xl">
            <p className="text-gray-500">
              No content available.
            </p>

            <Link
              href="/admin/create"
              className="inline-block mt-4 bg-black text-white px-5 py-3 rounded-lg"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          posts.map((post) => (

            <div
              key={post.id}
              className="border rounded-xl p-5 flex justify-between items-center hover:shadow-md transition"
            >

              {/* Content Information */}
              <div className="flex items-center gap-5">

                {/* Thumbnail */}
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-28 h-20 object-cover rounded-lg"
                  />
                )}

                <div>

                  {/* Content Type */}
                  <div className="mb-2">

                    {post.content_type === "video" ? (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        🎥 Video
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        📝 Article
                      </span>
                    )}

                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold">
                    {post.title}
                  </h2>

                  {/* Category */}
                  <p className="text-gray-500 mt-1">
                    {post.category || "Uncategorized"}
                  </p>

                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3">

                {/* View */}
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  View
                </Link>

                {/* Edit */}
                <Link
                  href={`/admin/edit/${post.id}`}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Edit
                </Link>

                {/* Delete */}
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </main>
  );
}