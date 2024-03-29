import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const NFT = () => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3004/nft')
            .then((response) => {
                setTokens(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tokens:', error);
            });
    }, []);

    return (
        <div>
            <h3 className="text-center mt-4 mb-4">Token List</h3>
            <div className="row">
                {tokens.map((token) => (
                    <div className="col-md-4 mb-4" key={token._id}>
                        <Card className="border-0">
                            <div className="text-center">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3004/uploads/${token.image}`}
                                    alt={token.name}
                                    style={{
                                        height: '200px',
                                        width: '200px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <Card.Body>
                                <Card.Title className="text-center mb-2">
                                    <strong>Name: {token.name}</strong>
                                </Card.Title>
                                <Card.Text className="text-center mb-2">URI: {token.uri}</Card.Text>
                                <Card.Text className="text-center mb-2">
                                     Address: {token.address}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFT;
