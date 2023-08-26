import {Button, Container, Form} from "react-bootstrap";
import logo from "../../img/home.png";
import React, {useState} from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";

const Reset = () => {
    const { token } = useParams();
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Get the form data
        setLoading(true);
        // Use fetch to post the form data to the server
        fetch('http://192.168.1.200:5000/api/user/reset', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    // Show success alert for status code 200
                    MySwal.fire({
                        title: 'Success!',
                        text: 'Password reset successful. You can now login.',
                        icon: 'success'
                    });
                    navigate('/');
                } else {
                    // Show generic failure alert for any other status code
                    MySwal.fire({
                        title: 'Error!',
                        text: 'An error occurred while sending the request.',
                        icon: 'error'
                    });
                }
                return response.text();
            })
            .then((data) => {
                    console.log('Success:', data);
                }
            )
            .catch((error) => {
                    console.error('Error:', error);
                    MySwal.fire({
                        title: 'Error!',
                        text: 'An error occurred while sending the request.',
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
                    <img src={logo} alt="logo" className="img-fluid mb-4" />
                    <h2 className="text-center mb-4">Reset Password</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="token">
                            <Form.Control type="text" name="token" hidden required value={token}  />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" />
                        </Form.Group>
                        <Form.Group id="cpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="passwordConfirm" />
                        </Form.Group>
                        <Button
                            className="w-100 mt-4 mb-4"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default Reset;