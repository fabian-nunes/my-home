import { useState } from 'react';
import {Container, Button, Modal, Form} from "react-bootstrap";

const UploadButton = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Container className="mt-4">
                <Button variant="primary" size="lg" onClick={handleShow} block>
                    Upload Scale Data
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Form action="locahost:5000/api/sensor">
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

export default UploadButton;