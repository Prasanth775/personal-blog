
import ReactMarkdown from "react-markdown";

export default function MarkdownContent({ content }) {
  return (
    <article className="prose prose-lg max-w-none">

      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-8 mb-4">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mt-6 mb-3">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="text-gray-700 leading-8 mb-5">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-5 space-y-2">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-5 space-y-2">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="text-gray-700">
              {children}
            </li>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 pl-5 italic text-gray-600 my-6">
              {children}
            </blockquote>
          ),

          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              {children}
            </code>
          ),

          pre: ({ children }) => (
            <pre className="bg-gray-900 text-white p-5 rounded-xl overflow-x-auto my-6">
              {children}
            </pre>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

    </article>
  );
}

