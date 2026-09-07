
import Link from "next/link";

export default function BlogCard({ post }) {
  const isVideo = post.content_type === "video";

  return (
    <article className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">

      {/* Cover Image */}
      {post.cover_image && (
        <div className="relative">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-52 object-cover"
          />

          {/* Content Type Badge */}
          {isVideo ? (
            <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              🎥 VIDEO
            </span>
          ) : (
            <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              📝 ARTICLE
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <p className="text-sm text-blue-600 font-medium">
          {post.category || "General"}
        </p>

        {/* Title */}
        <h2 className="text-2xl font-bold mt-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mt-3 line-clamp-3">
          {post.excerpt || "No description available."}
        </p>

        {/* Button */}
        {isVideo ? (
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block mt-5 bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            ▶ Watch Video
          </Link>
        ) : (
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block mt-5 bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Read Article →
          </Link>
        )}

      </div>
    </article>
  );
}

