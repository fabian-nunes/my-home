import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const Logout = ({ logout }) => {
    const MySwal = withReactContent(Swal);

    const handleLogout = () => {
        MySwal.fire({
            title: 'Success!',
            text: 'Logout successful.',
            icon: 'success',
        });
        localStorage.removeItem("token");
        logout();
    }

    return (
        <>
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default connect(null, { logout })(Logout);