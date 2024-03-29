import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Form.module.css';
import style from './Button.module.css';

const URI = ({ contract }) => {
    const [id, setId] = useState('');
    const [uri, setUri] = useState('');
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

    const validateInputs = () => {
        if (!id) {
            setError('Please enter an ID');
            return false;
        }
        return true;
    };

    const clearError = () => {
        setError('');
    };

    const GetUri = () => {
        if (validateInputs()) {
            contract
                .tokenURI(id)
                .then((result) => {
                    setUri(result);
                })
                .catch((err) => {
                    setError('Error getting uri');
                });
        }
    };

    return (
        <Form className={classes.form}>
            <h3>Get Token URI </h3>
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
            <Button className={style.button} onClick={GetUri}>
                Get Owner
            </Button>
            {uri !== null && uri !== '' && (
                <h6>
                    URI of Token {id}: {uri}
                </h6>
            )}
        </Form>
    );
};

export default URI;
