import { useEffect, useState } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

import ticketContractMetadata from '../../artifacts/contracts/Ticket.sol/Ticket.json';
import privilegeCardMetadata from '../../artifacts/contracts/PrivilegeCard.sol/PrivilegeCard.json';

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const Withdraw = ({ contractAddress, contractItemType }) => {
    const [metadata, setMetadata] = useState();

    const fetchMetadata = () => {
        const alchemy = new Alchemy({
            apiKey: ALCHEMY_API_KEY,
            network: Network.ETH_GOERLI,
        });

        alchemy.nft.getNftMetadata(contractAddress, 1)
            .then((res) => setMetadata(res))
            .catch((err) => {
                console.error(err);
                toast.error('An unexpected error occurred.');
            })
        ;
    }

    const handleWithdrawButtonClick = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        let contract;
        if (contractItemType === 'Ticket') {
            contract = new ethers.Contract(contractAddress, ticketContractMetadata.abi, signer);
        } else if (contractItemType === 'PrivilegeCard') {
            contract = new ethers.Contract(contractAddress, privilegeCardMetadata.abi, signer);
        } else {
            console.error('Unknown contract item type');
            toast.error('An unexpected error occurred.');
            return;
        }


        toast.promise(contract.withdraw(), {
            pending: 'The withdraw is in process...',
            success: `You have successfully withdrawn ${metadata.title} (${metadata.contract.symbol})!`,
            error: 'An error occurred during the withdraw process.',
        })
            .catch((err) => console.error(err))
        ;
    };

    useEffect(() => {
        console.log(contractItemType);
        fetchMetadata();
    }, []);

    return (
        <div className="border w-fit rounded-md p-4 text-center">
            <h2 className="text-xl">{metadata ? metadata.title : '-'} ({metadata ? metadata.contract.symbol : '-'})</h2>
            <button className="bg-purple-800 text-white rounded-md px-4 py-3 mt-3" onClick={handleWithdrawButtonClick}>Withdraw</button>
        </div>
    );
};

export default Withdraw;
