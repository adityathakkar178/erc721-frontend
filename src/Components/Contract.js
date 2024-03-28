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
                        '0x5fbdb2315678afecb367f032d93f642f64180aa3';
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

            <div class="card-group">
                <div class="card border-0 ">
                    <div class="card-body">
                        <Balance contract={contract} />
                    </div>
                </div>
                <div class="card border-0 ">
                    <div class="card-body">
                        <Owner contract={contract} />
                    </div>
                </div>
                <div class="card border-0 ">
                    <div class="card-body">
                        <GetApprove contract={contract} />
                    </div>
                </div>
            </div>
            <div class="card-group">
                <div class="card border-0 ">
                    <div class="card-body">
                        <Approve contract={contract} />
                    </div>
                </div>
                <div class="card border-0">
                    <div class="card-body">
                        <MintTokens contract={contract} />
                    </div>
                </div>
                <div class="card border-0">
                    <div class="card-body">
                        <ApproveForAll contract={contract} />
                    </div>
                </div>
            </div>
            <div class="card-group">
                <div class="card border-0 ">
                    <div class="card-body">
                        <ViewApprove contract={contract} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contract;
