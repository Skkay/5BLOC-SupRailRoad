import Navbar from './components/Navbar/Navbar';
import Ticket from './components/Card/Ticket';

const App = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className='p-4'>
                <Ticket title={'Bus Ticket'} price={0.1} />
            </main>
        </div>
    );
};

export default App;
