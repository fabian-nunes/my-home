import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import logo from '../img/logo.png';

function HNavbar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={logo}
                            width="30px"
                            height="30px"
                            className="d-inline-block align-top"
                            alt="Smart Home"
                        />{' Smart Home '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#history">History</Nav.Link>
                        </Nav>
                        <Button variant="outline-danger">Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default HNavbar;