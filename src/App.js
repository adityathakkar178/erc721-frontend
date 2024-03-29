import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Connect from './Components/Connect';
import Contract from './Components/Contract';
import NFT from './Components/NFT';
import Root from './pages/Root';

function App() {
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        setIsConnected(true);
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/contracts',
                    element: <Contract />,
                },
                {
                    path: '/nfts',
                    element: <NFT />,
                },
            ],
        },
    ]);

    return (
        <div>
            {!isConnected && (
                <Connect
                    buttontext="Connect to MetaMask"
                    onConnect={handleConnect}
                />
            )}
            {isConnected && <RouterProvider router={router} />}
        </div>
    );
}

export default App;
