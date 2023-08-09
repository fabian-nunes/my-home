const initialState = {
    Temperature: {
        name: 'Temperature',
        value: 0,
        time: new Date().toLocaleTimeString(),
        alert: 'Normal',
    },
    Humidity: {
        name: 'Humidity',
        value: 0,
        time: new Date().toLocaleTimeString(),
        alert: 'Normal',
    },
    Scale: {
        name: 'Scale',
        value: 0,
        time: new Date().toLocaleTimeString(),
        alert: 'Normal',
    },
};

const sensorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SENSOR_DATA':
            const { name, value, time, alert } = action.payload;
            return {
                ...state,
                [name]: {
                    ...state[name],
                    value,
                    time,
                    alert,
                },
            };
        default:
            return state;
    }
};

export default sensorReducer;