import {
  QuadraticVotesList,
  QuadraticVotingButtons,
} from "./Voting/QuadraticVoting";
import { BinaryVotesList, BinaryVotingButtons } from "./Voting/BinaryVoting";
import DelegateModal from "../Modals/DelegateModal";
import { useState } from "react";

export default function VotingTab(props) {
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [initialVotes, setInitialVotes] = useState(props.votesRemaining);
  return (
    <>
      <div
        className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl justify-between py-2 shadow-md overflow-auto h-fit"
        style={{ maxHeight: "32rem" }}
      >
        <div className="flex flex-row border-b border-gray-100 py-5 items-center px-6">
          <div className="font-semibold text-xl">
            {props.isSubmitted ? "已投票提案" : "投票权剩余"}
          </div>
          <div className="pl-2 text-lg align-bottom">
            {!props.isSubmitted &&
              !props.isDelegated &&
              props.votesRemaining + " 票"}
            {props.isDelegated && initialVotes + " 票"}
          </div>
          <div className="flex flex-1 justify-end">
            {!props.isSubmitted && (
              <button
                onClick={() => {
                  setShowDelegateModal(true);
                }}
                className="from-blue-500 to-blue-700 bg-gradient-to-r text-white px-4 py-2 rounded-xl font-semibold"
              >
                {props.isDelegated ? "查看委托" : "委托"}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col content-start overflow-auto pt-3 px-3">
          {props.isDelegated ? (
            <div className="text-center text-lg py-4">已委托！</div>
          ) : (
            <>
              {Object.keys(props.votedOnObject).length ? (
                <>
                  <QuadraticVotesList
                    votedOnObject={props.votedOnObject}
                    selectNomination={props.selectNomination}
                    nominationData={props.nominationData}
                  ></QuadraticVotesList>
                  {props.isSubmitted ? (
                    <div className="text-center text-lg py-4">已投票！</div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div className="text-center text-lg py-4">暂未投票</div>
              )}
            </>
          )}
        </div>
        {!props.isSubmitted && !props.isDelegated ? (
          <QuadraticVotingButtons
            updateVote={props.updateVote}
            nominationData={props.nominationData}
            nomination={props.nomination}
            castVote={props.castVote}
          ></QuadraticVotingButtons>
        ) : (
          <div></div>
        )}
      </div>
      {showDelegateModal && (
        <DelegateModal
          isDelegated={props.isDelegated}
          onSubmit={props.castDelegation}
          delegators={props.delegators}
          close={() => {
            setShowDelegateModal(false);
          }}
        ></DelegateModal>
      )}
    </>
  );
}
