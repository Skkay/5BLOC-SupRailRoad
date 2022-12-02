import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TicketContainer from './components/TicketContainer/TicketContainer';

const App = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className='p-4'>
                <Routes>
                    <Route path="/" element={<TicketContainer />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
