import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import PrivilegeCardForm from '../../components/Form/PrivilegeCardForm';
import Withdraw from '../../components/Withdraw/Withdraw';

const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS;

const BUS_TICKET_CONTRACT_ADDRESS = import.meta.env.VITE_BUS_TICKET_CONTRACT_ADDRESS;
const TRAIN_TICKET_CONTRACT_ADDRESS = import.meta.env.VITE_TRAIN_TICKET_CONTRACT_ADDRESS;
const METRO_TICKET_CONTRACT_ADDRESS = import.meta.env.VITE_METRO_TICKET_CONTRACT_ADDRESS;

const AdminPage = () => {
    const address = useSelector((state) => state.address.value);

    const [contracts, setContracts] = useState();

    const fetchPrivilegeCardContracts = () => {
        getDocs(collection(db, 'privilegeCards'))
            .then((querySnaphot) => {
                const docs = [];
                querySnaphot.docs.map((doc) => docs.push({id: doc.id, ...doc.data()}));
                setContracts(docs);
            })
            .catch((err) => {
                console.error(err);
                toast.error('An unexpected error occurred.');
            })
        ;
    };

    useEffect(() => {
        fetchPrivilegeCardContracts();
    }, []);

    if (address !== ADMIN_ADDRESS) {
        return (
            <div>Not authorized</div>
        );
    }

    return (
        <div>
            <div className="border rounded-lg shadow-md p-4">
                <h1 className="text-2xl mb-5">Create a new Privilege Card</h1>
                <PrivilegeCardForm />
            </div>
            <div className="border rounded-lg shadow-md p-4 mt-4">
                <h1 className="text-2xl mb-5">Withdraw</h1>
                <div className="flex flex-wrap gap-3">
                    <Withdraw contractAddress={BUS_TICKET_CONTRACT_ADDRESS} contractItemType={'Ticket'} />
                    <Withdraw contractAddress={TRAIN_TICKET_CONTRACT_ADDRESS} contractItemType={'Ticket'} />
                    <Withdraw contractAddress={METRO_TICKET_CONTRACT_ADDRESS} contractItemType={'Ticket'} />
                    {contracts && contracts.map((contract) => {
                        return <Withdraw key={contract.id} contractAddress={contract.contractAddress} contractItemType={'PrivilegeCard'} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
