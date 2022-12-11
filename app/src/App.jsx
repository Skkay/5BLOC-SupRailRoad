import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AdminPage from './pages/AdminPage/AdminPage';
import MainPage from './pages/MainPage/MainPage';
import UserPage from './pages/UserPage/UserPage';

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
        </div>
    );
};

export default App;
