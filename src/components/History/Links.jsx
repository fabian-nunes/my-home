import { Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';

const Links = ({Sname, sensors}) => {
    const type = Sname === 'Scale' ? 'scale' : 'sensor';
    return (
        <>
            <Container className="mt-5 mb-5">
                <h2>History</h2>
                <Row className="justify-content-md-center mt-5 mb-5">
                    {Object.values(sensors).map((sensor) => (
                        <Col xs lg="2">
                            { sensor.name === Sname ? (
                                <p>{sensor.name}</p>
                            ) : (
                                <Link to={"/history/"+type+"/" + sensor.name}>{sensor.name}</Link>
                            )}
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    sensors: state.sensors.sensors,
});

export default connect(mapStateToProps)(Links);