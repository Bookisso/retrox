const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Fund = await hre.ethers.getContractFactory("Fund");
  const fund = await Fund.deploy();

  await fund.deployed();

  console.log("Retro deployed to:", fund.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
