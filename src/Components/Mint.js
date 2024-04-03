import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';
import style from './Button.module.css';
import axios from 'axios';
import Web3 from 'web3';

const MintTokens = ({ contract }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
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

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0]);
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
        if (!imageFile) {
            setError('Please upload an image');
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
                const formData = new FormData();
                formData.append('file', imageFile);

                const pinataResponse = await axios.post(
                    'https://api.pinata.cloud/pinning/pinFileToIPFS',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            pinata_api_key: 'a8bd0c03d1195c3d2d7b',
                            pinata_secret_api_key:
                                '3de90fbbc2eedb0609c0ce2528098b7f86396c8b44670e5a5612049ba4ffd8dc',
                        },
                    }
                );

                const imageLink = `https://gateway.pinata.cloud/ipfs/${pinataResponse.data.IpfsHash}`;

                const metadata = {
                    name: name,
                    description,
                    image: imageLink,
                    address: address[currentAccountIndex],
                };

                const metadataPinataResponse = await axios.post(
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

                const cid = metadataPinataResponse.data.IpfsHash;

                await contract.mint(name, `ipfs://${cid}`);

                setName('');
                setDescription('');
                setImageFile(null);
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
            <Form.Group className="mb-3" controlId="formBasicImageUpload">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleImageUpload}
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
