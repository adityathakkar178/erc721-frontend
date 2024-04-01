import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NFT = () => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3004/nft')
            .then((response) => {
                Promise.all(response.data.map(fetchTokenMetadata))
                    .then((tokenData) => {
                        setTokens(tokenData);
                    })
                    .catch((error) => {
                        console.error('Error fetching token metadata:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching tokens:', error);
            });
    }, []);

    const fetchTokenMetadata = async (token) => {
        try {
            const cid = token.uri.split('ipfs://')[1];
            const response = await axios.get(
                `https://gateway.pinata.cloud/ipfs/${cid}`
            );
            const metadata = response.data;
            return {
                ...token,
                metadata: metadata,
            };
        } catch (error) {
            console.error('Error fetching metadata for token:', token, error);
            return {
                ...token,
                metadata: null,
            };
        }
    };

    return (
        <>
            <h3 className="text-center mt-4 mb-4">Token List</h3>
            <Container fluid>
                <Row className="justify-content-center">
                    {tokens.map((token) => (
                        <Col key={token._id}>
                            <Card className="border-0">
                                <div className="text-center">
                                    <Card.Img
                                        variant="top"
                                        src={token.metadata.image}
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
                                        <h6>
                                            <strong>
                                                Name:
                                                {token.metadata.name}
                                            </strong>
                                        </h6>
                                    </Card.Title>
                                    <Card.Text className="text-center mb-2">
                                        Description:
                                        {token.metadata.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default NFT;
