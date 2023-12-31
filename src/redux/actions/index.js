export const updateSensorData = (name, value, time, alert) => ({
    type: 'UPDATE_SENSOR_DATA',
    payload: {
        name,
        value,
        time,
        alert,
    },
});

export const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
    // go to dashboard after login
});

export const loginFailure = () => ({
    type: 'LOGIN_FAILURE',
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const fetchSensors = () => async (dispatch) => {
    try {
        const response = await fetch('http://192.168.1.200:5000/api/sensor/specs?all=true');
        const sensors = await response.json();
        dispatch({
            type: 'INITIALIZE_SENSORS',
            payload: sensors,
        });
    } catch (error) {
        console.error(error);
    }
}

export const removeSensor = (name) => ({
    type: 'REMOVE_SENSOR',
    payload: name,
});

export const addSensor = (name, type, unit, min, max) => ({
    type: 'ADD_SENSOR',
    payload: name,
});