export const updateSensorData = (name, value, time, alert) => ({
    type: 'UPDATE_SENSOR_DATA',
    payload: {
        name,
        value,
        time,
        alert,
    },
});