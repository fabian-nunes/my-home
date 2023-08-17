import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Button, Modal} from "react-bootstrap";
import { connect } from 'react-redux';

const ViewForm = ({ sensor}) => {
    const [show, setShow] = useState(false);
    const [sensorData, setSensorData] = useState(null);
    const [sensorImage, setSensorImage] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show && sensor) {
            // Fetch the specific sensor's data using the API
            fetch(`http://192.168.1.200:5000/api/sensor/specs?all=false&name=${sensor.name}`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    setSensorData(data);
                })
                .catch((error) => {
                    console.error('Error fetching sensor data:', error);
                });
        }
    }, [show, sensor]);

    useEffect(() => {
        if (show && sensor) {
            // Fetch the specific sensor's image using the API
            fetch(`http://192.168.1.200:5000/api/sensor/image?name=${sensor.name}`, {
                method: 'GET',
            })
                .then((response) => response.blob()) // Use blob() to get image data as a Blob
                .then((imageBlob) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setSensorImage(reader.result); // Set the fetched image data
                    };
                    reader.readAsDataURL(imageBlob);
                })
                .catch((error) => {
                    console.error('Error fetching sensor image:', error);
                });
        }
    }, [show, sensor]);

    useEffect(() => {
        if (show && sensorData) {
            //alert(JSON.stringify(sensorData));
            // Populate form fields with fetched sensor data
            const form = document.getElementById('viewForm'); // Add an ID to the form element
            if (form) {
                // Assuming your API response format matches the field names
                form.min.value = sensorData.min || '';
                form.max.value = sensorData.max || '';
            }
        }
    }, [show, sensorData]);


    return (
        <>
            <Button variant="warning" onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Form id="viewrForm" encType="multipart/form-data">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Sensor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formMin">
                                <Form.Label>Min Value</Form.Label>
                                <Form.Control type="number" name="min" placeholder="0" readOnly />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formMax">
                                <Form.Label>Max Value</Form.Label>
                                <Form.Control type="number" name="max" placeholder="100" readOnly />
                            </Form.Group>
                        </Row>
                        <p>Current Image</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {sensorImage && (
                                <img
                                    src={sensorImage}
                                    alt="Sensor"
                                    style={{ maxWidth: '100%', maxHeight: '100px' }}
                                />
                            )}
                        </div>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" name="img" accept="image/*" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    sensor: state.sensors.sensors.find(sensor => sensor.name === ownProps.name),
});

export default connect(mapStateToProps)(ViewForm);