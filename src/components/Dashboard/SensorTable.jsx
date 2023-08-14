import { Container, Card, Table} from "react-bootstrap";
import React from 'react';
import { connect } from 'react-redux';

const SensorTable = ({ sensors }) => {
    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Card.Header className="fw-bold pt-3 pb-3">
                        <h5 className="m-0 fw-bold float-start">Sensor's Table</h5>
                    </Card.Header>
                    <Card.Body>
                        <Table className="text-start">
                            <thead>
                                <tr>
                                    <th scope="col">Type of IoT Device</th>
                                    <th scope="col">Value</th>
                                    <th scope="col">Update Date</th>
                                    <th scope="col">Alert State</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.values(sensors).map((sensor) => (
                                <tr key={sensor.name}>
                                    <td>{sensor.name}</td>
                                    <td>{sensor.value}</td>
                                    <td>{sensor.time}</td>
                                    <td>
                                        {sensor.alert === 'High' ? (
                                            <span className="badge rounded-pill text-bg-danger">{sensor.alert}</span>
                                        ) : sensor.alert === 'Overweight' ? (
                                            <span className="badge rounded-pill text-bg-danger">{sensor.alert}</span>
                                        ) : sensor.alert === 'Low' ? (
                                            <span className="badge rounded-pill text-bg-primary">{sensor.alert}</span>
                                        ) : sensor.alert === 'Underweight' ? (
                                            <span className="badge rounded-pill text-bg-primary">{sensor.alert}</span>
                                        ) : (
                                            <span className="badge rounded-pill text-bg-success">{sensor.alert}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

const mapStateToProps = (state) => ({
    sensors: state.sensors.sensors,
});

export default connect(mapStateToProps)(SensorTable);