import { useForm } from 'react-hook-form';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase';

import privilegeCardContractMetadata from '../../artifacts/contracts/PrivilegeCard.sol/PrivilegeCard.json';

const METAMASK_API_KEY = import.meta.env.VITE_METAMASK_API_KEY;

const PrivilegeCard = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const wallet = new ethers.Wallet(METAMASK_API_KEY, provider);

        const contractFactory = new ethers.ContractFactory(privilegeCardContractMetadata.abi, privilegeCardContractMetadata.bytecode, wallet);
        const contract = await contractFactory.deploy(data.name, data.symbol, data.metadataUri, parseUnits(data.price, 'ether'), data.quantity, data.discount);

        await toast.promise(contract.deployed(), {
            pending: 'The contract is being deployed...',
            success: 'The contract is deployed!',
            error: 'The contract was unable to be deployed.',
        });

        console.log(`Contract deployed to: ${contract.address}`);

        const contractData = {
            ...data,
            contractAddress: contract.address,
        };

        toast.promise(addDoc(collection(db, 'privilegeCards'), contractData), {
            pending: 'The contract address is being stored in the database...',
            success: 'The contract address is stored to the database!',
            error: 'The contract address was unable to be stored.',
        })
            .catch((err) => console.error(err))
        ;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-4">
                <label>
                    <span className="block text-sm font-medium text-slate-700">Name</span>
                    <input {...register('name', { required: true })} type="text" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Symbol</span>
                    <input {...register('symbol', { required: true })} type="text" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Description</span>
                    <input {...register('description', { required: true })} type="text" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Price</span>
                    <input {...register('price', { required: true, min: 0 })} type="number" min={0} step="any" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Quantity</span>
                    <input {...register('quantity', { required: true, min: 0 })} type="number" min={0} className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">% Discount</span>
                    <input {...register('discount', { required: true, min: 0, max: 100 })} type="number" min={0} max={100} className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Metadata IPFS URI</span>
                    <input {...register('metadataUri', { required: true })} type="text" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <button className="bg-purple-800 disabled:bg-purple-400 text-white rounded-md px-4 py-2 self-end">Create</button>
            </div>
        </form>
    )
};

export default PrivilegeCard;
