import React, {useEffect} from "react";
import { Container, Card } from 'react-bootstrap';
import home from "../../img/home.png";
import {connect} from "react-redux";

const Banner = ({token}) => {

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
                    document.getElementById("user").innerHTML = "Welcome " + data.username;
                })
                .catch((error) => {
                    console.error('Error fetching sensor data:', error);
                });
    }, [token]);

    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Card.Body>
                        <img
                            src={home}
                            className="float-end"
                            width="300px"
                            alt="My Home"
                        />
                        <div className="float-start">
                            <Card.Title className="text-start fs-1 fw-bold">Office Dashboard</Card.Title>
                            <Card.Subtitle className="text-start mb-2 text-muted" id="user">Welcome Fabian</Card.Subtitle>
                            <Card.Text className="text-start">Travanca de Lagos, Portugal</Card.Text>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(Banner);