import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const Balance = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setAddress(e.target.value);
    };

    const isValidAddress = (address) => {
        return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
    };

    const getBalance = () => {
        if (!isValidAddress(address)) {
            setError('Invalid Address');
            return;
        }
        contract
            .balanceOf(address)
            .then((balance) => {
                setBalance(balance.toString());
            })
            .catch((err) => {
                setError('Error Fetching Balance');
            });
    };
    return (
        <Form className={classes.form}>
            <h3>Check Balance</h3>
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Enter address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={handleChange}
                />
                {error && (
                    <Form.Text className="text-danger">{error}</Form.Text>
                )}
            </Form.Group>
            <Button onClick={getBalance}>Get balance</Button>
            {balance !== null && balance !== '' && (
                <h6>
                    Token Balance of {address}: {balance}
                </h6>
            )}
        </Form>
    );
};

export default Balance;
