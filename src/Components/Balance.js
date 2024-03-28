import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const Balance = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    const handleChange = (e) => {
        setAddress(e.target.value);
    };

    const getBalance = () => {
        contract
            .balanceOf(address)
            .then((balance) => {
                setBalance(balance.toString());
            })
            .catch((err) => {
                console.log('Error fetching balance', err);
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
                </Form.Group>
                <Button onClick={getBalance}>Get balance</Button>
                {balance !== null && (
                    <h6>
                        Token Balance of {address}: {balance}
                    </h6>
                )}
            </Form>
    );
};

export default Balance;
