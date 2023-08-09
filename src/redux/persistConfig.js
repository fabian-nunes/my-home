import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {encryptTransform} from 'redux-persist-transform-encrypt';

const encryptor = encryptTransform({
    secretKey: 'your-secret-key',
    onError: function (error) {
        // Handle error
    },
});

const persistConfig = {
    key: 'root',
    storage,
    transforms: [encryptor],
    whitelist: ['auth'], // Reducer(s) to persist
};

export const configurePersist = (rootReducer) => {
    return persistReducer(persistConfig, rootReducer);
};