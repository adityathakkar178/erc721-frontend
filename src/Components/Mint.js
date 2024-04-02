import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';
import style from './Button.module.css';
import axios from 'axios';
import Web3 from 'web3';

const MintTokens = ({ contract }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [address, setAddress] = useState([]);
    const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            window.ethereum.enable().then(() => {
                web3.eth.getAccounts().then(async (accounts) => {
                    setAddress(accounts);
                    setCurrentAccountIndex(0);
                });
                window.ethereum.on('accountsChanged', (newAccounts) => {
                    setAddress(newAccounts);
                    setCurrentAccountIndex(0);
                });
            });
        } else {
            console.log('MetaMask is not installed');
        }
    }, []);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleImageLink = (e) => {
        setImageLink(e.target.value);
    };

    const validateInputs = () => {
        if (!name.trim()) {
            setError('Name cannot be empty');
            return false;
        }
        if (!description.trim()) {
            setError('Description cannot be empty');
            return false;
        }
        if (!imageLink.trim()) {
            setError('Image link cannot be empty');
            return false;
        }
        return true;
    };

    const clearError = () => {
        setError('');
    };

    const mintTokens = async () => {
        if (validateInputs()) {
            try {
                const metadata = {
                    name: name,
                    description,
                    image: imageLink,
                    address: address[currentAccountIndex],
                };

                const pinataResponse = await axios.post(
                    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                    metadata,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            pinata_api_key: 'a8bd0c03d1195c3d2d7b',
                            pinata_secret_api_key:
                                '3de90fbbc2eedb0609c0ce2528098b7f86396c8b44670e5a5612049ba4ffd8dc',
                        },
                    }
                );

                const cid = pinataResponse.data.IpfsHash;
                const response = await axios.get(
                    `https://gateway.pinata.cloud/ipfs/${cid}`
                );

                await contract.mint(name, `ipfs://${cid}`);

                setName('');
                setDescription('');
                setImageLink('');
                setError('');
            } catch (error) {
                console.error('Error minting tokens:', error);
                setError('Error minting tokens');
            }
        }
    };

    return (
        <Form className={classes.form}>
            <h3>Mint Tokens</h3>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Enter Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={handleName}
                    onFocus={clearError}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Enter Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={handleDescription}
                    onFocus={clearError}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImageLink">
                <Form.Label>Image Link</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Image Link"
                    value={imageLink}
                    onChange={handleImageLink}
                    onFocus={clearError}
                />
            </Form.Group>
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
            <Button className={style.button} onClick={mintTokens}>
                Mint Tokens
            </Button>
        </Form>
    );
};

export default MintTokens;
