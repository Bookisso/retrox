import LeftBar from "./LeftBar";
import NominationDetail from "./NominationDetail";
import VotingTab from "./VotingTab";
import VoteAnalysisTab from "./VoteAnalysisTab";
import VoteWaitingTab from "./VoteWaitingTab";

export default function NominationsGrid(props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 grid-rows-1 xl:grid-flow-col gap-6 h-fit">
      {LeftBar(
        props.selectNomination,
        props.nomination,
        props.nominationData,
        props.voteData
      )}
      <div
        className={`row-span-3 bg-white rounded-xl shadow-md ${
          props.votingState == 0 ||
          (props.votingState == 1 && props.canVote == false)
            ? "md:col-span-3"
            : "md:col-span-2"
        }`}
        style={{ height: "32rem" }}
      >
        <NominationDetail
          nomination={props.nomination}
          votingState={props.votingState}
          showAdviceModal={props.showAdviceModal}
        ></NominationDetail>
      </div>
      {props.votingState == 1 && props.canVote ? (
        <VotingTab
          isSubmitted={props.isSubmitted}
          isDelegated={props.isDelegated}
          castDelegation={props.castDelegation}
          votesRemaining={props.votesRemaining}
          votedOnObject={props.votedOnObject}
          selectNomination={props.selectNomination}
          nominationData={props.nominationData}
          updateVote={props.updateVote}
          delegators={props.delegators}
          castVote={props.castVote}
          nomination={props.nomination}
        ></VotingTab>
      ) : props.votingState == 3 ? (
        <VoteAnalysisTab
          roundID={props.roundID}
          voteData={props.voteData}
          nomination={props.nomination}
          nominationData={props.nominationData}
        ></VoteAnalysisTab>
      ) : props.votingState == 2 ? (
        <VoteWaitingTab />
      ) : null}
    </section>
  );
}
