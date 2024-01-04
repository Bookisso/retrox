require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const {
  API_MAIN,
  API_KOVAN,
  PRIVATE_KEY_KOVAN,
  PRIVATE_KEY_LOCAL,
  PRIVATE_KEY_MAIN,
  ETHERSCAN_API_KEY,
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
  PRIVATE_KEY_3,
  PRIVATE_KEY_4,
  PRIVATE_KEY_5,
} = process.env;

// environment variables for private keys and API links are defined using .env file
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "optimism-local",
  etherscan: {
    apiKey: {
      optimisticKovan: "M663MZBQMCKRNDACGZRM4RIAG86VJ5KVQD",
      goerli: "Y3JZRXFIKJ1WW9W3N4R1RREWZM47PMRZMX",
    },
  },
  networks: {
    // for mainnet
    //'optimism': {
    // url: API_MAIN,
    // accounts: [PRIVATE_KEY_MAIN]
    //},
    // for testnet
    "optimism-kovan": {
      url: "https://api-kovan.etherscan.io",
      accounts: [
        // PRIVATE_KEY_1,
        // PRIVATE_KEY_2,
        // PRIVATE_KEY_3,
        // PRIVATE_KEY_4,
        // PRIVATE_KEY_5,
      ],
      gas: 9000000,
    },
    "optimism-goerli": {
      url: "https://api-goerli.etherscan.io/api",
      accounts: [
        "57a697c03ac38851d2e706a91182671f466d0662aecac8d8938cea9e3a608734",
        "e7cd89f859f9b90f38975fe0f473b9c0f0189ae550dd0358901ccfe277734cd6",
      ],
      gas: 1,
    },
    "optimism-local": {
      url: "http://localhost:8545",
      accounts: [
        "57a697c03ac38851d2e706a91182671f466d0662aecac8d8938cea9e3a608734",
      ],
    },
  },
};
