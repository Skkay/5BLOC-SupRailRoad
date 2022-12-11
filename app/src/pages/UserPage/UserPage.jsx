import { useSelector } from 'react-redux';
import OwnedPrivilegeCardContainer from '../../components/CardContainer/OwnedPrivilegeCardContainer';

const UserPage = () => {
    const address = useSelector((state) => state.address.value);

    if (!address) {
        return (
            <div>Not authorized</div>
        );
    }

    return (
        <div>
            <OwnedPrivilegeCardContainer />
        </div>
    );
};

export default UserPage;
