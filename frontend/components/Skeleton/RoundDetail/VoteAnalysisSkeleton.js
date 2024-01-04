export default function VoteAnalysisSkeleton() {
  return (
    <div>
      <div className="flex pt-6">
        {/* <div className="px-6 py-1 text-lg text-center font-semibold">
          <span className="w-80 h-6 rounded-md bg-gray-300 animate-pulse mb-2"></span>
        </div>
        <div className="px-6 py-1 text-lg text-center font-semibold"></div> */}
        <div className="flex items-center justify-between px-6 py-4 font-semibold text-xl">
          <span className="w-44 h-9 rounded-md bg-gray-300 animate-pulse"></span>
        </div>
        <div className="flex items-center justify-between  py-4 font-semibold text-xl">
          <span className="w-44 h-9 rounded-md bg-gray-300 animate-pulse"></span>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-center p-2 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
          <div className="w-4/5 h-4/5 flex items-center justify-center p-6 font-semibold text-xl">
            <span className="w-60 h-60 rounded-md bg-gray-300 animate-pulse"></span>
          </div>
        </div>
        <div className="mt-2 text-center"></div>
      </div>
    </div>
  );
}
