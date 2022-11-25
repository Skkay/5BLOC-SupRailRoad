import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddress } from '../../slices/addressSlice';
import vite from '../../assets/vite.svg';

const Navbar = () => {
    const [isConnected, setConnected] = useState(false);

    const address = useSelector((state) => state.address.value);
    const dispatch = useDispatch();

    const handleMetamaskConnect = () => {
        ethereum.request({ method: 'eth_requestAccounts' })
            .then((res) => setConnected(true))
        ;
    }

    useEffect(() => {
        if (ethereum.selectedAddress !== null) {
            dispatch(setAddress(ethereum.selectedAddress));
            setConnected(true);
        }
    }, [isConnected]);

    return (
        <nav className="bg-white border-b border-gray-200 p-2">
            <div className="flex flex-wrap items-center justify-between">
                <a href="#" className="flex items-center">
                    <img src={vite} className="h-9 mr-3" alt="SupRailRoad Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap">SupRailRoad</span>
                </a>
                <div className="w-auto">
                    <ul className="flex flex-row p-2">
                        <li>
                            {isConnected ?
                                <span className="py-2 px-3">{address}</span>
                            :
                                <a href="#" onClick={handleMetamaskConnect} className="py-2 px-3 rounded bg-transparent hover:bg-gray-100">Connect to MetaMask</a>
                            }

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
