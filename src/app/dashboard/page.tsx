export default function Home() {
  return (
    <main className="m-4 p-4">
      <div className="flex">
        <div className="w-80 space-y-2 border-r-2 border-gray-500 p-4">
          <p>Sidebar</p>
          <p>All Projects</p>
          <p>Starred Projects</p>
          <p>Created Projects</p>
          <p>Shared Projects</p>
        </div>
        <div className="w-full space-y-2 p-4">
          <p>Header Content</p>
          <p>Chat Screen Content</p>
          <p>Recently viewed</p>
          <p>Recently edited</p>
          <p>Footer Content</p>
        </div>
      </div>
    </main>
  );
}
