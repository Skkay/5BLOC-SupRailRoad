import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Alchemy, Network } from 'alchemy-sdk';
import { db } from '../../firebase';
import OwnedPrivilegeCard from '../Card/OwnedPrivilegeCard';
import { useSelector } from 'react-redux';

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const OwnedPrivilegeCardContainer = () => {
    const clientAddress = useSelector((state) => state.address.value);

    const [nfts, setNfts] = useState();

    const fetchPrivilegeCardContracts = () => {
        return getDocs(collection(db, 'privilegeCards'))
            .then((querySnaphot) => {
                const docs = [];
                querySnaphot.docs.map((doc) => docs.push({id: doc.id, ...doc.data()}));

                return docs;
            })
            .catch((err) => console.error(err))
        ;
    };

    const fetchNftsByContract = async () => {
        if (!clientAddress) {
            return;
        }

        const contracts = await fetchPrivilegeCardContracts();

        const alchemy = new Alchemy({
            apiKey: ALCHEMY_API_KEY,
            network: Network.ETH_GOERLI,
        });

        alchemy.nft.getNftsForOwner(clientAddress, {
            contractAddresses: contracts.map((contract) => contract.contractAddress),
        })
            .then((res) => setNfts(res))
            .catch((err) => console.error(err))
        ;
    };

    useEffect(() => {
        fetchNftsByContract();
    }, [clientAddress]);

    return (
        <>
            <div className="text-xl font-semibold">
                {nfts && `You own ${nfts.totalCount} ${nfts.totalCount < 2 ? 'card' : 'cards'}:`}
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
                {nfts && nfts.ownedNfts.map((nft, index) => {
                    return <OwnedPrivilegeCard key={index} privilegeCard={nft} />
                }).reverse()}
            </div>
        </>
    );
};

export default OwnedPrivilegeCardContainer;
