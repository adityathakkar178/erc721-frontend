import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

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

    const ApproveAll = async () => {
        if (validateInputs()) {
            try {
                const transaction = await contract.setApprovalForAll(
                    address,
                    approve
                );
                setTransaction(transaction.hash);
            } catch (err) {
                setError('Error approving tokens');
            }
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
            <Button className={style.button} onClick={ApproveAll}>
                Approve
            </Button>
        </Form>
    );
};

export default ApproveForAll;
