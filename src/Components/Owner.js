import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const Owner = ({ contract }) => {
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const Owner = () => {
        contract
            .ownerOf(id)
            .then((owner) => {
                setAddress(owner);
            })
            .catch((err) => {
                console.error('Error getting owner', err);
            });
    };

    return (
        <Form className={classes.form}>
            <h3>Get Token Owner</h3>
            <Form.Group className="mb-3" controlId="formBasicOwner">
                <Form.Label>Enter Id</Form.Label>
                <Form.Control
                    type="Number"
                    placeholder="Enter Id"
                    value={id}
                    onChange={handleId}
                />
            </Form.Group>
            <Button onClick={Owner}>Get Owner</Button>
            {address !== null && address !== '' && (
                <h6>
                    Owner of Token {id}: {address}
                </h6>
            )}
        </Form>
    );
};

export default Owner;
