import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import pool from "@/lib/db";

async function getPost(slug) {
  const result = await pool.query(
    "SELECT * FROM posts WHERE slug = $1 AND published = true",
    [slug]
  );

  return result.rows[0];
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
    description: post.excerpt,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image
        ? [post.cover_image]
        : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

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
          alt={post.title}
          className="w-full h-96 object-cover rounded-xl"
        />
      )}

      {/* Title */}
      <div className="mt-8">

        <p className="text-blue-600 font-medium">
          {post.category}
        </p>

        <h1 className="text-5xl font-bold mt-3">
          {post.title}
        </h1>

        <div className="text-gray-500 mt-4">
          By {post.author}
        </div>

      </div>

      {/* VIDEO */}
      {post.content_type === "video" ? (

        <section className="mt-10">

          {post.video_url ? (
            <div className="aspect-video w-full">

              <iframe
                src={post.video_url}
                title={post.title}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            </div>
          ) : (
            <div className="bg-gray-100 rounded-xl p-10 text-center">
              <p className="text-gray-500">
                Video URL is not available.
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

        /* ARTICLE */
        <article className="prose prose-lg max-w-none mt-10">

          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>

        </article>

      )}

    </main>
  );
}