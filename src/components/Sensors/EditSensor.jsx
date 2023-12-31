import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Button, Modal} from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';

const EditForm = ({ token, sensor}) => {
    const [show, setShow] = useState(false);
    const [sensorData, setSensorData] = useState(null);
    const [sensorImage, setSensorImage] = useState(null);
    const MySwal = withReactContent(Swal);

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
    }, [show, sensor, token]);

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
            const form = document.getElementById('sensorForm'); // Add an ID to the form element
            if (form) {
                // Assuming your API response format matches the field names
                form.min.value = sensorData.min || '';
                form.max.value = sensorData.max || '';
                form.color.value = sensorData.color || '';
            }
        }
    }, [show, sensorData]);

    const onSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Get the form data

        // Use fetch to post the form data to the server
        fetch(`http://192.168.1.200:5000/api/sensor/create?name=${sensor.name}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    // Show success alert for status code 200
                    MySwal.fire({
                        title: 'Success!',
                        text: 'Sensor has been Updated.',
                        icon: 'success'
                    });
                } else if (response.status === 400) {
                    // Show specific alert for status code 400 (Bad request)
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Invalid form data.',
                        icon: 'info'
                    });
                } else if (response.status === 404) {
                    // Show specific alert for status code 409 (Data already exists)
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Sensor not found.',
                        icon: 'info'
                    })
                } else {
                    // Show generic failure alert for any other status code
                    MySwal.fire({
                        title: 'Error!',
                        text: 'An error occurred while creating the sensor.',
                        icon: 'error'
                    });
                }
                return response.text();
            })
            .then((data) => {
                console.log('Success:', data);
                handleClose();
            })
            .catch((error) => {
                console.error('Error:', error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'An error occurred while updating the sensor.',
                    icon: 'error'
                });
                handleClose();
            });
    }


    return (
        <>
            <Button variant="warning" onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Form id="sensorForm" onSubmit={onSubmit} encType="multipart/form-data">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Sensor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formMin">
                                <Form.Label>Min Value</Form.Label>
                                <Form.Control type="number" name="min" placeholder="0" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formMax">
                                <Form.Label>Max Value</Form.Label>
                                <Form.Control type="number" name="max" placeholder="100" required />
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
                        <Row className="mb-3">
                            <Form.Group controlId="formFile" as={Col}>
                                <Form.Label>Default file input example</Form.Label>
                                <Form.Control type="file" name="img" accept="image/*" required />
                            </Form.Group>

                            <Form.Group controlId="formColor" as={Col}>
                                <Form.Label>Color</Form.Label>
                                <Form.Control type="color" name="color" defaultValue="#E9B384"  title="Choose the color card" required />
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    sensor: state.sensors.sensors.find(sensor => sensor.name === ownProps.name),
    token: state.auth.token,
});

export default connect(mapStateToProps)(EditForm);