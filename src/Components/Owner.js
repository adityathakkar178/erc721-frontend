import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';

const Owner = ({ contract }) => {
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const handleId = (e) => {
        const inputValue = e.target.value;
        const onlyNumbers = /^\d*$/;
        if (onlyNumbers.test(inputValue)) {
            setId(inputValue);
        } else {
            setError('Please enter only numbers');
        }
    };

    const clearError = () => {
        setError('');
    };

    const getOwner = () => {
        if (!id) {
            setError('Please enter an ID');
            return;
        }
        contract
            .ownerOf(id)
            .then((owner) => {
                setAddress(owner);
            })
            .catch((err) => {
                setError('Error fetching owner. Please try again.');
            });
    };

    return (
        <Form className={classes.form}>
            <h3>Get Token Owner</h3>
            <Form.Group className="mb-3" controlId="formBasicOwner">
                <Form.Label>Enter Id</Form.Label>
                <Form.Control
                    type="text"
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
            <Button onClick={getOwner}>Get Owner</Button>
            {address !== null && address !== '' && (
                <h6>
                    Owner of Token {id}: {address}
                </h6>
            )}
        </Form>
    );
};

export default Owner;
