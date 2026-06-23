export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <main className="m-4 p-4">
      <p>Project Page</p>
      <p className="text-white">Project ID: {id}</p>
    </main>
  );
}
