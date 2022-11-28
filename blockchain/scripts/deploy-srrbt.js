const hre = require('hardhat');

const main = async () => {
    const name = 'SupRailRoad - Bus Ticket';
    const symbol = 'SRRBT';
    const ipfsMetadataUri = 'ipfs://QmeKvYa8F2srzp2WNVPwNCeDYvXs6bxR4hSiqR4T4pzuRt';

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
