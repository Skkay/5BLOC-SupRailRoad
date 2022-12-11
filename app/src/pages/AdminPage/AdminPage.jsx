import { useSelector } from 'react-redux';
import PrivilegeCardForm from '../../components/Form/PrivilegeCardForm';

const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS;

const AdminPage = () => {
    const address = useSelector((state) => state.address.value);

    if (address !== ADMIN_ADDRESS) {
        return (
            <div>Not authorized</div>
        );
    }

    return (
        <div>
            <PrivilegeCardForm />
        </div>
    );
};

export default AdminPage;
