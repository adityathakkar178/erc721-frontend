import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';
import style from './Button.module.css';
import axios from 'axios';
import Web3 from 'web3';

const MintTokens = ({ contract }) => {
    const [name, setName] = useState('');
    const [uri, setUri] = useState('');
    const [image, setImage] = useState(null);
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

    const handleUri = (e) => {
        setUri(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validateInputs = () => {
        if (!name.trim()) {
            setError('Name cannot be empty');
            return false;
        }
        if (!uri.trim()) {
            setError('URI cannot be empty');
            return false;
        }
        if (!image) {
            setError('Please select an image');
            return false;
        }
        return true;
    };

    const clearError = () => {
        setError('');
    };

    const mintTokens = () => {
        if (validateInputs()) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('uri', uri);
            formData.append('image', image);
            formData.append('address', address[currentAccountIndex]);
            axios
                .post('http://localhost:3004/mint', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(() => {
                    return contract.mint(name, uri);
                })
                .catch((error) => {
                    setError('Error minting tokens');
                });
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
            <Form.Group className="mb-3" controlId="formBasicURI">
                <Form.Label>Enter URI</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter URI"
                    value={uri}
                    onChange={handleUri}
                    onFocus={clearError}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    onFocus={clearError}
                />
                {error && (
                    <Form.Text className="text-danger">{error}</Form.Text>
                )}
            </Form.Group>
            <Button className={style.button} onClick={mintTokens}>
                Mint Tokens
            </Button>
        </Form>
    );
};

export default MintTokens;
