export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full" />

    </div>
  );
}