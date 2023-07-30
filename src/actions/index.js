export const updateSensorData = (name, value, time) => ({
    type: 'UPDATE_SENSOR_DATA',
    payload: {
        name,
        value,
        time,
    },
});