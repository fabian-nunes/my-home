import { Container, Row, Col } from 'react-bootstrap';
import Sensor from "./Sensor";

const SensorBanner = () => {
    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col sm={6}>
                        <Sensor name="Temperature" />
                    </Col>
                    <Col sm={6}>
                        <Sensor name="Humidity" />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SensorBanner;