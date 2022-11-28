require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    paths: {
        artifacts: '../app/src/artifacts',
    },
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
            accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
        },
    },
};
