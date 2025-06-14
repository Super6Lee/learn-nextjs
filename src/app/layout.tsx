import "./globals.css";
import { Agu_Display } from "next/font/google";

const inter = Agu_Display({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
