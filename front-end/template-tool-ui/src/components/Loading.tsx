// Loading animation component

function Loading({ msg }: { msg?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      {msg && (
        <div className="mt-8 text-lg text-gray-700">
          {msg}
        </div>
      )}
    </div>
  );
}

export default Loading;