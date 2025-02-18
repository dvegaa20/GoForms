export default function FormIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="bg-blue-100 dark:bg-gray-900 min-h-screen px-6">
      {children}
    </div>
  );
}
