import { Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";

const Links = ({Sname}) => {
    return (
        <>
            <Container className="mt-5 mb-5">
                <h2>History</h2>
                <Row className="justify-content-md-center mt-5 mb-5">
                    <Col xs lg="2">
                        { Sname === "Temperature" ? (
                            <p>Temperature</p>
                        ) : (
                            <Link to="/history/sensor/Temperature">Temperature</Link>
                        )}
                    </Col>
                    <Col md="auto">
                        { Sname === "Humidity" ? (
                            <p>Humidity</p>
                        ) : (
                            <Link to="/history/sensor/Humidity">Humidity</Link>
                        )}
                    </Col>
                    <Col xs lg="2">
                        { Sname === "Scale" ? (
                            <p>Scale</p>
                        ) : (
                            <Link to="/history/scale/Scale">Scale</Link>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Links;