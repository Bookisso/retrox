import { contractInitBadgeholder } from "./badgeholderLogic";
import { deployed_address } from "../contract_config.js";
import { ethers } from "ethers";
import { RoundContext } from "./RoundContext.js";
import { useContext } from "react";

export function updateVote(index, plus, ballot, votesRemaining, round) {
  let votesRemainingReturn = 0;
  const modBallot = !ballot.length
    ? Array(round.nominationCounter).fill(0)
    : ballot;
  if (
    plus &&
    votesRemaining -
      ((modBallot[index] + 1) * (modBallot[index] + 1) -
        modBallot[index] * modBallot[index]) >=
      0
  ) {
    votesRemainingReturn =
      votesRemaining -
      ((modBallot[index] + 1) * (modBallot[index] + 1) -
        modBallot[index] * modBallot[index]);
    modBallot[index]++;
  } else if (!plus && votesRemaining != 100) {
    if (modBallot[index] != 0) {
      votesRemainingReturn =
        votesRemaining +
        (modBallot[index] * modBallot[index] -
          (modBallot[index] - 1) * (modBallot[index] - 1));
      modBallot[index]--;
    }
  }
  const votesObjectReturn = getVotes(modBallot);
  return {
    votesRemainingReturn: votesRemainingReturn,
    modBallotReturn: modBallot,
    votesObjectReturn: votesObjectReturn,
  };
}

function getVotes(ballot) {
  const votesObject = {};
  ballot.forEach((element, i) => {
    if (element) {
      votesObject[i] = element;
    }
  });
  return votesObject;
}

export function updateBinaryVote(index, plus, ballot, votesRemaining, round) {
  const modBallot = !ballot.length
    ? Array(round.nominationCounter).fill(0)
    : ballot;
  const votesRemainingReturn =
    modBallot[index] === 0 ? votesRemaining - 1 : votesRemaining;
  modBallot[index] = plus ? 1 : 2;
  const votesObjectReturn = getBinaryVotes(modBallot);
  return {
    votesRemainingReturn: votesRemainingReturn,
    modBallotReturn: modBallot,
    votesObjectReturn: votesObjectReturn,
  };
}

function getBinaryVotes(ballot) {
  const votesObject = {};
  ballot.forEach((element, i) => {
    if (element !== 0) {
      votesObject[i] = element === 1 ? true : false;
    }
  });
  return votesObject;
}

export function checkCanVote(round, address) {
  // const result = await contractInitBadgeholder(roundID, address);
  const result = round.registered !== undefined;
  return result;
}

export function checkVotingState(round) {
  // calculate times based on round:
  // get current time
  // substract time from endtime to check whether voting is closed
  // convert time into votingState
  var votingState = 0;
  if (!round) {
    return -1;
  }
  if (round.votingDuration === -666666666) {
    votingState = 2;
  } else if (
    Date.now() / 1000 - round.startBlockTimestamp <=
    round.nominationDuration
  ) {
    votingState = 0; // nominations in progress
  } else if (
    Date.now() / 1000 - round.startBlockTimestamp <=
    round.nominationDuration + round.votingDuration
  ) {
    votingState = 1; // voting in progress
  } else if (
    Date.now() / 1000 - round.startBlockTimestamp >
    round.nominationDuration + round.votingDuration
  ) {
    votingState = 3; // voting finished
  }
  console.log("voting state", votingState);
  return votingState;
  // return 1;
}

export async function tryCast(ballot) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const retroAddress = deployed_address;
  const retroABI = ["function transfer(address to, uint256 amount) external"];
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
  await retroContract
    .connect(signer)
    .transfer("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", ballot);
}

export async function castVote(ballot, roundID, nomination) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const retroAddress = deployed_address;
  const retroABI = [
    "function castVote(uint256 roundNum, uint256 nominationNum, uint256 tokenAllocation) public",
  ];
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
  console.log(ballot);
  const squaredBallot = ballot.map((vote) => vote ** 2);
  console.log("squared ballot", squaredBallot);
  const vote = squaredBallot[nomination];
  console.log(roundID, nomination, vote);
  await retroContract.connect(signer).castVote(roundID, nomination, vote);
}

export function castBinaryVote(ballot, round) {
  const result = [];
  if (round.votes) {
    ballot.forEach((value, index) => {
      result.push(value + round.votes[index]);
    });
  } else {
    ballot.forEach((value, index) => {
      result.push(value);
    });
  }
  return result;
}

export function getVoteData(round, input) {
  const voteData = {
    nominationVotes: {},
    totalVotes: round?.totalVotes ?? 0,
    fundingPool: round?.fundsCommitted ?? 0,
    badgeHolderVotes: {},
  };
  voteData.badgeHolderVotes = input.badgeHolderVotes;
  input.nominations?.forEach((nomination, nominationIndex) => {
    voteData.nominationVotes[nomination.projectName] = nomination.numVotes;
  });
  return voteData;
}
