"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    video_url: "",
    author: "Admin",
    category: "",
    content_type: "article",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Content published successfully! ✅");

        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        setMessage(data.error || "Failed to publish content");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Create New Content
        </h1>

        <p className="text-gray-500 mt-2">
          Publish an article or educational video.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Content Type */}
        <div>
          <label className="block font-semibold mb-2">
            Content Type
          </label>

          <select
            name="content_type"
            value={form.content_type}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="article">
              📝 Article
            </option>

            <option value="video">
              🎥 Video
            </option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold mb-2">
            Title
          </label>

          <input
            name="title"
            placeholder="Enter post title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-semibold mb-2">
            Slug
          </label>

          <input
            name="slug"
            placeholder="example-nextjs-tutorial"
            value={form.slug}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <p className="text-sm text-gray-500 mt-1">
            Example: my-first-nextjs-post
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">
            Category
          </label>

          <input
            name="category"
            placeholder="Next.js, React, JavaScript..."
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-semibold mb-2">
            Cover Image URL
          </label>

          <input
            name="cover_image"
            placeholder="https://example.com/image.jpg"
            value={form.cover_image}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* VIDEO URL */}
        {form.content_type === "video" && (
          <div className="bg-red-50 border border-red-200 p-5 rounded-xl">

            <label className="block font-semibold mb-2 text-red-700">
              🎥 Video URL
            </label>

            <input
              name="video_url"
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              value={form.video_url}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg bg-white"
              required
            />

            <p className="text-sm text-gray-600 mt-2">
              For YouTube use the embed URL:
            </p>

            <p className="text-sm text-blue-600 mt-1">
              https://www.youtube.com/embed/VIDEO_ID
            </p>

          </div>
        )}

        {/* Excerpt */}
        <div>
          <label className="block font-semibold mb-2">
            Short Description
          </label>

          <textarea
            name="excerpt"
            placeholder="Write a short description..."
            value={form.excerpt}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            rows="4"
          />
        </div>

        {/* Article Content */}
        <div>
          <label className="block font-semibold mb-2">
            {form.content_type === "video"
              ? "Video Description"
              : "Article Content"}
          </label>

          <textarea
            name="content"
            placeholder={
              form.content_type === "video"
                ? "Write about this video..."
                : "Write your article in Markdown..."
            }
            value={form.content}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            rows="15"
            required
          />

          {form.content_type === "article" && (
            <p className="text-sm text-gray-500 mt-2">
              Markdown is supported.
            </p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block font-semibold mb-2">
            Author
          </label>

          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Publish Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Publishing..."
            : form.content_type === "video"
            ? "🎥 Publish Video"
            : "📝 Publish Article"}
        </button>

      </form>

      {/* Message */}
      {message && (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg">
          {message}
        </div>
      )}

    </main>
  );
}