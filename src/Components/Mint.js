import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const MintTokens = ({ contract }) => {
    const [name, setName] = useState('');
    const [uri, setUri] = useState('');
    const [transaction, setTransaction] = useState('');
    const [error, setError] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleUri = (e) => {
        setUri(e.target.value);
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
        return true;
    };

    const clearError = () => {
        setError('');
    };

    const mintTokens = () => {
        if (validateInputs()) {
            contract
                .mint(name, uri)
                .then((transaction) => {
                    setTransaction(transaction.hash);
                })
                .catch((err) => {
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
                {error && (
                    <Form.Text className="text-danger">{error}</Form.Text>
                )}
            </Form.Group>

            <Button onClick={mintTokens}>Mint Tokens</Button>
        </Form>
    );
};

export default MintTokens;
