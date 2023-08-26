import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Button, Modal, Container} from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

const UserForm = ({token}) => {
    const [userData, setUserData] = useState(null);
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the specific sensor's data using the API
        fetch(`http://192.168.1.200:5000/api/user/data`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error fetching sensor data:', error);
            });
    }, [token]);

    useEffect(() => {
        if (userData) {
            //alert(JSON.stringify(sensorData));
            // Populate form fields with fetched sensor data
            const form = document.getElementById('userForm'); // Add an ID to the form element
            if (form) {
                // Assuming your API response format matches the field names
                form.elements.username.value = userData.username;
            }
        }
    }, [userData]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Get the form data
        setLoading(true);
        // Use fetch to post the form data to the server
        fetch('http://192.168.1.200:5000/api/user/changeInformation', {
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
                        text: 'Data changed successfully.',
                        icon: 'success'
                    });
                } else {
                    // Show generic failure alert for any other status code
                    MySwal.fire({
                        title: 'Error!',
                        text: 'An error occurred while changing data.',
                        icon: 'error'
                    });
                }
                return response.text();
            })
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'An error occurred while changing data.',
                    icon: 'error'
                });
            }
            )
            .finally(() => {
                setLoading(false);
            });
        };


    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Change Account Data</h2>
                    <Form onSubmit={handleSubmit} id="userForm">
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" required />
                        </Form.Group>
                        <Form.Group id="cpassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password_confirm" required />
                        </Form.Group>
                        <Button
                            className="w-100 mt-4 mb-4"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(UserForm);