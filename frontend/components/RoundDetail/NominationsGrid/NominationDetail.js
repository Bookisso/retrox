import Link from "next/link";

export default function NominationDetail(props) {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100 text-xl">
        <span>
          {props.nomination
            ? props.nomination.projectName
            : "点击提案以浏览详细信息"}
        </span>
        {props.nomination && props.votingState == 0 && (
          <div
            className="flex flex-wrap items-start justify-end -mb-3 text-base"
            onClick={props.showAdviceModal}
          >
            <a className="inline-flex items-center cursor-pointer px-5 py-3 text-white bg-gradient-to-r from-blue-700 to-green-600 hover:from-green-600 hover:to-blue-700 rounded-xl shadow-md ml-6 mb-3">
              {props.nomination?.advice ? "查看我的评审意见" : "评审"}
            </a>
          </div>
        )}
      </div>
      <div className="overflow-y-auto p-5" style={{ maxHeight: "26.5rem" }}>
        {props.nomination ? (
          <>
            <div className="font-semibold text-xl mb-1">项目信息</div>
            <div className="grid grid-rows-2 grid-flow-col mb-2 text-lg">
              <div>提案者: {props.nomination.nominatorName}</div>
              <div>
                项目地址:{" "}
                <a
                  href={props.nomination.projectURL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  {props.nomination.projectName}
                </a>
              </div>
              <div>所需资金: {props.nomination.fundingAmount} ETH</div>
            </div>
            <div className="font-semibold mt-3 text-xl mb-1">项目描述</div>
            <p className="text-lg">{props.nomination.projectDescription}</p>
            <div className="font-semibold mt-3 text-xl mb-1">未来工作计划</div>
            <p className="text-lg">{props.nomination.futurePlan}</p>
          </>
        ) : null}
      </div>
    </>
  );
}
