import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const URI = ({ contract }) => {
    const [id, setId] = useState('');
    const [uri, setUri] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const GetUri = () => {
        contract
            .tokenURI(id)
            .then((result) => {
                setUri(result);
            })
            .catch((err) => {
                console.error('Error getting uri');
            });
    };

    return (
        <Form className={classes.form}>
            <h3>Get Token URI </h3>
            <Form.Group className="mb-3" controlId="formBasicId">
                <Form.Label>Enter Id</Form.Label>
                <Form.Control
                    type="Number"
                    placeholder="Enter Id"
                    value={id}
                    onChange={handleId}
                />
            </Form.Group>
            <Button onClick={GetUri}>Get Owner</Button>
            {uri !== null && uri !== '' && (
                <h6>
                    URI of Token {id}: {uri}
                </h6>
            )}
        </Form>
    );
};

export default URI;
