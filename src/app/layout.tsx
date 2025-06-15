import Link from "next/link";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({
  children,
  team,
  analytics,
}: Readonly<{
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AntdRegistry>
          <div className="container mx-auto">
            <div className="flex justify-center text-blue-500 p-6 gap-6">
              <Link href="/">Home</Link>
              <Link href="/visitors">Visitors</Link>
            </div>
            <div className="flex gap-6">
              {team}
              {analytics}
            </div>
            {children}
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
