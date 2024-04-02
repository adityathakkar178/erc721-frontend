import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connect from './Components/Connect';
import Contract from './Components/Contract';
import NFT from './Components/NFT';
import Navigation from './Components/Navigate';

function App() {
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        setIsConnected(true);
    };

    return (
        <BrowserRouter>
            <div>
                {!isConnected && (
                    <Connect
                        buttontext="Connect to MetaMask"
                        onConnect={handleConnect}
                    />
                )}
                {isConnected && (
                    <>
                        <Navigation />
                        <Routes>
                            <Route path="/" element={<Contract />} />
                            {/* <Route path="/nfts" element={<NFT />} /> */}
                        </Routes>
                    </>
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
