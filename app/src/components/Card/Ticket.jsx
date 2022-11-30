import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { Network, Alchemy } from "alchemy-sdk";

import ticketContractMetadata from '../../artifacts/contracts/Ticket.sol/Ticket.json';

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const Ticket = ({ contractAddress, currency = 'ETH' }) => {
    const clientAddress = useSelector((state) => state.address.value);

    const [cost, setCost] = useState(null);
    const [metadata, setMetadata] = useState(null);

    const fetchCost = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(contractAddress, ticketContractMetadata.abi, provider);

        contract.cost()
            .then((cost) => setCost(String(cost)))
            .catch((err) => console.err(err))
        ;
    }

    const fetchMetadata = () => {
        const alchemy = new Alchemy({
            apiKey: ALCHEMY_API_KEY,
            network: Network.ETH_GOERLI,
        });

        alchemy.nft.getNftMetadata(contractAddress, 1)
            .then((res) => setMetadata(res))
            .catch((err) => console.err(err))
        ;
    }

    const handleBuyButtonClick = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, ticketContractMetadata.abi, signer);
        const overrides = {
            from:  clientAddress,
            value: cost,
        }

        contract.mint(clientAddress, overrides)
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
        ;
    };

    useEffect(() => {
        fetchCost();
        fetchMetadata();
    }, []);

    return (
        <div className="w-80 bg-white border rounded-lg shadow-xl">
            <div className="border border-gray-200 w-fit mx-auto my-4 p-4">
                <img src={metadata ? `https://ipfs.io/ipfs/${metadata.rawMetadata.image.substring(7)}` : ''} alt={`${metadata ? metadata.title : ''} image`} width="220" height="220" />
            </div>
            <div className="border-t mt-5 p-4">
                <h1 className="text-xl font-semibold">{metadata ? metadata.title : '-'} ({metadata ? metadata.contract.symbol : '-'})</h1>
                <div>{metadata ? metadata.description : '-'}</div>
                <div className="text-4xl mt-3">{cost ? formatUnits(BigNumber.from(cost), 'ether') : '-'} {currency}</div>
                <div className="mt-12 w-fit mx-auto">
                    <button className='bg-purple-800 disabled:bg-purple-400 text-white rounded-md px-4 py-3' onClick={handleBuyButtonClick} disabled={clientAddress === ''}>Buy Ticket</button>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
