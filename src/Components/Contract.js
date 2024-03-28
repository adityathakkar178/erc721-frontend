import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Balance from './Balance';
import MintTokens from './Mint';
import Owner from './Owner';
import Approve from './Approve';
import GetApprove from './GetApproved';
import ApproveForAll from './ApproveAll';
import ViewApprove from './ViewApproveAll';
import TransferTokens from './Transfer';
import URI from './TokenURI';

const Contract = () => {
    const [abi, setAbi] = useState('');
    const [contract, setContract] = useState('');

    useEffect(() => {
        const fetchContractABI = () => {
            axios
                .get('http://localhost:3004/contract-abi')
                .then((response) => {
                    const abi = response.data.abi;
                    console.log(abi);
                    setAbi(abi);
                })
                .catch((error) => {
                    console.error('Error fetching contract ABI:', error);
                });
        };

        fetchContractABI();
    }, []);

    useEffect(() => {
        if (abi) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(() => {
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum
                    );
                    const signer = provider.getSigner();
                    console.log(signer.getAddress());
                    const contractAddress =
                        '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
                    const contract = new ethers.Contract(
                        contractAddress,
                        abi,
                        signer
                    );
                    console.log(contract);
                    setContract(contract);
                })
                .catch((error) => {
                    console.error('Error connecting to MetaMask:', error);
                });
        }
    }, [abi]);

    return (
        <>
            <h3>ERC721 Contract</h3>

            <div className="row">
                <div className="col-md-4">
                    <Card className="border-0">
                        <Card.Body>
                            <Balance contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card className="border-0">
                        <Card.Body>
                            <Owner contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="border-0">
                        <Card.Body>
                            <GetApprove contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <Card className="border-0">
                        <Card.Body>
                            <Approve contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card className="border-0">
                        <Card.Body>
                            <ViewApprove contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="border-0">
                        <Card.Body>
                            <ApproveForAll contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <Card className="border-0">
                        <Card.Body>
                            <MintTokens contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card className="border-0">
                        <Card.Body>
                            <TransferTokens contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="border-0">
                        <Card.Body>
                            <URI contract={contract} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Contract;
