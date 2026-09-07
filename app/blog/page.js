import Link from "next/link";
import pool from "../../lib/db";

export const dynamic = "force-dynamic";

async function getPosts() {
  try {
    const result = await pool.query(
      `SELECT *
       FROM posts
       WHERE published = true
       ORDER BY created_at DESC`
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          All Content
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Explore articles and videos
        </p>
      </div>

      {posts.length === 0 ? (

        <div className="text-center py-12">
          <p className="text-gray-500">
            No published posts available yet.
          </p>
        </div>

      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {posts.map((post) => (

            <article
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
            >

              {post.cover_image && (
                <div className="relative">

                  <img
                    src={post.cover_image}
                    alt={post.title || "Blog post"}
                    className="w-full h-40 object-cover"
                  />

                  {post.content_type === "video" ? (

                    <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      🎥 VIDEO
                    </span>

                  ) : (

                    <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      📝 ARTICLE
                    </span>

                  )}

                </div>
              )}

              <div className="p-4">

                <p className="text-xs text-blue-600 font-medium">
                  {post.category || "General"}
                </p>

                <h2 className="text-lg font-bold mt-1 line-clamp-2">
                  {post.title || "Untitled Post"}
                </h2>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {post.excerpt || "No description available."}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className={
                    post.content_type === "video"
                      ? "inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
                      : "inline-block mt-4 bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition"
                  }
                >
                  {post.content_type === "video"
                    ? "▶ Watch Video"
                    : "Read Article →"}
                </Link>

              </div>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}