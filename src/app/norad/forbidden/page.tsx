export default function Forbidden() {
  return (
    <div className="h-[60vh] flex justify-center items-center">
      <div className="border border-red-500/40 bg-red-950/10 px-6 py-4 rounded-xl text-center">
        <h2 className="text-red-400 text-lg font-bold">Access Denied</h2>
        <p className="text-neutral-300 text-sm mt-2">
          Invalid NORAD access key.
        </p>
      </div>
    </div>
  );
}
