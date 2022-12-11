const OwnedPrivilegeCard = ({ privilegeCard }) => {
    const dateFormat = {
        dateStyle: 'medium',
        timeStyle: 'short',
    };

    const boughtDate = new Date(privilegeCard.timeLastUpdated);
    const formattedBoughtDate = new Intl.DateTimeFormat('en-US', dateFormat).format(boughtDate);

    return (
        <div className="relative flex bg-white border rounded-lg shadow-xl p-2">
            <div className="border border-gray-200 w-fit p-2">
                <img src={`https://ipfs.io/ipfs/${privilegeCard.rawMetadata.image.substring(7)}`} alt={`${privilegeCard.title} image`} width="90" height="90" />
            </div>
            <div className="self-center ml-4 mr-2">
                <h1 className="text-xl font-semibold">{privilegeCard.title} ({privilegeCard.contract.symbol})</h1>
                <div>{privilegeCard.description}</div>
                <div className="text-sm italic w-fit ml-auto mt-3">Bought on {formattedBoughtDate}</div>
            </div>
        </div>
    );
}

export default OwnedPrivilegeCard;
