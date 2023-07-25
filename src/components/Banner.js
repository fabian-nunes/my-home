import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import home from "../img/home.png";

function Banner() {
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
                            <Card.Subtitle className="text-start mb-2 text-muted">Welcome Fabian</Card.Subtitle>
                            <Card.Text className="text-start">Travanca de Lagos, Portugal</Card.Text>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Banner;