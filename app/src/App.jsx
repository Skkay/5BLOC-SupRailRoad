import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './pages/MainPage/MainPage.jsx';

const App = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className='p-4'>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
