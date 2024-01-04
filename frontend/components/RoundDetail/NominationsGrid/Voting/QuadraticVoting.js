export function QuadraticVotesList(props) {
  return Object.keys(props.votedOnObject).map((obj, i) => (
    <div className="px-3 py-1 text-lg" key={i}>
      <button
        className="text-blue-500 hover:text-blue-800 text-left"
        onClick={() => props.selectNomination(parseInt(obj))}
      >
        {props.nominationData[parseInt(obj)].projectName}:{" "}
        {props.votedOnObject[obj]} 票
      </button>
    </div>
  ));
}

export function QuadraticVotingButtons(props) {
  return (
    <div className="flex flex-col py-2">
      <div className="flex flex-row items-center justify-center mt-2 py-3 border-t">
        <button
          onClick={() =>
            props.updateVote(
              props.nominationData.indexOf(props.nomination),
              false
            )
          }
          className="bg-blue-600 text-white px-2 py-2 rounded-xl mx-2"
        >
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            className="h-5 w-5"
          >
            <path d="M20,12 L4,12" />
          </svg>
        </button>
        <button
          onClick={() =>
            props.updateVote(
              props.nominationData.indexOf(props.nomination),
              true
            )
          }
          className="bg-blue-600 text-white px-2 py-2 rounded-xl mx-2"
        >
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            className="h-5 w-5"
          >
            <path d="M20 12L4 12M12 4L12 20" />
          </svg>
        </button>
      </div>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={() => props.castVote()}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2"
        >
          提交投票
        </button>
      </div>
    </div>
  );
}
