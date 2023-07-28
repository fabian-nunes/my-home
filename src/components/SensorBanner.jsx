import { Container, Row, Col } from 'react-bootstrap';
import Sensor from "./Sensor";

const SensorBanner = () => {
    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col sm={4}>
                        <Sensor name="Temperature" type="sensor" />
                    </Col>
                    <Col sm={4}>
                        <Sensor name="Humidity" type="sensor" />
                    </Col>
                    <Col sm={4}>
                        <Sensor name="Scale" type="scale" />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SensorBanner;