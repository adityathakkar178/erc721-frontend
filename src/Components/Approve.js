import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const Approve = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [id, setId] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    }; 

    const handleId = (e) => {
        setId(e.target.value);
    }; 

    const ApproveSpender = () => {
        contract.approve(address, id).then((transaction) => {
            setTransaction(transaction.hash);
        }).catch((err) => {
            console.error("Error approving spender", err);
        });
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
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicId">
                    <Form.Label>Enter Id</Form.Label>
                    <Form.Control
                        type="Numebr"
                        placeholder="Enter Id"
                        value={id}
                        onChange={handleId}
                    />
                </Form.Group>
                <Button onClick={ApproveSpender}>Approve</Button>
            </Form>
    );
};

export default Approve;