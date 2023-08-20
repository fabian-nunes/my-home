import {Container} from "react-bootstrap";
import logo from "../img/logo-white.png";
import {Link} from "react-router-dom";

const Homepage = () => {
    return (
        <div className="vh-100 bg">
            <Container className="d-flex align-items-center justify-content-center">
                <img src={logo} alt="logo" style={{width: "500px", height: "100%"}}/>
            </Container>
            <Container className="h-50 d-flex align-items-center justify-content-center" style={{marginTop: "150px"}}>
                <Link to="/login" className="btn-grad">Welcome</Link>
            </Container>
        </div>
    )
}

export default Homepage