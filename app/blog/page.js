
import Link from "next/link";

async function getPosts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/posts`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          All Content
        </h1>

        <p className="text-gray-500 mt-2">
          Explore articles and videos
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-3 gap-8">

        {posts.map((post) => (

          <article
            key={post.id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >

            {/* Cover Image */}
            {post.cover_image && (
              <div className="relative">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-52 object-cover"
                />

                {/* Video Badge */}
                {post.content_type === "video" && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🎥 VIDEO
                  </span>
                )}

                {/* Article Badge */}
                {post.content_type !== "video" && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    📝 ARTICLE
                  </span>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-5">

              {/* Category */}
              <span className="text-sm text-blue-600 font-medium">
                {post.category || "General"}
              </span>

              {/* Title */}
              <h2 className="text-2xl font-bold mt-2">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 mt-3 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Button */}
              {post.content_type === "video" ? (

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-5 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                >
                  ▶ Watch Video
                </Link>

              ) : (

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-5 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                  Read Article →
                </Link>

              )}

            </div>

          </article>

        ))}

      </div>

    </main>
  );
}

