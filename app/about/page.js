export const metadata = {
  title: "About | MyBlog",
  description:
    "Learn more about MyBlog, a personal blog about programming, web development and technology.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">

          <p className="text-blue-400 font-semibold mb-4">
            ABOUT MYBLOG
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">
            Learn. Build. Share.
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Welcome to MyBlog — a place where I share my
            knowledge, experiences and ideas about technology.
          </p>

        </div>
      </section>

      {/* About Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>

            <h2 className="text-3xl font-bold">
              About This Blog
            </h2>

            <p className="mt-5 text-gray-600 leading-8">
              MyBlog is a personal technology blog created to
              share useful knowledge about programming,
              web development and modern technologies.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              Here you can find tutorials, programming guides,
              project ideas, development tips and technology
              related articles.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              Along with articles, MyBlog also provides
              educational videos to make learning easier
              and more practical.
            </p>

          </div>

          {/* Right */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h3 className="text-2xl font-bold mb-6">
              What You'll Find
            </h3>

            <div className="space-y-5">

              <div className="flex gap-4">
                <span className="text-2xl">💻</span>

                <div>
                  <h4 className="font-bold">
                    Programming
                  </h4>

                  <p className="text-gray-600 text-sm mt-1">
                    JavaScript, React, Next.js and more.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">🌐</span>

                <div>
                  <h4 className="font-bold">
                    Web Development
                  </h4>

                  <p className="text-gray-600 text-sm mt-1">
                    Frontend, backend and full-stack development.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">🎥</span>

                <div>
                  <h4 className="font-bold">
                    Educational Videos
                  </h4>

                  <p className="text-gray-600 text-sm mt-1">
                    Practical video tutorials and explanations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">🚀</span>

                <div>
                  <h4 className="font-bold">
                    Project Ideas
                  </h4>

                  <p className="text-gray-600 text-sm mt-1">
                    Real-world projects and development ideas.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Mission */}
      <section className="bg-white border-t">

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">

          <h2 className="text-3xl font-bold">
            My Mission
          </h2>

          <p className="mt-5 text-gray-600 text-lg leading-8">
            My goal is to make technology easier to understand
            by providing simple explanations, practical examples,
            useful articles and educational videos.
          </p>

        </div>

      </section>

    </main>
  );
}