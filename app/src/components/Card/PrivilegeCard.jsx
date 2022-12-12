import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { Network, Alchemy } from 'alchemy-sdk';
import { toast } from 'react-toastify';

import privilegeCardMetadata from '../../artifacts/contracts/PrivilegeCard.sol/PrivilegeCard.json';

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const PrivilegeCard = ({ contractAddress, currency = 'ETH' }) => {
    const clientAddress = useSelector((state) => state.address.value);

    const [cost, setCost] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [left, setLeft] = useState();

    const fetchData = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(contractAddress, privilegeCardMetadata.abi, provider);

        contract.cost()
            .then((cost) => setCost(String(cost)))
            .catch((err) => {
                console.error(err);
                toast.error('An unexpected error occurred.');
            })
        ;

        Promise.all([contract.quantity(), contract.totalSupply()])
            .then((values) => {
                const quantity = formatUnits(BigNumber.from(values[0]), 0);
                const totalSupply = formatUnits(BigNumber.from(values[1]), 0);

                setLeft(quantity - totalSupply);
            })
            .catch((err) => {
                console.error(err);
                toast.error('An unexpected error occurred.');
            });
        ;
    }

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

    const handleBuyButtonClick = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, privilegeCardMetadata.abi, signer);
        const overrides = {
            from:  clientAddress,
            value: cost,
        }

        toast.promise(contract.mint(clientAddress, overrides), {
            pending: 'The transaction is in process...',
            success: `You successfully buy one ${metadata.title} (${metadata.contract.symbol})!`,
            error: 'An error occurred during the transaction process.',
        })
            .catch((err) => console.error(err))
        ;
    };

    useEffect(() => {
        fetchData();
        fetchMetadata();
    }, []);

    const CardLeft = ({ remainingQuantity }) => {
        if (remainingQuantity > 7) {
            return <div className="bg-green-800 text-white px-2 rounded-lg">{remainingQuantity ?? '-'} left</div>;
        }

        if (remainingQuantity > 3) {
            return <div className="bg-orange-700 text-white px-2 rounded-lg">{remainingQuantity ?? '-'} left</div>;
        }

        return <div className="bg-red-800 text-white px-2 rounded-lg">{remainingQuantity ?? '-'} left</div>;
    }

    return (
        <div className="relative flex bg-white border rounded-lg shadow-xl p-4">
            <div className="border border-gray-200 w-fit p-4">
                <img src={metadata ? `https://ipfs.io/ipfs/${metadata.rawMetadata.image.substring(7)}` : ''} alt={`${metadata ? metadata.title : ''} image`} width="220" height="220" />
            </div>
            <div className="ml-4 self-center">
                <h1 className="text-xl font-semibold">{metadata ? metadata.title : '-'} ({metadata ? metadata.contract.symbol : '-'})</h1>
                <div>{metadata ? metadata.description : '-'}</div>
                <div className="text-4xl mt-3">{cost ? formatUnits(BigNumber.from(cost), 'ether') : '-'} {currency}</div>

                <div className="mt-8 w-fit mx-auto">
                    <button className='bg-purple-800 disabled:bg-purple-400 text-white rounded-md px-4 py-3' onClick={handleBuyButtonClick} disabled={clientAddress === '' || left === 0}>Buy Card</button>
                </div>

                <div className="absolute bottom-2 right-4">
                    <CardLeft remainingQuantity={left} />
                </div>
            </div>
        </div>
    );
};

export default PrivilegeCard;
