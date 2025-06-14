export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div>
      <h2>我是Dashboard layout</h2>
      {children}
    </div>
  );
}
