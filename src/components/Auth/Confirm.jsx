import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {Button, Container, Form} from "react-bootstrap";
import logo from "../../img/home.png";

const Confirm = () => {
    const { token } = useParams();
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Get the form data
        setLoading(true);
        // Use fetch to post the form data to the server
        fetch('http://192.168.1.200:5000/api/auth/confirm', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    // Show success alert for status code 200
                    MySwal.fire({
                        title: 'Success!',
                        text: 'Registration successful. You can now login.',
                        icon: 'success'
                    });
                    navigate('/login');
                } else {
                    // Show generic failure alert for any other status code
                    MySwal.fire({
                        title: 'Error!',
                        text: 'An error occurred while confirming your email.',
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
                    text: 'An error occurred while confirming your email.',
                    icon: 'error'
                });
            }
            )
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <img src={logo} alt="logo" className="img-fluid mb-4" />
                    <h2 className="text-center mb-4">Confirm your Account</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="token">
                            <Form.Control type="text" name="token" hidden required value={token}  />
                        </Form.Group>
                        <Button
                            className="w-100 mt-4 mb-4 btn-success"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Confirm'}
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default Confirm