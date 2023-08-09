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