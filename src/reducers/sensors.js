const initialState = {
    Temperature: {
        name: 'Temperature',
        value: 0,
        time: new Date().toLocaleTimeString(),
    },
    Humidity: {
        name: 'Humidity',
        value: 0,
        time: new Date().toLocaleTimeString(),
    },
    Scale: {
        name: 'Scale',
        value: 0,
        time: new Date().toLocaleTimeString(),
    },
};

const sensorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SENSOR_DATA':
            const { name, value, time } = action.payload;
            return {
                ...state,
                [name]: {
                    ...state[name],
                    value,
                    time,
                },
            };
        default:
            return state;
    }
};

export default sensorReducer;