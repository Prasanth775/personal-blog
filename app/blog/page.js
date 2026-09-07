import Link from "next/link";

async function getPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.status);
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          All Content
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Explore articles and videos
        </p>
      </div>

      {/* ================= NO POSTS ================= */}
      {posts.length === 0 ? (

        <div className="text-center py-12">
          <p className="text-gray-500">
            No posts available yet.
          </p>
        </div>

      ) : (

        /* ================= POSTS GRID ================= */
        <div className="grid md:grid-cols-3 gap-6">

          {posts.map((post) => (

            <article
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
            >

              {/* ================= COVER IMAGE ================= */}
              {post.cover_image && (
                <div className="relative">

                  <img
                    src={post.cover_image}
                    alt={post.title || "Blog post"}
                    className="w-full h-40 object-cover"
                  />

                  {/* Content Type */}
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

              {/* ================= POST CONTENT ================= */}
              <div className="p-4">

                {/* Category */}
                <p className="text-xs text-blue-600 font-medium">
                  {post.category || "General"}
                </p>

                {/* Title */}
                <h2 className="text-lg font-bold mt-1 line-clamp-2">
                  {post.title || "Untitled Post"}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {post.excerpt || "No description available."}
                </p>

                {/* ================= BUTTON ================= */}
                {post.content_type === "video" ? (

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
                  >
                    ▶ Watch Video
                  </Link>

                ) : (

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition"
                  >
                    Read Article →
                  </Link>

                )}

              </div>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}