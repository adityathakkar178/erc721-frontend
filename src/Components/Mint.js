import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';
import axios from 'axios';

const MintTokens = ({ contract }) => {
    const [name, setName] = useState('');
    const [uri, setUri] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

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
            <Button onClick={mintTokens}>Mint Tokens</Button>
        </Form>
    );
};

export default MintTokens;
