require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { ALCHEMY_API_KEY, METAMASK_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    paths: {
        artifacts: '../app/src/artifacts',
    },
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [`0x${METAMASK_API_KEY}`]
        },
    },
};
