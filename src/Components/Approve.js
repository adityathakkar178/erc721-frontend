import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';
import style from './Button.module.css';

const Approve = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [id, setId] = useState('');
    const [transaction, setTransaction] = useState('');
    const [error, setError] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
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
        if (!address.trim()) {
            setError('Address cannot be empty');
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

    const ApproveSpender = () => {
        if (validateInputs()) {
            contract
                .approve(address, id)
                .then((transaction) => {
                    setTransaction(transaction.hash);
                })
                .catch((err) => {
                    setError('Error approving spender');
                });
        }
    };

    return (
        <Form className={classes.form}>
            <h3>Approve spender</h3>
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Enter Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={handleAddress}
                    onFocus={clearError}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicId">
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
            <Button className={style.button} onClick={ApproveSpender}>
                Approve
            </Button>
        </Form>
    );
};

export default Approve;
