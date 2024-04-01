import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

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

    const clearError = () => {
        setError('');
    };

    const getBalance = async () => {
        if (!isValidAddress(address)) {
            setError('Invalid Address');
            return;
        }
        try {
            const balance = await contract.balanceOf(address);
            setBalance(balance.toString());
        } catch (err) {
            setError('Balance Does not exist for this address');
        }
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
                    onFocus={clearError}
                />
                {error && (
                    <Form.Text className="text-danger">{error}</Form.Text>
                )}
            </Form.Group>
            <Button className={style.button} onClick={getBalance}>
                Get balance
            </Button>
            {balance !== null && balance !== '' && (
                <h6 className="mt-2">
                    Token Balance of {address}: {balance}
                </h6>
            )}
        </Form>
    );
};

export default Balance;
