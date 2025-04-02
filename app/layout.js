import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link href="/">Home</Link>
          <Link href="/dashboard" style={{ marginLeft: "10px" }}>Dashboard</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
