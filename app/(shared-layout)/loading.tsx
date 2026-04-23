export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
        {/* <p className="text-muted-foreground">Loading TaskManager...</p> */}
      </div>
    </div>
  );
}