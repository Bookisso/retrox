const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

describe("Retro", function () {
  it("should create a round", async function () {
    // const provider = waffle.provider;
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

    console.log(owner.address);

    const Retro = await ethers.getContractFactory("Retro");
    const host = "0xE40983C2476032A0915600b9472B3141aA5B5Ba9";
    const retro = await Retro.deploy();
    await retro.deployed();
    console.log("donedone", retro.address);
    const badgeHolders = [addr1.address, addr2.address];
    sleep(10000);
    // await retro.createRound("round1", badgeHolders, 60, 60, {
    //   value: ethers.utils.parseEther("0.0001"),
    // });
    // console.log("createRound");
    // sleep(10000);
    // await retro.nominate(0, "nomination1", addr3.address, {
    //   value: ethers.utils.parseEther("0.00000005"),
    // });
    // console.log("nominate1");
    // sleep(10000);
    // await retro.nominate(0, "nomination2", addr4.address, {
    //   value: ethers.utils.parseEther("0.00000005"),
    // });
    // console.log("nominate2");
    // sleep(10000);
    // await retro.castVote(0, [50, 50]);
    // console.log("cast1");
    // sleep(10000);
    // await retro.castVote(0, [20, 80]);
    // console.log("cast2");
    // sleep(10000);

    // await retro.disperseFunds(0);
    // const addr3WeiValue = await provider.getBalance(addr3.address);
    // const addr3EthValue = ethers.utils.formatEther(addr3WeiValue);
    // const addr4WeiValue = await provider.getBalance(addr4.address);
    // const addr4EthValue = ethers.utils.formatEther(addr4WeiValue);
    // //const addr3ExpectedValue = ethers.utils.formatEther(BigInt(10423*(10**18)));
    // //const addr4ExpectedValue = ethers.utils.formatEther(BigInt(10576*(10**18)));

    // const nom1 = await retro.getNominationData(0, 0);
    // const nom2 = await retro.getNominationData(0, 1);
    // const round1 = await retro.getRoundData(0);
    // //const amount1 = await retro.getAmountData(0);

    // console.log(round1);
    // console.log("eth values");
    // console.log(addr3EthValue);
    // console.log(addr4EthValue);

    // console.log("amount");
    // //console.log(amount1);

    // console.log(nom1);
    // console.log(nom2);

    // expect(addr3EthValue > (addr3ExpectedValue-2));
    // expect(addr4EthValue > (addr4ExpectedValue-2));
  }).timeout(1000000);
});
