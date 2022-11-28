const hre = require('hardhat');

const main = async () => {
    const name = 'SupRailRoad - Metro Ticket';
    const symbol = 'SRRMT';
    const ipfsMetadataUri = 'ipfs://QmZFvxr4WY8SvxHft3PpRAT6Et3Qqyye4PCtHnrfyWkPyu';

    const srrContractFactory = await hre.ethers.getContractFactory('Ticket');
    const srrContract = await srrContractFactory.deploy(name, symbol, ipfsMetadataUri);

    await srrContract.deployed();

    console.log(`${name} (${symbol}) contract deployed to: ${srrContract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
;
