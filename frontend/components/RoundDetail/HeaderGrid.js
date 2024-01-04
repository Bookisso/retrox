import Link from "next/link";
import { RoundContext } from "../../lib/RoundContext";
import { useContext } from "react";
export default function HeaderGrid(props) {
  const { rounds, setRounds } = useContext(RoundContext);
  return (
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row ">
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">{props.roundName}</h1>
        <h2 className="text-gray-600 ml-0.5">
          本轮资助起始于{" "}
          {new Date(props.round.startBlockTimestamp * 1000).toDateString()}
        </h2>
      </div>
      <div className="flex-1"></div>
      {props.votingState == 0 && (
        <div className="flex flex-wrap items-start justify-self-end -mb-3 font-semibold text-xl">
          <Link href={"/new-nomination?id=" + props.roundID}>
            <a className="inline-flex items-center px-5 py-3 text-white bg-gradient-to-r from-blue-700 to-purple-600 hover:from-purple-700 hover:to-blue-800 rounded-xl shadow-md ml-6 mb-3">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              创建新提案
            </a>
          </Link>
        </div>
      )}
      {props.votingState == 1 && (
        <div
          className="flex flex-wrap items-start justify-end -mb-3 font-semibold text-xl cursor-pointer"
          onClick={() => {
            if (rounds[props.roundID].registered === undefined) {
              props.setVotes(100);
              rounds[props.roundID].registered = 100;
              setRounds(rounds);
            }
          }}
        >
          <a className="inline-flex items-center px-5 py-3 text-white bg-gradient-to-r from-blue-700 to-purple-600 hover:from-purple-700 hover:to-blue-800 rounded-xl shadow-md ml-6 mb-3">
            <svg
              className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2 "
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              color="#FFFFFF"
            >
              <path d="M1 18C1 15.75 4 15.75 5.5 14.25C6.25 13.5 4 13.5 4 9.75C4 7.25025 4.99975 6 7 6C9.00025 6 10 7.25025 10 9.75C10 13.5 7.75 13.5 8.5 14.25C10 15.75 13 15.75 13 18" />
              <path d="M22 11H14" /> <path d="M18 7V15" />
            </svg>
            注册
          </a>
        </div>
      )}
      {props.votingState == 2 && (
        <div className="flex flex-wrap items-start justify-end -mb-3">
          <a
            className="inline-flex px-5 py-3 text-white bg-gradient-to-r from-blue-700 to-red-700 hover:from-red-700 hover:to-blue-700 rounded-xl shadow-md ml-6 mb-3 cursor-pointer"
            onClick={() => props.showSignModal()}
          >
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              width="192"
              height="192"
              className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
              viewBox="0 0 24 24"
              aria-labelledby="spamIconTitle"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <polygon points="16 3 21 8 21 16 16 21 8 21 3 16 3 8 8 3" />{" "}
              <path d="M12,8 L12,13" /> <line x1="12" y1="16" x2="12" y2="16" />{" "}
            </svg>
            恶意行为标记
          </a>
        </div>
      )}
      {props.votingState == 3 && (
        <div className="flex flex-wrap items-start justify-end -mb-3">
          <a
            className="inline-flex px-5 py-3 text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-green-600 hover:to-blue-600 rounded-xl shadow-md ml-6 mb-3"
            href="/optimism.csv"
            download
          >
            <svg
              aria-hidden="true"
              stroke="currentColor"
              className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="192"
              height="192"
              fill="#ffffff"
              viewBox="0 0 256 256"
            >
              <path
                d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
              <polyline
                points="152 32 152 88 208 88"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></polyline>
              <polyline
                points="100 156 128 184 156 156"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></polyline>
              <line
                x1="128"
                y1="120"
                x2="128"
                y2="184"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
            </svg>
            下载数据
          </a>
        </div>
      )}
    </div>
  );
}
