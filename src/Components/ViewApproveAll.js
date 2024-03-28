import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const ViewApprove = ({ contract }) => {
    const [ownerAddress, setOwnerAddress] = useState('');
    const [operatorAddress, setOperatorAddress] = useState('');
    const [approved, setApproved] = useState(false);

    const handleOwner = (e) => {
        setOwnerAddress(e.target.value);
    };

    const handleOperator = (e) => {
        setOperatorAddress(e.target.value);
    };

    const checkApproval = (e) => {
        contract
            .isApprovedForAll(ownerAddress, operatorAddress)
            .then((result) => {
                setApproved(result);
            })
            .catch((err) => {
                console.error('Error getting approval', err);
            });
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
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicOperatorAddress">
                <Form.Label>Enter Operator Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Operator Address"
                    value={operatorAddress}
                    onChange={handleOperator}
                />
            </Form.Group>
            <Button onClick={checkApproval}>Check</Button>
            <h6>
                Operator {operatorAddress} {approved ? 'is' : 'is not'} approved
                for all tokens by owner {ownerAddress}
            </h6>
        </Form>
    );
};

export default ViewApprove;
