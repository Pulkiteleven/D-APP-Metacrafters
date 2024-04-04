require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
const private_key = process.env.private_key;
const API_URL = process.env.API_URL;
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "volta",
   networks: {
      hardhat: {},
      volta: {
         url: API_URL,
         accounts: [`0x${private_key}`],
         gas: 210000000,
         gasPrice: 800000000000,
      }
   },
};
