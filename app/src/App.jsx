import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import AdminPage from './pages/AdminPage/AdminPage';
import MainPage from './pages/MainPage/MainPage';
import UserPage from './pages/UserPage/UserPage';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="p-4">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/me" element={<UserPage />} />
                </Routes>
            </main>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        </div>
    );
};

export default App;
