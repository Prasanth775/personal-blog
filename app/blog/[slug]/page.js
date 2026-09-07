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
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* ================= CONTENT TYPE ================= */}
      <div className="mb-4 sm:mb-5">

        {post.content_type === "video" ? (
          <span className="inline-block bg-red-100 text-red-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
            🎥 VIDEO
          </span>
        ) : (
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
            📝 ARTICLE
          </span>
        )}

      </div>


      {/* ================= COVER IMAGE ================= */}
      {post.cover_image && (
        <div className="w-full overflow-hidden rounded-lg sm:rounded-xl">

          <img
            src={post.cover_image}
            alt={post.title || "Blog post"}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          />

        </div>
      )}


      {/* ================= TITLE ================= */}
      <div className="mt-6 sm:mt-8">

        <p className="text-blue-600 text-sm sm:text-base font-medium">
          {post.category || "General"}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3 leading-tight break-words">
          {post.title}
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mt-3 sm:mt-4">
          By {post.author || "Admin"}
        </p>

      </div>


      {/* ================= VIDEO CONTENT ================= */}
      {post.content_type === "video" ? (

        <section className="mt-7 sm:mt-10">

          {youtubeEmbedUrl ? (

            <div className="w-full aspect-video overflow-hidden rounded-lg sm:rounded-xl">

              <iframe
                src={youtubeEmbedUrl}
                title={post.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            </div>

          ) : (

            <div className="bg-gray-100 rounded-lg sm:rounded-xl p-6 sm:p-10 text-center">

              <p className="text-gray-500 text-sm sm:text-base">
                Video URL is invalid or not available.
              </p>

            </div>

          )}


          {/* Video Description */}
          {post.excerpt && (
            <p className="text-gray-600 text-base sm:text-lg mt-6 sm:mt-8 leading-7">
              {post.excerpt}
            </p>
          )}

        </section>

      ) : (

        /* ================= ARTICLE CONTENT ================= */

        <article
          className="
            prose
            prose-base
            sm:prose-lg
            max-w-none
            mt-7
            sm:mt-10
            break-words
            overflow-hidden
          "
        >

          <ReactMarkdown>
            {post.content || ""}
          </ReactMarkdown>

        </article>

      )}

    </main>
  );
}