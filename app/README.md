# SupRailRoad - Front-end app

## Requirements
- The contract addresses for the *BusTicket*, *MetroTicket* and *TrainTicket*
- An [Alchemy](https://www.alchemy.com) account
- A Firebase/Firestore configured project
- A [MetaMask](https://metamask.io) wallet
- Node.js 18

## Install

1. Create `.env.local` file from the `.env` with:
```ini
VITE_BUS_TICKET_CONTRACT_ADDRESS = ""
VITE_TRAIN_TICKET_CONTRACT_ADDRESS = ""
VITE_METRO_TICKET_CONTRACT_ADDRESS = ""

VITE_ADMIN_ADDRESS = ""
VITE_ACCOUNT_PRIVATE_KEY = "" # MetaMask API key
VITE_ALCHEMY_API_KEY = ""

VITE_FIREBASE_API_KEY = ""
VITE_FIREBASE_AUTH_DOMAIN = ""
VITE_FIREBASE_PROJECT_ID = ""
VITE_FIREBASE_STORAGE_BUCKET = ""
VITE_FIREBASE_MESSAGING_SENDER_ID = ""
VITE_FIREBASE_APP_ID = ""
```

2. Install packages
```
yarn install
```

## Run
Run dev server or build for production

1. Run dev server
```
yarn run dev
```

2. Build for production
```
yarn run build
```
More info on Vite doc: https://vitejs.dev/guide/build.html

