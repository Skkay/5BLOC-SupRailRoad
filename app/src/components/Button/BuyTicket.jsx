import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

const MARKET_ADDRESS = import.meta.env.VITE_MARKET_ADDRESS;

const BuyTicket = ({ className, price }) => {
    const address = useSelector((state) => state.address.value);

    const handleClick = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const tx = {
            to: MARKET_ADDRESS,
            value: ethers.utils.parseEther(price.toString()),
        };

        signer.sendTransaction(tx).then((transaction) => {
            // TODO: Mint NFT ticket
            console.log(transaction);
        });
    };

    return (
        <button className={className} onClick={handleClick} disabled={address === ''}>Buy Ticket</button>
    );
}

export default BuyTicket;
