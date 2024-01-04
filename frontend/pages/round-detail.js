const unorderedNominationsData = require("../data/optimismNominations.json");
const nominationsData = unorderedNominationsData.sort((a, b) =>
  a.id < b.id ? 1 : b.id < a.id ? -1 : 0
);
const fakeNominationsData = require("../data/fakeNominationData.json");
const optimismVoteData = require("../data/optimismVotes.json");
const fakeVoteData = require("../data/fakeVotes.json");

const badgeholders = require("../data/badgeholders.json");

import SiteHead from "../components/SiteHead";
import Layout from "../components/Layout";
import RoundDetailMain from "../components/RoundDetail/Main";
import RoundDetailMainSkeleton from "../components/Skeleton/RoundDetail/MainSkeleton";
import ChartModal from "../components/RoundDetail/Modals/ChartModal";
import FundingModal from "../components/RoundDetail/Modals/FundingModal";
import BadgeholderModal from "../components/RoundDetail/Modals/BadgeholderModal";
import AdviceModal from "../components/RoundDetail/Modals/AdviceModal.js";
import SignModal from "../components/RoundDetail/Modals/SignModal.js";

import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import { ethers } from "ethers";
import { useAccount, useProvider } from "wagmi";
import { getRounds, getRound } from "../lib/getRounds";
import { deployed_address } from "../contract_config.js";

import { getNominations } from "../lib/getNominations";
import { getBadgeHolderVotes } from "../lib/getBadgeHolderVotes";
import { RoundContext } from "../lib/RoundContext";
import {
  checkVotingState,
  getVoteData,
  checkCanVote,
  castVote,
  updateVote,
  updateBinaryVote,
  castBinaryVote,
  tryCast,
} from "../lib/votingLogic";

export default function Nominations({}) {
  //Modal
  const [showChartModal, setShowChartModal] = useState(false);
  const [showBadgeholderModal, setShowBadgeholderModal] = useState(false);
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  //END

  const [address, setAddress] = useState(false);
  const provider = useProvider();
  const { rounds, setRounds } = useContext(RoundContext);

  const { data: account } = useAccount();
  useEffect(() => {
    if (!account) return;
    setAddress(account.address);
  }, [account]);

  //Get round
  const router = useRouter();
  const roundID = router.query.id;

  const [input, setInput] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [round, setRound] = useState();

  useEffect(() => {
    if (!roundID) {
      return;
    }
    // const _round = (!rounds.length) ? (await getRound(roundID)).round  : rounds[roundID];
    const _round = rounds[roundID];
    _round.badgeholders = _round.badgeholders.length
      ? _round.badgeholders
      : badgeholders;
    const _input = {
      // nominations: await getNominations(roundID, _round),
      nominations: _round.nominations,
      round: _round,
      // badgeHolderVotes: await getBadgeHolderVotes(roundID, _round)
      // badgeHolderVotes: _round.badgeholders,
      badgeHolderVotes: _round.badgeholders,
    };
    setInput(_input);
    setRound(_round);
    setLoaded(true);
  }, [roundID, rounds]);

  // const round = rounds.find(o => o.id == roundID);
  useEffect(() => {
    setRound(!rounds.length ? input.round : rounds[roundID]);
  }, [input, roundID, rounds]);
  //END

  //Click on nomination
  const [nomination, setNomination] = useState(0);
  function selectNomination(id) {
    setNomination(id);
  }
  //END

  function getBadgeHolderList(round) {
    var badgeHolderList = {};
    if (!round.badgeholders) {
      return {};
    }
    round.badgeholders.forEach((badgeholder, index) => {
      badgeHolderList[index] = badgeholder;
    });
    return badgeHolderList;
  }

  // function getBadgeHolderMapping(round) {
  //   var badgeHolderMapping = {};
  //   console.log(round);
  //   if (!round.badgeholders) {
  //     return {};
  //   }
  //   round.badgeholders.forEach((badgeHolder) => {
  //     badgeHolderMapping[badgeHolder.twitter] = badgeHolder.address;
  //   });
  //   console.log(badgeHolderMapping);
  //   return badgeHolderMapping;
  // }

  async function test() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const retroAddress = deployed_address;
    console.log(signer, "signer");
    const retroABI = [
      "function createRound(string memory roundURI, address[] memory badgeHolders, uint256 nominationDuration, uint256 votingDuration) public payable",
    ];
    const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
  }

  // async function getBadgeHolderVotes(nomID, badgeholder) {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const retroAddress = deployed_address;
  //   const retroABI = [
  //     "function getBadgeHolderVotes(uint256 roundNum, uint256 nominationNum, address badgeHolder) public view returns (uint256)"
  //   ]
  //   const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
  //   console.log("roundId", roundID);
  //   console.log("nomID", nomID),
  //   console.log("badegholder", badgeholder);
  //   let vote = await retroContract.getBadgeHolderVotes(roundID, nomID, badgeholder);
  //   return vote;
  // }

  // 投票数据
  function getVoteData() {
    const voteData = {
      nominationVotes: {},
      totalVotes: round?.totalVotes ?? 0,
      fundingPool: round.funding,
    };
    // 这是一个对象，1，2，3，4对应专家列表
    // const badgeHolderList = getBadgeHolderList(round);
    // const badgeHolderMapping = getBadgeHolderMapping();
    if (votingState >= 3) {
      input.nominations.forEach((nomination, nominationIndex) => {
        voteData.nominationVotes[nomination.projectName] =
          rounds[roundID].votedOnObject[nominationIndex] ?? 0;
        if (rounds[roundID].votedOnObject[nominationIndex]) {
          voteData.totalVotes += rounds[roundID].votedOnObject[nominationIndex];
        }
        // voteData.badgeHolderVotes[nomination.projectName] = {};
        // for (const [key, badgeholder] of Object.entries(badgeHolderList)) {
        //   (async () =>
        //     await getBadgeHolderVotes(
        //       nominationIndex,
        //       badgeHolderMapping[badgeholder]
        //     ).then(function (result) {
        //       voteData.badgeHolderVotes[nomination.projectName][badgeholder] =
        //         result.toNumber();
        //     }))();
        // }
      });
    }
    return voteData;
  }

  //Voting logic
  const [votesRemaining, setVotesRemaining] = useState(
    rounds[roundID].registered
  );
  const [ballot, setBallot] = useState([]);
  const [canVote, setCanVote] = useState(false);
  const [votingState, setVotingState] = useState(0);
  const [votedOnObject, setVotedOnObject] = useState(
    rounds[roundID].votedOnObject ?? {}
  );
  const [isSubmitted, setIsSubmitted] = useState(rounds[roundID].isSubmitted);
  // 控制委托状态，sameAsSubmitted
  const [isDelegated, setIsDelegated] = useState(rounds[roundID].isDelegated);
  const [delegators, setDelegators] = useState(
    rounds[roundID].delegators ?? []
  );

  // 计票策略
  function castVoteProxy() {
    rounds[roundID].votes = castBinaryVote(ballot, rounds[roundID]);
    rounds[roundID].isSubmitted = true;
    rounds[roundID].votedOnObject = votedOnObject;
    setRounds(rounds);
    // function sum(arr) {
    //   return arr.reduce((pre, cur) => pre + cur);
    // }
    // await tryCast(sum(rounds[roundID].votes));
    // await castVote(ballot, roundID, nomination);
    setIsSubmitted(true);
  }

  // 委托策略
  function castDelegation(event) {
    event.preventDefault();
    const { address1, address2 } = event.target.elements;
    rounds[roundID].delegators = [address1.value, address2.value];
    rounds[roundID].isDelegated = true;
    setDelegators([address1.value, address2.value]);
    setIsDelegated(true);
    setRounds(rounds);
  }

  // 更新票数策略
  async function updateVoteProxy(index, plus) {
    // await test().then((res) => {
    //   console.log(res, "jiaohujiaohu");
    // });
    // const { votesRemainingReturn, modBallotReturn, votesObjectReturn } =
    //   updateBinaryVote(index, plus, ballot, votesRemaining, round);
    const { votesRemainingReturn, modBallotReturn, votesObjectReturn } =
      updateVote(index, plus, ballot, votesRemaining, round);
    setVotesRemaining(votesRemainingReturn);
    setBallot(modBallotReturn);
    setVotedOnObject(votesObjectReturn);
  }

  useEffect(() => {
    function foo() {
      const votingState = checkVotingState(round);
      // votingState 代表投票阶段
      // 0：提案期
      // 1: 投票期
      // 2：不能提交了，可以下载提案数据
      if (votingState == 1 && address) {
        const vote = checkCanVote(rounds[roundID], address);
        setVotingState(votingState);
        setCanVote(vote);
        if (!vote) {
          return;
        }
      } else if (votingState >= 2) {
        setVotingState(votingState);
      }
    }
    foo();
  }, [address, round, rounds, roundID, votesRemaining]);
  // END

  //Close Modals
  const handleKeyPress = useCallback((event) => {
    if (event.key == "Escape") {
      setShowChartModal(false);
      setShowBadgeholderModal(false);
      setShowFundingModal(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  //END

  function formSubmit(event) {
    const isAdviced = rounds[roundID].nominations[nomination].advice;
    event.preventDefault();
    if (!isAdviced) {
      const { pass, advice } = event.target.elements;
      const adviceInfo = {
        pass: pass.value,
        advice: advice.value,
      };
      rounds[roundID].nominations[nomination].advice = adviceInfo;
      setRounds(rounds);
    }
    setShowAdviceModal(false);
  }

  // async function signSubmit(event) {
  //   await test().then((res) => {
  //     console.log(res, "jiaohujiaohu");
  //   });
  //   event.preventDefault();
  //   setShowSignModal(false);
  //   const newRounds = [...rounds];
  //   newRounds[roundID].votingDuration =
  //     Date.now() / 1000 -
  //     newRounds[roundID].startBlockTimestamp -
  //     newRounds[roundID].nominationDuration;
  //   setRounds(newRounds);
  // }
  function signSubmit(event) {
    event.preventDefault();
    setShowSignModal(false);
    const newRounds = [...rounds];
    newRounds[roundID].votingDuration =
      Date.now() / 1000 -
      newRounds[roundID].startBlockTimestamp -
      newRounds[roundID].nominationDuration;
    setRounds(newRounds);
  }

  return (
    <>
      <SiteHead
        title="Funding"
        description="Retro-generative public goods funding"
      ></SiteHead>
      <Layout>
        {loaded && round ? (
          <RoundDetailMain
            roundID={roundID}
            roundName={roundID && round.roundName}
            round={roundID && round}
            selectNomination={selectNomination}
            nomination={input.nominations[nomination]}
            nominationData={input.nominations}
            voteData={getVoteData(round, input)}
            canVote={canVote}
            votingState={votingState}
            updateVote={updateVoteProxy}
            votesRemaining={votesRemaining}
            registerVotes={(i) => setVotesRemaining(i)}
            votedOnObject={votedOnObject}
            showChartModal={() => setShowChartModal(true)}
            isSubmitted={isSubmitted}
            showBadgeholderModal={() => setShowBadgeholderModal(true)}
            showFundingModal={() => setShowFundingModal(true)}
            badgeholderList={() => getBadgeHolderList(round)}
            showAdviceModal={() => setShowAdviceModal(true)}
            isDelegated={isDelegated}
            castDelegation={castDelegation}
            castVote={castVoteProxy}
            delegators={delegators}
            showSignModal={() => setShowSignModal(true)}
          ></RoundDetailMain>
        ) : (
          <RoundDetailMainSkeleton></RoundDetailMainSkeleton>
        )}
      </Layout>
      {/* {三个对话框是点击后或投完票后会弹出来的 */}
      {showChartModal && (
        <ChartModal
          close={() => setShowChartModal(false)}
          voteData={getVoteData(round, input)}
        ></ChartModal>
      )}
      {showBadgeholderModal && round && (
        <BadgeholderModal
          close={() => setShowBadgeholderModal(false)}
          badgeholderList={getBadgeHolderList(round)}
        ></BadgeholderModal>
      )}
      {showFundingModal && (
        <FundingModal
          round={round}
          close={() => setShowFundingModal(false)}
        ></FundingModal>
      )}
      {showAdviceModal && (
        <AdviceModal
          roundID={roundID}
          nomination={nomination}
          close={() => setShowAdviceModal(false)}
          onSubmit={formSubmit}
        ></AdviceModal>
      )}
      {showSignModal && (
        <SignModal
          close={() => {
            setShowSignModal(false);
          }}
          onSubmit={signSubmit}
        ></SignModal>
      )}
    </>
  );
}
