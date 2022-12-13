# SupRailRoad - Smart contracts

## Requirements
- An [Alchemy](https://www.alchemy.com) account
- A [MetaMask](https://metamask.io) wallet
- Node.js 18

## Install

1. Create `.env` file from the `.env.dist` with:
```ini
METAMASK_API_KEY = ""   # Your MetaMask private API key
ALCHEMY_API_KEY = ""    # Your Alchemy private API key
```

2. Install packages
```
yarn install
```

## Contract generation

### Compiling contracts 
Compile `PrivilegeCard.sol` and `Ticket.sol` contracts:
```
npx hardhat compile
```
The generated `artifacts` files must be in the front-end application at `app/src/artifacts`, as described in the *hardhat* configuration file (`hardhat.config.js`, l. 10).

### Deploying Bus ticket / Metro ticket / Train ticket contract
Deployment scripts are in the `./scripts` directory:
- `deploy-srrbt.js`: Bus ticket
- `deploy-srrmt.js`: Metro ticket
- `deploy-srrtt.js`: Train ticket

*Note: `SRRBT` stands for "SupRailRoad Bus Ticket", `SRRMT` is for "SupRailRoad Metro Ticket", and `SRRTT` for "SupRailRoad Train Ticket".*

1. Update variables `name`, `symbol`, `ipfsMetadataUri` in these scripts (l. 4, 5, 6) to your desired value.

2. Deploy each contract:
```
npx hardhat run ./scripts/deploy-srrbt.js --network goerli
npx hardhat run ./scripts/deploy-srrmt.js --network goerli
npx hardhat run ./scripts/deploy-srrtt.js --network goerli
```

3. Keep the resulted contract addresses, they will be used to run the front-end application.

### Deploying Privilege Card contract
You do not need to deploy the `PrivilegeCard` contract since the deployment will be done from the front-end application by filling out the form under the admin section.
