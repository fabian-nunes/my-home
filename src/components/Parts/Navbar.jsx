import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logo from '../../img/logo.png';
import Logout from "../Auth/Logout";

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
                        <Nav className="me-auto my-2 my-lg-0">
                            <Nav.Link href="/dashboard">Home</Nav.Link>
                            <Nav.Link href="/history/sensor/Temperature">History</Nav.Link>
                            <Nav.Link href="/sensors">Sensors</Nav.Link>
                        </Nav>
                        <Logout />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default HNavbar;