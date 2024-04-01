import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';
import style from './Button.module.css';

const ViewApprove = ({ contract }) => {
    const [ownerAddress, setOwnerAddress] = useState('');
    const [operatorAddress, setOperatorAddress] = useState('');
    const [approved, setApproved] = useState(false);
    const [error, setError] = useState('');

    const handleOwner = (e) => {
        setOwnerAddress(e.target.value);
    };

    const handleOperator = (e) => {
        setOperatorAddress(e.target.value);
    };

    const validateInputs = () => {
        if (!ownerAddress.trim()) {
            setError('Owner address can not be empty');
            return false;
        }
        if (!operatorAddress.trim()) {
            setError('Operator Address can not be empty');
            return false;
        }
        return true;
    };

    const clearError = () => {
        setError('');
    };

    const checkApproval = (e) => {
        if (validateInputs()) {
            contract
                .isApprovedForAll(ownerAddress, operatorAddress)
                .then((result) => {
                    setApproved(result);
                })
                .catch((err) => {
                    setError('Error getting approval');
                });
        }
    };

    return (
        <Form className={classes.form}>
            <h3>Check All Approval</h3>
            <Form.Group className="mb-3" controlId="formBasicOnwerAddress">
                <Form.Label>Enter Owner Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Owner Address"
                    value={ownerAddress}
                    onChange={handleOwner}
                    onFocus={clearError}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicOperatorAddress">
                <Form.Label>Enter Operator Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Operator Address"
                    value={operatorAddress}
                    onChange={handleOperator}
                    onFocus={clearError}
                />
                {error && (
                    <Form.Text className="text-danger">{error}</Form.Text>
                )}
            </Form.Group>
            <Button className={style.button} onClick={checkApproval}>
                Check
            </Button>
            {approved !== null &&
                approved !== '' &&
                operatorAddress !== null &&
                operatorAddress !== '' &&
                ownerAddress !== null &&
                ownerAddress !== '' && (
                    <h6 className="mt-2">
                        Operator {operatorAddress} {approved ? 'is' : 'is not'}{' '}
                        approved for all tokens by owner {ownerAddress}
                    </h6>
                )}
        </Form>
    );
};

export default ViewApprove;
