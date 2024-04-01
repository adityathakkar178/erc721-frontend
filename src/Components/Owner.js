import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import classes from './Form.module.css';
import style from './Button.module.css';

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
                setError('Token Id does not exists. Please enter valid id.');
            });
    };

    return (
        <Form className={classes.form}>
            <h3>Get Token Owner</h3>
            <Form.Group className="mb-3" controlId="formBasicOwner">
                <Form.Label>Enter Id</Form.Label>
                <Form.Control
                    type="number"
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
            <Button className={style.button} onClick={getOwner}>
                Get Owner
            </Button>
            {address !== null && address !== '' && (
                <h6 className="mt-2">
                    Owner of Token {id}: {address}
                </h6>
            )}
        </Form>
    );
};

export default Owner;
