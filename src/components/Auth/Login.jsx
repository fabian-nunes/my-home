import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logo from '../../img/home.png';
import { loginSuccess, loginFailure } from '../../redux/actions/index';
import {Link} from "react-router-dom";

const LoginForm = ({ loginSuccess, loginFailure }) => {
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Get the form data

        setLoading(true);
        try {
            // Use fetch to post the form data to the server
            const response = await fetch('http://192.168.1.200:5000/api/auth/login', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 200) {
                // Show success alert for status code 200
                MySwal.fire({
                    title: 'Success!',
                    text: 'Login successful.',
                    icon: 'success',
                });
                const data = await response.json();
                let jwt = data['access_token'];
                localStorage.setItem('token', jwt);
                loginSuccess(jwt);

            } else if (response.status === 401) {
                // Show specific alert for status code 409 (Data already exists)
                MySwal.fire({
                    title: 'Error!',
                    text: 'Incorrect email or password.',
                    icon: 'info',
                });
                loginFailure();
            } else {
                // Show generic failure alert for any other status code
                MySwal.fire({
                    title: 'Error!',
                    text: 'An error occurred while logging in.',
                    icon: 'error',
                });
                loginFailure();
            }
        } catch (error) {
            console.error('Error:', error);
            MySwal.fire({
                title: 'Error!',
                text: 'An error occurred while logging in.',
                icon: 'error',
            });
            loginFailure();
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <img src={logo} alt="logo" className="img-fluid mb-4" />
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" required />
                        </Form.Group>
                        <Link to="/register" style={{fontSize: '13px'}}>Don't have an account? Register here.</Link>
                        <Button
                            className="w-100 mt-4 mb-4"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (token) => dispatch(loginSuccess(token)),
    loginFailure: () => dispatch(loginFailure()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
