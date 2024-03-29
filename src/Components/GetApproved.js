import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';
import style from './Button.module.css';

const GetApprove = ({ contract }) => {
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

    const allowance = () => {
        if (!id) {
            setError('Please enter an ID');
            return;
        }

        contract
            .getApproved(id)
            .then((spender) => {
                setAddress(spender);
            })
            .catch((err) => {
                console.error('Error getting spender', err);
                setError('Error fetching spender. Please try again.');
            });
    };

    return (
        <Form className={classes.form}>
            <h3>Get Spender</h3>
            <Form.Group className="mb-3" controlId="formBasicId">
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
            <Button className={style.button} onClick={allowance}>
                Get Spender
            </Button>
            {address !== null && address !== '' && (
                <h6>
                    Spender of Token {id}: {address}
                </h6>
            )}
        </Form>
    );
};

export default GetApprove;
