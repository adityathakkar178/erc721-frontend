import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
    const location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="header">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto list" style={{ margin: '0 auto' }}>
                    <Nav.Link
                        as={Link}
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        Contract
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/nfts"
                        className={
                            location.pathname === '/nfts' ? 'active' : ''
                        }
                    >
                        NFT
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
