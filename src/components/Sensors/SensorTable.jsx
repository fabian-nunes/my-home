import {Container, Card, Table, Button} from "react-bootstrap";
import React from 'react';
import { connect } from 'react-redux';
import SensorForm from "./SensorForm";
import EditSensor from "./EditSensor";
import ViewForm from "./ViewSensor";

const SensorTable = ({ sensors }) => {
    return (
        <>
            <Container className="mt-5 mb-5">
                <h1 className="text-center">Sensors</h1>
                <hr />
                <Card>
                    <Card.Header className="fw-bold pt-3 pb-3">
                        <h5 className="m-0 fw-bold float-start">Sensor's Table</h5>
                        <SensorForm />
                    </Card.Header>
                    <Card.Body>
                        <Table className="text-start">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.values(sensors).map((sensor) => (
                                <tr key={sensor.name}>
                                    <td>{sensor.name}</td>
                                    <td>
                                        <ViewForm name={sensor.name} />
                                    </td>
                                    <td>
                                        <EditSensor name={sensor.name} />
                                    </td>
                                    <td>
                                        <Button variant="danger" type="submit">
                                            Delete
                                        </Button>
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