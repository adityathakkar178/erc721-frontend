import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const MintTokens = ({ contract }) => {
    const [name, setName] = useState('');
    const [uri, setUri] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleUri = (e) => {
        setUri(e.target.value);
    };

    const mintTokens = () => {
        contract.mint(name, uri).then((transaction) => {
            setTransaction(transaction.hash);
        }).catch((err) => {
            console.error("Error minitng tokens", err);
        });
    };

    return (
        <Form className={classes.form}>
                <h3>Mint Tokens</h3>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={handleName}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicURI">
                    <Form.Label>Enter URI</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter URI"
                        value={uri}
                        onChange={handleUri}
                    />
                </Form.Group>
                <Button onClick={mintTokens}>Mint Tokens</Button>
            </Form>
    );

}; 

export default MintTokens;