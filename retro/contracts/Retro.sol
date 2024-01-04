// SPDX-License-Identifier: MIT


// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

// initializing the CFA Library
pragma solidity ^0.8.0;

contract Retro {


    constructor()  {

    }

    uint256 constant tokensPerBadgeHolder = 100;
    uint256 constant minRoundCreationThreshold = 1;
    uint256 constant minNominationThreshold = 1;
    uint256 constant minDisperseAmount = 1;

    enum RoundState {
        Nominations,
        Voting,
        Disbursement,
        Cancelled
    }

    struct Round {
        string roundURI;
        address[] badgeHolders;
        uint256 startBlockTimestamp;
        uint256 fundsCommitted;
        uint256 nominationCounter;
        uint256 totalVotes;
        uint256 nominationDuration;
        uint256 votingDuration;
    }

    struct Nomination {
        string nominationURI;
        address recipient;
        uint256 numVotes;
    }

    mapping (uint256 => Round) public rounds;
    mapping (uint256 => mapping (uint256 => Nomination)) public nominations;
    mapping(uint256 => mapping (address => uint256)) public badgeHolderVoteStatus; //0 = inelligible, 1 = eligible, 2 = voted
    mapping(uint256  => uint256) public amounts;
    mapping(uint256 => uint256) public flowRates;
    mapping(address => mapping(uint256 => mapping(uint256 => uint256))) private badgeHolderVotes;
    mapping(address => mapping(uint256 => uint256)) private badgeHolderTokenAmounts;

    uint256 public roundCounter;

    event RetroSetup(address indexed initiator);
    event NewRound(string roundURI, uint256 startBlockTimestamp, uint256 fundsCommitted);
    event NewNomination(uint256 roundNum, string nominationURI, address recipient);
    event NewVote(uint256 roundNum, address badgeHolder);
    event Disperse(address indexed recipient, uint256 amount);

    function createRound(string memory roundURI, address[] memory badgeHolders, uint256 nominationDuration, uint256 votingDuration) public payable {
        console.log('begin');
        //require(nominationDuration > 0, "Nomination period must be greater than zero");
        //require(votingDuration > 0, "Voting period must be greater than zero");
        require(msg.value >= minRoundCreationThreshold, "Insufficient funds to create a new round");
        rounds[roundCounter].roundURI = roundURI;
        rounds[roundCounter].badgeHolders = badgeHolders;
        rounds[roundCounter].startBlockTimestamp = block.timestamp;
        rounds[roundCounter].fundsCommitted = msg.value;
        rounds[roundCounter].nominationDuration = nominationDuration;
        rounds[roundCounter].votingDuration = votingDuration;

        for (uint256 i = 0; i < badgeHolders.length; i++) {
            badgeHolderVoteStatus[roundCounter][badgeHolders[i]] = 1;
        }

        roundCounter++;
        emit NewRound(roundURI, block.timestamp, msg.value);
    }

    function nominate(uint256 roundNum, string memory nominationURI, address recipient) public payable {
        require(msg.value >= minNominationThreshold, "Insufficient funds to nominate");
        //require((block.timestamp - rounds[roundNum].startBlockTimestamp) <= rounds[roundNum].nominationDuration, "Nomination period finished");
        Round storage round = rounds[roundNum];
        nominations[roundNum][round.nominationCounter].nominationURI = nominationURI;
        nominations[roundNum][round.nominationCounter].recipient = recipient;
        rounds[roundNum].fundsCommitted += msg.value;
        round.nominationCounter++;
        emit NewNomination(roundNum, nominationURI, recipient);
    }


    function toInt96(uint256 value) internal pure returns (int96) {
        require(value <= uint256(int256(type(int96).max)), "SafeCast96: value doesn't fit in 96 bits");
        return int96(int256(value));
    }

    function getRoundData(uint256 roundNum) public view returns(string memory, uint256, uint256, uint256, uint256, uint256, uint256) {
        return (rounds[roundNum].roundURI, rounds[roundNum].startBlockTimestamp, rounds[roundNum].fundsCommitted, rounds[roundNum].nominationCounter, rounds[roundNum].totalVotes, rounds[roundNum].nominationDuration, rounds[roundNum].votingDuration);
    }

    function getNominationData(uint256 roundNum, uint256 nominationNum) public view returns (string memory, address, uint256) {
        return (nominations[roundNum][nominationNum].nominationURI, nominations[roundNum][nominationNum].recipient, nominations[roundNum][nominationNum].numVotes);
    }

    function getNextRoundNum() public view returns (uint256) {
        return roundCounter;
    }

    function getAmountData(uint256 nominationNum) public view returns (uint256) {
        return amounts[nominationNum];
    }

    function getBadgeHolderStatus(uint256 roundNum, address badgeHolder) public view returns (uint256) {    
        return badgeHolderVoteStatus[roundNum][badgeHolder];
    }

}
