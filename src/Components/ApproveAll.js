import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const ApproveForAll = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [approve, setApprove] = useState(false);
    const [transaction, setTransaction] = useState('');
    const [error, setError] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleApprove = (e) => {
        setApprove(e.target.checked);
    };

    const validateInputs = () => {
        if (!address.trim()) {
            setError('Address cannot be empty');
            return false;
        }
        return true;
    };

    const clearError = () => {
        setError('');
    };

    const ApproveAll = () => {
        if (validateInputs()) {
            contract
                .setApprovalForAll(address, approve)
                .then((transaction) => {
                    setTransaction(transaction.hash);
                })
                .catch((err) => {
                    setError('Error approving tokens');
                });
        }
    };

    return (
        <Form className={classes.form}>
            <h3>Approve All</h3>
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Enter Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={handleAddress}
                    onFocus={clearError}
                />
                {error && (
                    <Form.Text className="text-danger">{error}</Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="approveCheckbox">
                <Form.Label>Click checkbox to give approval</Form.Label>
                <Form.Check
                    type="checkbox"
                    label="Approve"
                    checked={approve}
                    onChange={handleApprove}
                />
            </Form.Group>
            <Button onClick={ApproveAll}>Approve</Button>
        </Form>
    );
};

export default ApproveForAll;
