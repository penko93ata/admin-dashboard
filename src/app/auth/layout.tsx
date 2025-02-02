export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex h-[100vh] items-center justify-center">
      {children}
    </div>
  );
}
