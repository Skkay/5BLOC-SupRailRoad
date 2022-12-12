import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddress } from '../../slices/addressSlice';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

import 'react-tooltip/dist/react-tooltip.css';
import vite from '../../assets/vite.svg';

const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS;

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

    const NavbarLinks = () => {
        if (isConnected && address) {
            return (
                <>
                    <li>
                        <Link to="/me" className="py-2 px-3 ml-2 rounded bg-transparent hover:bg-gray-100">My profile</Link>
                    </li>
                    {address === ADMIN_ADDRESS && (
                        <li>
                            <Link to="/admin" className="py-2 px-3 ml-2 rounded bg-transparent hover:bg-gray-100">Admin</Link>
                        </li>
                    )}
                    <li>
                        <span id="tooltip-anchor" className="bg-sky-700 text-white px-2 py-1 rounded ml-2">Connected</span>
                        <Tooltip anchorId="tooltip-anchor" content={address} place="left" />
                    </li>
                </>
            );
        }

        return (
            <>
                <li>
                    <a href="#" onClick={handleMetamaskConnect} className="py-2 px-3 rounded bg-transparent hover:bg-gray-100">Connect to MetaMask</a>
                </li>
            </>
        );
    }

    return (
        <nav className="bg-white border-b border-gray-200 p-2">
            <div className="flex flex-wrap items-center justify-between">
                <a href="#" className="flex items-center">
                    <img src={vite} className="h-9 mr-3" alt="SupRailRoad Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap">SupRailRoad</span>
                </a>
                <div className="w-auto">
                    <ul className="flex flex-row p-2">
                        <NavbarLinks />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
