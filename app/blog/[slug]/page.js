import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

async function getPost(slug) {
  try {
    const result = await pool.query(
      "SELECT * FROM posts WHERE slug = $1 AND published = true",
      [slug]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    // youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // youtube.com/watch?v=VIDEO_ID
    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // youtube.com/embed/VIDEO_ID
      if (parsedUrl.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    return null;
  } catch (error) {
    console.error("Invalid YouTube URL:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const youtubeEmbedUrl =
    post.content_type === "video"
      ? getYouTubeEmbedUrl(post.video_url)
      : null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">

      {/* Content Type */}
      <div className="mb-5">
        {post.content_type === "video" ? (
          <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
            🎥 VIDEO
          </span>
        ) : (
          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
            📝 ARTICLE
          </span>
        )}
      </div>

      {/* Cover Image */}
      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title || "Blog post"}
          className="w-full h-96 object-cover rounded-xl"
        />
      )}

      {/* Title */}
      <div className="mt-8">

        <p className="text-blue-600 font-medium">
          {post.category || "General"}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3">
          {post.title}
        </h1>

        <p className="text-gray-500 mt-4">
          By {post.author || "Admin"}
        </p>

      </div>

      {/* VIDEO CONTENT */}
      {post.content_type === "video" ? (

        <section className="mt-10">

          {youtubeEmbedUrl ? (

            <div className="aspect-video w-full">

              <iframe
                src={youtubeEmbedUrl}
                title={post.title}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            </div>

          ) : (

            <div className="bg-gray-100 rounded-xl p-10 text-center">

              <p className="text-gray-500">
                Video URL is invalid or not available.
              </p>

            </div>

          )}

          {/* Video Description */}
          {post.excerpt && (
            <p className="text-gray-600 text-lg mt-8">
              {post.excerpt}
            </p>
          )}

        </section>

      ) : (

        /* ARTICLE CONTENT */

        <article className="prose prose-lg max-w-none mt-10">

          <ReactMarkdown>
            {post.content || ""}
          </ReactMarkdown>

        </article>

      )}

    </main>
  );
}