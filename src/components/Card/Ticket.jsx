import busTicketImg from '../../assets/bus-ticket_placeholder.png';

const Ticket = ({ title, price, currency = 'GoerliETH' }) => {
    return (
        <div className="w-80 bg-white border rounded-lg shadow-xl">
            <div className="border border-gray-200 w-fit mx-auto my-4 p-4">
                <img src={busTicketImg} alt={`${title} image`} width="220" height="220" />
            </div>
            <div className="border-t mt-5 p-4">
                <h1 className="text-xl font-semibold">{title}</h1>
                <div className="text-4xl mt-3">{price} {currency}</div>
                <div className="mt-12 w-fit mx-auto">
                    <button className="bg-purple-800 text-white rounded-md px-4 py-3">Buy Ticket</button>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
