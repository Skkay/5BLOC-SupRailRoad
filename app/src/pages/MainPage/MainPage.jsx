import PrivilegeCardContainer from '../../components/CardContainer/PrivilegeCardContainer';
import TicketContainer from '../../components/CardContainer/TicketContainer';

const MainPage = () => {
    return (
        <>
            <TicketContainer />
            <div className="mt-4">
                <PrivilegeCardContainer />
            </div>

        </>
    );
};

export default MainPage;
