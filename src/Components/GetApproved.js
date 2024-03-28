import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const GetApprove = ({ contract }) => {
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const allowance = () => {
        contract
            .getApproved(id)
            .then((spender) => {
                setAddress(spender);
            })
            .catch((err) => {
                console.error('Error getting spender', err);
            });
    };

    return (
        <Form className={classes.form}>
            <h3>Get Sepnder </h3>
            <Form.Group className="mb-3" controlId="formBasicId">
                <Form.Label>Enter Id</Form.Label>
                <Form.Control
                    type="Number"
                    placeholder="Enter Id"
                    value={id}
                    onChange={handleId}
                />
            </Form.Group>
            <Button onClick={allowance}>Get Owner</Button>

            <h6>
                Spender of Token {id}: {address}
            </h6>
        </Form>
    );
};

export default GetApprove;
