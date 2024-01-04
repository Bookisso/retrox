export default function VoteWaitingTab() {
  return (
    <div className="flex flex-col md:col-span-1  bg-white rounded-xl shadow-md h-fit">
      <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
        提案数据
      </div>
      <div className="grid grid-rows-1 grid-flow-col p-6">
        正在等待恶意行为标记...
      </div>
    </div>
  );
}
