import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import LoginForm from "./components/Auth/Login";
import { connect } from 'react-redux';

function App({ isLoggedIn }) {
  return (
      <div className="App" style={{backgroundColor: "#f4f4f4"}}>
          <BrowserRouter>
              <Routes>
                  {/* Route for the Login page */}
                  {!isLoggedIn && <Route path="/login" element={<LoginForm />} />}

                  {/* Route for the Dashboard (accessible after login) */}
                  {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}

                  {/* If the user is not logged in and tries to access any other page, redirect to the login page */}
                  {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}

                  {/* If the user is logged in and tries to access the login page, redirect to the dashboard */}
                  {isLoggedIn && <Route path="*" element={<Navigate to="/dashboard" />} />}
              </Routes>
          </BrowserRouter>
      </div>
  );
}

// mapStateToProps to access the 'isLoggedIn' state from Redux
const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(App);
