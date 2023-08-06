import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LoginForm from './components/Auth/Login';
import DashHistory from './components/History/DashHistory';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess, loginFailure } from './actions';

function App({ isLoggedIn, loginSuccess, loginFailure }) {
    // Check local storage on initial component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // If token exists, consider the user as logged in
            loginSuccess(storedToken);
        } else {
            // If token doesn't exist, consider the user as logged out
            loginFailure();
        }
    }, [loginSuccess, loginFailure]);

    return (
        <div className="App" style={{ backgroundColor: '#f4f4f4' }}>
            <BrowserRouter>
                <Routes>
                    {/* If the user is logged in, redirect to the dashboard */}
                    {isLoggedIn && <Route path="/" element={<Navigate to="/dashboard" />} />}

                    {/* Route for the Login page */}
                    <Route path="/login" element={<LoginForm />} />

                    {/* Route for the Dashboard (accessible after login) */}
                    <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />

                    {/* Route for the History Table (accessible after login) */}
                    <Route path="/history/:type/:name" element={isLoggedIn ? <DashHistory /> : <Navigate to="/login" />} />

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
