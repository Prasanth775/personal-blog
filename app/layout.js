
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: {
    default: "MyBlog - Personal Blog",
    template: "%s | MyBlog",
  },
  description:
    "A personal blog featuring articles, tutorials, and educational videos built with Next.js and PostgreSQL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

