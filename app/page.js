import Link from "next/link";
import pool from "../lib/db";

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
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-blue-400 text-sm font-semibold mb-1">
            Welcome to MyBlog
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Learn. Build. Grow.
          </h1>

          <p className="mt-2 text-gray-300 text-sm max-w-2xl">
            Learn programming, web development, technology,
            tutorials and educational videos.
          </p>

          <Link
            href="/blog"
            className="inline-block mt-4 bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
          >
            Explore Blog →
          </Link>
        </div>
      </section>

      {/* Latest Content */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-2xl font-bold">
              Latest Content
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Latest articles and educational videos
            </p>
          </div>

          <Link
            href="/blog"
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No posts available yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 6).map((post) => (
              <article
                key={post.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Cover Image */}
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

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-blue-600 font-medium">
                    {post.category || "General"}
                  </p>

                  <h3 className="text-lg font-bold mt-1 line-clamp-2">
                    {post.title || "Untitled Post"}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {post.excerpt || "No description available."}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className={`inline-block mt-4 text-white px-4 py-2 rounded-md text-sm font-semibold transition ${
                      post.content_type === "video"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-black hover:bg-gray-800"
                    }`}
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
      </section>
    </main>
  );
}