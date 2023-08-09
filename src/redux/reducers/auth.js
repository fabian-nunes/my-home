const initialState = {
    token: null,
    isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                token: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default authReducer;