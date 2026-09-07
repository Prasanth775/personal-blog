
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              MyBlog
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Learn programming, web development,
              technology and useful tutorials through
              articles and educational videos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition"
              >
                Blog
              </Link>

              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About
              </Link>

              <Link
                href="/admin"
                className="text-gray-400 hover:text-white transition"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Content
            </h3>

            <p className="text-gray-400 leading-7">
              📝 Articles
              <br />
              🎥 Educational Videos
              <br />
              💻 Programming Tutorials
              <br />
              🚀 Web Development
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MyBlog. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

