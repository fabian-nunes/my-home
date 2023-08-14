import { Container, Row, Col } from 'react-bootstrap';
import Sensor from "./Sensor";
import { connect } from 'react-redux';

const SensorBanner = ({ sensors }) => {
    return (
        <>
            <Container className="mt-4">
                <Row>
                    {Object.values(sensors).map((sensor) => (
                        <Col sm={4}>
                            <Sensor name={sensor.name} type={sensor.name === 'Scale' ? 'scale' : 'sensor'} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

const mapStateToProps = (state) => ({
    sensors: state.sensors.sensors,
});

export default connect(mapStateToProps)(SensorBanner);