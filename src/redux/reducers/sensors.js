const initialState = {
    sensors: [
        {
            name: 'Scale',
            value: 0,
            time: new Date().toLocaleTimeString(),
            alert: 'Normal',
            color: '#E9B384',
        },
    ],
};

const sensorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_SENSORS':
            // Assuming action.payload is an array of sensor objects from the API
            const sensorsFromAPI = action.payload;

            // Create a map of default values from the "Scale" sensor
            const defaultScaleSensor = state.sensors.find(sensor => sensor.name === 'Scale');
            const defaultValues = defaultScaleSensor
                ? {
                    value: defaultScaleSensor.value,
                    time: defaultScaleSensor.time,
                    alert: defaultScaleSensor.alert,
                }
                : {};

            // Create new sensors from the API with the default values
            const updatedSensors = [
                ...state.sensors.filter(sensor => sensor.name === 'Scale'), // Preserve the "Scale" sensor
                ...sensorsFromAPI.map(sensor => ({
                    ...defaultValues,
                    ...sensor,
                })),
            ];

            return {
                ...state,
                sensors: updatedSensors,
            };
        case 'UPDATE_SENSOR_DATA':
            const { name, value, time, alert } = action.payload;
            return {
                ...state,
                sensors: state.sensors.map(sensor =>
                    sensor.name === name ? { ...sensor, value, time, alert } : sensor
                ),
            };
        case 'REMOVE_SENSOR':
            return {
                ...state,
                sensors: state.sensors.filter(sensor => sensor.name !== action.payload),
            };
        case 'ADD_SENSOR':
            return {
                ...state,
                sensors: [
                    ...state.sensors,
                    {
                        name: action.payload,
                        value: 0,
                        time: new Date().toLocaleTimeString(),
                        alert: 'Normal',
                    },
                ],
            };
        default:
            return state;
    }
};

export default sensorReducer;