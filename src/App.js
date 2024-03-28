import { useState } from 'react';
import Connect from './Components/Connect';
import Contract from './Components/Contract';

function App() {
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        setIsConnected(true);
    };

    return (
        <div>
            {!isConnected && (
                <Connect
                    buttontext="Connect to MetaMask"
                    onConnect={handleConnect}
                />
            )}
            {/* {isConnected && <Network />}
          {isConnected && <AccountSwitcher />} */}
            {isConnected && <Contract />}
        </div>
    );
}

export default App;
