import vite from '../../assets/vite.svg';

const Navbar = () => {
    return (
        <nav className="bg-white border-gray-200 p-2">
            <div className="flex flex-wrap items-center justify-between">
                <a href="#" className="flex items-center">
                    <img src={vite} className="h-9 mr-3" alt="SupRailRoad Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap">SupRailRoad</span>
                </a>
                <div className="w-auto">
                    <ul className="flex flex-row bg-white p-2">
                        <li>
                            <button className="py-2 px-3 rounded bg-transparent hover:bg-gray-100">Connect to MetaMask</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
