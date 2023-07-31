import { Container, Col } from "react-bootstrap";
import logo from "../../img/logo.png";

const footer = () => {
    return (
        <>
            <Container>
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <Col md="4" className="d-flex align-items-center">
                        <a href="#" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <img src={logo} width="30px" height="24px" alt="logo" className="img-fluid mb-4"/>
                        </a>
                        <span className="text-muted">© 2021 Company, Inc</span>
                    </Col>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"/></a></li>
                        <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"/></a></li>
                        <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"/></a></li>
                    </ul>
                </footer>

            </Container>
        </>
    );
}

export default footer;