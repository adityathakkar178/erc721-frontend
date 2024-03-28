import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const TransferTokens = ({ contract }) => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [id, setId] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleFrom = (e) => {
        setFromAddress(e.target.value);
    };

    const handleTo = (e) => {
        setToAddress(e.target.value);
    };

    const handleId = (e) => {
        setId(e.target.value);
    };

    const Transfer = () => {
        contract
            .transferFrom(fromAddress, toAddress, id)
            .then((transaction) => {
                setTransaction(transaction.hash);
            })
            .catch((err) => {
                console.error('Error Transfering Tokens', err);
            });
    };

    return (
        <Form className={classes.form}>
            <h3>Transfer Tokens</h3>
            <Form.Group className="mb-3" controlId="formBasicFrom">
                <Form.Label>Enter From Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter From Address"
                    value={fromAddress}
                    onChange={handleFrom}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTo">
                <Form.Label>Enter To Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter To Address"
                    value={toAddress}
                    onChange={handleTo}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicURI">
                <Form.Label>Enter Id</Form.Label>
                <Form.Control
                    type="Number"
                    placeholder="Enter Id"
                    value={id}
                    onChange={handleId}
                />
            </Form.Group>
            <Button onClick={Transfer}>Mint Tokens</Button>
        </Form>
    );
};

export default TransferTokens;
