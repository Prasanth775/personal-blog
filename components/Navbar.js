import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-2.5 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 hover:text-blue-600 transition"
        >
          MyBlog
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-5">

          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            href="/blog"
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Blog
          </Link>

          <Link
            href="/about"
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            About
          </Link>

          <Link
            href="/admin"
            className="bg-gray-900 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600 transition"
          >
            Admin
          </Link>

        </div>
      </div>
    </nav>
  );
}