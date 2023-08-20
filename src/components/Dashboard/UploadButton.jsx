import { useState } from 'react';
import {Container, Button, Modal, Form} from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';


const UploadButton = ({token}) => {
    const [show, setShow] = useState(false);
    const MySwal = withReactContent(Swal);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Get the form data

        // Use fetch to post the form data to the server
        fetch('http://192.168.1.200:5000/api/scale/data', {
            method: 'POST',
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
                        text: 'Your data has been uploaded.',
                        icon: 'success'
                    });
                } else if (response.status === 409) {
                    // Show specific alert for status code 409 (Data already exists)
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Data already exists for that day. Image upload failed.',
                        icon: 'info'
                    })
                } else {
                    // Show generic failure alert for any other status code
                    MySwal.fire({
                        title: 'Error!',
                        text: 'An error occurred while uploading the image.',
                        icon: 'error'
                    });
                }
                return response.text();
            })
            .then((data) => {
                console.log('Success:', data);
                handleClose(); // Close the modal after processing the response
            })
            .catch((error) => {
                console.error('Error:', error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'An error occurred while uploading the image.',
                    icon: 'error'
                });
                handleClose(); // Close the modal in case of an error
            });
    };

    return (
        <>
            <Container className="mt-5 mb-5">
                <Button variant="primary" size="lg" onClick={handleShow} block>
                    Upload Scale Data
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Modal.Header closeButton>
                            <Modal.Title>Upload Scale Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Cecotec Shared Data</Form.Label>
                                <Form.Control type="file" id="img" name="img" accept="image/*" />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(UploadButton);