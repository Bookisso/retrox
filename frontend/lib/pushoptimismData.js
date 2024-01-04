import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import { contractInitNomination } from "../lib/contractInitNomination";
import { deployed_address } from "../contract_config.js";
const optimismNominations = require("../data/optimismNominations.json");

// const privateKey =
//   "21d6693a7fed9d79704030b27d7ce42ae47887ebea76eb5407e6854423b6de27";
const privateKey =
  "57a697c03ac38851d2e706a91182671f466d0662aecac8d8938cea9e3a608734";
// const privateKey =
// "k51qzi5uqu5dhn2f0mozbga0h0r3f8xnt9pytpcm72bl8zawg1hvu5anw252un";
const infura = "https://goerli.infura.io/v3/Y3JZRXFIKJ1WW9W3N4R1RREWZM47PMRZMX";
const address = "0x5dd58Bf0f843d97bD5D2F115F67a2A5221214b84";

export async function loopOverData(roundNum) {
  const ipfs = create({
    url: "https://ipfs.io:5001/api/v0",
  });
  const provider = new ethers.providers.JsonRpcProvider(infura);
  const signer = new ethers.Wallet(privateKey, provider);
  const retroAddress = deployed_address;
  const retroABI = [
    "function nominate(uint256 roundNum, string memory nominationURI, address recipient) public payable",
  ];
  const retroContract = new ethers.Contract(retroAddress, retroABI, signer);
  optimismNominations.forEach(async (el) => {
    if (el.id < 4) {
      const res = await ipfs.add(
        JSON.stringify({
          nominatorName: el.nominatorName,
          projectName: el.projectName,
          projectURL: el.projectURL,
          fundingAmount: el.fundingAmount,
          projectDescription: el.projectDescription,
        })
      );
      const ipfsURI = `ipfs://${res.path}`;
      const intNonce = await provider.getTransactionCount(address, "pending");
      console.log(intNonce);
      const nonce = ethers.utils.hexlify(intNonce + el.id - 1);
      const tx = await retroContract.nominate(
        roundNum,
        ipfsURI,
        "0x0000000000000000000000000000000000000000",
        { value: ethers.utils.parseEther("0.01"), nonce: nonce }
      );
      tx.wait();
      console.log("done");
    }
  });
}
