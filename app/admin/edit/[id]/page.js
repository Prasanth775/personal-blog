"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPost() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load existing post
  useEffect(() => {
    if (!id) return;

    async function loadPost() {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.error || "Post not found");
          return;
        }

        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          cover_image: data.cover_image || "",
          video_url: data.video_url || "",
          author: data.author || "Admin",
          category: data.category || "",
          content_type: data.content_type || "article",
        });
      } catch (error) {
        console.error(error);
        setMessage("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  // Handle input
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Update post
  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to update post");
        return;
      }

      setMessage("Content updated successfully! ✅");

      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  // Loading
  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <p className="text-lg text-gray-500">
            Loading content...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-10">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="text-blue-600 hover:underline mb-5"
        >
          ← Back to Admin
        </button>

        <h1 className="text-4xl font-bold">
          Edit Content
        </h1>

        <p className="text-gray-500 mt-2">
          Update your article or educational video.
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-6 p-4 rounded-lg bg-gray-100">
          {message}
        </div>
      )}

      {/* Form */}
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
            className="w-full border border-gray-300 p-3 rounded-lg"
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
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-semibold mb-2">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="my-blog-post"
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          <p className="text-sm text-gray-500 mt-2">
            Example: my-first-react-tutorial
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="React, Next.js, JavaScript..."
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-semibold mb-2">
            Cover Image URL
          </label>

          <input
            type="text"
            name="cover_image"
            value={form.cover_image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          {form.cover_image && (
            <img
              src={form.cover_image}
              alt="Cover preview"
              className="mt-4 w-full h-64 object-cover rounded-xl"
            />
          )}
        </div>

        {/* Video URL */}
        {form.content_type === "video" && (
          <div className="bg-red-50 border border-red-200 p-5 rounded-xl">

            <label className="block font-semibold mb-2 text-red-700">
              🎥 Video URL
            </label>

            <input
              type="text"
              name="video_url"
              value={form.video_url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              className="w-full border border-gray-300 p-3 rounded-lg bg-white"
              required
            />

            <p className="text-sm text-gray-600 mt-2">
              YouTube embed URL use చేయండి:
            </p>

            <p className="text-sm text-blue-600 mt-1">
              https://www.youtube.com/embed/VIDEO_ID
            </p>

          </div>
        )}

        {/* Excerpt */}
        <div>
          <label className="block font-semibold mb-2">
            Excerpt / Description
          </label>

          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Short description..."
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-2">
            {form.content_type === "video"
              ? "Video Description"
              : "Article Content"}
          </label>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder={
              form.content_type === "video"
                ? "Write about this video..."
                : "Write your article using Markdown..."
            }
            rows="18"
            className="w-full border border-gray-300 p-3 rounded-lg font-mono"
            required
          />

          {form.content_type === "article" && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p className="font-semibold mb-2">
                Markdown supported:
              </p>

              <p># Heading</p>
              <p>**Bold text**</p>
              <p>*Italic text*</p>
              <p>- List item</p>
              <p>[Link](https://example.com)</p>
            </div>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block font-semibold mb-2">
            Author
          </label>

          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="flex-1 border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50"
          >
            {saving
              ? "Updating..."
              : "💾 Update Content"}
          </button>

        </div>

      </form>
    </main>
  );
}