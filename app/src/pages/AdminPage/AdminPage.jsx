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
            <div className="border rounded-lg shadow-md p-4">
                <h1 className="text-2xl mb-5">Create a new Privilege Card</h1>
                <PrivilegeCardForm />
            </div>
        </div>
    );
};

export default AdminPage;
