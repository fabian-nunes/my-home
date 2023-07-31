import React from 'react';
import { connect } from 'react-redux';
import {Container, Button, Form} from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import logo from "../../img/home.png";
import { loginSuccess, loginFailure } from '../../actions/index';

const LoginForm = ({ loginSuccess, loginFailure }) => {
    const MySwal = withReactContent(Swal);
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Get the form data

        // Use fetch to post the form data to the server
        fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    // Show success alert for status code 200
                    MySwal.fire({
                        title: 'Success!',
                        text: 'Login successful.',
                        icon: 'success'
                    });
                    return response.json();
                } else if (response.status === 401) {
                    // Show specific alert for status code 409 (Data already exists)
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Incorrect email or password.',
                        icon: 'info'
                    })
                } else {
                    // Show generic failure alert for any other status code
                    MySwal.fire({
                        title: 'Error!',
                        text: 'An error occurred while logging in.',
                        icon: 'error'
                    });
                }
                return null;
            })
            .then((data) => {
                if (data === null) {
                    loginFailure();
                    return;
                }
                let jwt = data['jwt_token'];
                loginSuccess(jwt);
            })
            .catch((error) => {
                console.error('Error:', error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'An error occurred while logging in.',
                    icon: 'error'
                });
                loginFailure();
            });
    };

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <img src={logo} alt="logo" className="img-fluid mb-4"/>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" required/>
                        </Form.Group>
                        <Button className="w-100 mt-4 mb-4" type="submit">Login</Button>
                    </Form>
                </div>
            </Container>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (token) => dispatch(loginSuccess(token)),
    loginFailure: () => dispatch(loginFailure()),
});

export default connect(null, mapDispatchToProps)(LoginForm);