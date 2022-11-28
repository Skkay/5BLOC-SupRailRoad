const hre = require('hardhat');


const main = async () => {
    const name = 'SupRailRoad - Train Ticket';
    const symbol = 'SRRTT';
    const ipfsMetadataUri = 'ipfs://QmaqK4ycGAJCGfrZ6GFRDSfRsAgNioJinVUnnUMWyDyJTc';

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
