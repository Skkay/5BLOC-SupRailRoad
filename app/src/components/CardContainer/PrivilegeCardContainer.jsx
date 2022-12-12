import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import PrivilegeCard from '../Card/PrivilegeCard';

const PrivilegeCardContainer = () => {
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

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {contracts && contracts.map((contract) => {
                return <PrivilegeCard key={contract.id} contractAddress={contract.contractAddress} currency={'GoerliETH'} />
            })}
        </div>
    );
};

export default PrivilegeCardContainer;
