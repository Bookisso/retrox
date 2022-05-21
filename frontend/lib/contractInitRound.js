import { ethers } from 'ethers'
import { deployed_address } from '../contract_config.js';

export async function contractInitRound(roundURI, badgeholders, value){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(signer)
  const retroAddress = deployed_address
  const retroABI = [
    "function createRound(string memory roundURI, address[] memory badgeHolders) public payable"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider)
  // await retroContract.connect(signer).createRound(roundURI, badgeholders, {value:ethers.utils.parseEther(`${value}`)});
}
