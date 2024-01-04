import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import {
  createDoughnutData,
  doughnutOptions,
} from "../../../lib/createDoughnuts";
import { useState, useContext } from "react";
import { RoundContext } from "../../../lib/RoundContext";
import VoteAnalysisSkeleton from "../../Skeleton/RoundDetail/VoteAnalysisSkeleton";

ChartJS.register(ArcElement, Tooltip);

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

export default function VoteAnalysisTab(props) {
  const { rounds, setRounds } = useContext(RoundContext);
  const { roundID } = props;
  const [loaded, setLoaded] = useState(rounds[roundID].signed === true);
  if (!loaded) {
    setTimeout(() => {
      const newRounds = [...rounds];
      newRounds[roundID].signed = true;
      setRounds(newRounds);
      setLoaded(true);
    }, 2500);
  }

  return (
    <div
      className="flex flex-col md:col-span-1  bg-white rounded-xl shadow-md"
      style={{ height: "32rem" }}
    >
      <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
        提案数据
      </div>
      {loaded ? (
        <div>
          <div className="grid grid-rows-1 grid-flow-col pt-6">
            <div className="px-6 py-1 text-lg text-center font-semibold">
              {props.voteData.nominationVotes[props.nomination.projectName]
                ? props.voteData.nominationVotes[props.nomination.projectName]
                : 0}{" "}
              票
            </div>
            <div className="px-6 py-1 text-lg text-center font-semibold">
              {props.voteData.nominationVotes[props.nomination.projectName]
                ? Math.round(
                    (props.voteData.nominationVotes[
                      props.nomination.projectName
                    ] /
                      props.voteData.totalVotes) *
                      100
                  )
                : 0}{" "}
              % 票数占比
            </div>
          </div>
          {/* {props.voteData.nominationVotes[props.nomination.projectName] ? ( */}
          <div className="p-6 flex-grow">
            <div className="flex items-center justify-center p-2 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <div className="w-4/5 h-4/5">
                <Doughnut
                  data={createDoughnutData(
                    props.voteData.nominationVotes,
                    props.nomination.projectName
                  )}
                  width={300}
                  height={300}
                  options={doughnutOptions}
                />
              </div>
            </div>
            <div className="mt-2 text-center">票数分布</div>
          </div>
          {/* ) : null} */}
        </div>
      ) : (
        <VoteAnalysisSkeleton />
      )}
    </div>
  );
}
