import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from "./components/Homepage";
import Dashboard from './components/Dashboard/Dashboard';
import LoginForm from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashHistory from './components/History/DashHistory';
import DashSensors from "./components/Sensors/DashSensors";
import DashUser from "./components/User/DashUser";
import Confirm from "./components/Auth/Confirm";
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess, loginFailure } from './redux/actions';
import jwt_decode from 'jwt-decode';

function App({ isLoggedIn, loginSuccess, loginFailure }) {
    // Check local storage on initial component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            let decodedToken = jwt_decode(storedToken);
            console.log("Decoded Token", decodedToken);
            let currentDate = new Date();

            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                console.log("Token expired.");
                loginFailure();
            } else {
                console.log("Valid token");
                loginSuccess(storedToken);
            }
        } else {
            // If token doesn't exist, consider the user as logged out
            loginFailure();
        }
    }, [loginSuccess, loginFailure]);

    return (
        <div className="App" style={{ backgroundColor: '#f4f4f4', height: '100vh' }}>
            <BrowserRouter>
                <Routes>
                    {/* If the user is logged in, redirect to the dashboard */}
                    <Route path="/" element={!isLoggedIn ? <Homepage /> : <Navigate to="/dashboard" />} />

                    {/* Route for the Login page */}
                    <Route path="/login" element={!isLoggedIn ? <LoginForm /> : <Navigate to="/dashboard" />} />

                    <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" />} />

                    {/* Route for the Dashboard (accessible after login) */}
                    <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />

                    {/* Route for the History Table (accessible after login) */}
                    <Route path="/history/:type/:name" element={isLoggedIn ? <DashHistory /> : <Navigate to="/login" />} />

                    {/* Route for the Create Sensors (accessible after login) */}
                    <Route path="/sensors" element={isLoggedIn ? <DashSensors /> : <Navigate to="/login" />} />

                    {/* Route for the User info (accessible after login) */}
                    <Route path="/user" element={isLoggedIn ? <DashUser /> : <Navigate to="/login" />} />

                    {/* Route for the Confirmation page */}
                    <Route path="/confirm/:token" element={!isLoggedIn ? <Confirm /> : <Navigate to="/dashboard" />} />

                    {/* If the user is not logged in and tries to access any other page, redirect to the login page */}
                    <Route path="*" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// mapStateToProps to access the 'isLoggedIn' state from Redux
const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (token) => dispatch(loginSuccess(token)),
    loginFailure: () => dispatch(loginFailure()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
