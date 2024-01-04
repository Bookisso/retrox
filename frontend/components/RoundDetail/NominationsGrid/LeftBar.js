export default function LeftBar(
  onCardClick,
  selectedNomination,
  nominationData,
  voteData
) {
  const nominations = nominationData.map((nomination, nominationID) => (
    <li
      className="flex items-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 p-2 rounded-xl hover:text-white group"
      onClick={() => onCardClick(nominationID)}
      key={nominationID}
      style={{ maxHeight: "33rem" }}
    >
      <div className="flex flex-col">
        <span className="font-semibold">
          {nomination.projectName.slice(0, 45).trim() +
            (nomination.projectName.length > 40 ? "..." : "")}
        </span>
        <span className="text-gray-600 group-hover:text-gray-200">
          {nomination.projectDescription.slice(0, 40).trim() +
            (nomination.projectDescription.length > 40 ? "..." : "")}
        </span>
      </div>
    </li>
  ));
  return (
    <div
      className="flex flex-col md:col-span-1 md:row-span-3 bg-white rounded-xl shadow-md"
      style={{ height: "32rem" }}
    >
      <div className="flex flex-row justify-between">
        <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
          提案
        </div>
      </div>
      <div className="p-4 flex-grow">
        <div className="overflow-auto" style={{ maxHeight: "25rem" }}>
          <ul className="p-3">{nominations}</ul>
        </div>
      </div>
    </div>
  );
}
