/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "optimism-local",
  networks: {
    "optimism-local": {
      url: "http://localhost:8545",
    },
  },
};
