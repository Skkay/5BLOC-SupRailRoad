import Ticket from '../Card/Ticket';

const BUS_TICKET_CONTRACT_ADDRESS = import.meta.env.VITE_BUS_TICKET_CONTRACT_ADDRESS;
const TRAIN_TICKET_CONTRACT_ADDRESS = import.meta.env.VITE_TRAIN_TICKET_CONTRACT_ADDRESS;
const METRO_TICKET_CONTRACT_ADDRESS = import.meta.env.VITE_METRO_TICKET_CONTRACT_ADDRESS;

const TicketContainer = () => {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            <Ticket title={'Bus Ticket'} contractAddress={BUS_TICKET_CONTRACT_ADDRESS} currency={'GoerliETH'} />
            <Ticket title={'Train Ticket'} contractAddress={TRAIN_TICKET_CONTRACT_ADDRESS} currency={'GoerliETH'} />
            <Ticket title={'Metro Ticket'} contractAddress={METRO_TICKET_CONTRACT_ADDRESS} currency={'GoerliETH'} />
        </div>
    );
};

export default TicketContainer;
