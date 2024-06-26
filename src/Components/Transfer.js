import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

const TransferTokens = ({ contract }) => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [id, setId] = useState('');
    const [transaction, setTransaction] = useState('');
    const [error, setError] = useState('');

    const handleFrom = (e) => {
        setFromAddress(e.target.value);
    };

    const handleTo = (e) => {
        setToAddress(e.target.value);
    };

    const handleId = (e) => {
        const inputValue = e.target.value;
        const onlyNumbers = /^\d*$/;
        if (onlyNumbers.test(inputValue)) {
            setId(inputValue);
        } else {
            setError('Please enter only numbers');
        }
    };

    const validateInputs = () => {
        if (!fromAddress.trim()) {
            setError('From address can not be empty');
            return false;
        }
        if (!toAddress.trim()) {
            setError('To Address can not be empty');
            return false;
        }
        if (!id) {
            setError('Please enter an ID');
            return false;
        }
        return true;
    };

    const clearError = () => {
        setError('');
    };

    const Transfer = () => {
        if (validateInputs()) {
            contract
                .transferFrom(fromAddress, toAddress, id)
                .then((transaction) => {
                    setTransaction(transaction.hash);
                })
                .catch((err) => {
                    setError('Error Transfering Tokens');
                });
        }
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
                    onFocus={clearError}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTo">
                <Form.Label>Enter To Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter To Address"
                    value={toAddress}
                    onChange={handleTo}
                    onFocus={clearError}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicURI">
                <Form.Label>Enter Id</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Id"
                    value={id}
                    onChange={handleId}
                    onFocus={clearError}
                    onKeyUp={(e) => {
                        const key = e.key;
                        const onlyNumbers = /^[0-9\b]+$/;
                        if (!onlyNumbers.test(key)) {
                            e.preventDefault();
                        }
                    }}
                />
                {error && (
                    <Form.Text className="text-danger">{error}</Form.Text>
                )}
            </Form.Group>
            <Button className={style.button} onClick={Transfer}>
                Mint Tokens
            </Button>
        </Form>
    );
};

export default TransferTokens;
