import { useForm } from "react-hook-form";

const PrivilegeCard = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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
                    <span className="block text-sm font-medium text-slate-700">Description</span>
                    <input {...register('description', { required: true })} type="text" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Price</span>
                    <input {...register('price', { required: true, min: 0 })} type="number" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Quantity</span>
                    <input {...register('quantity', { required: true, min: 0 })} type="number" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">% Discount</span>
                    <input {...register('discount', { required: true, min: 0, max: 100 })} type="number" className="block mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
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
                <button className='bg-purple-800 disabled:bg-purple-400 text-white rounded-md px-4 py-2 self-end'>Create</button>
            </div>
        </form>
    )
};

export default PrivilegeCard;
