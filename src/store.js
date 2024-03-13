import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appApi from './services/appApi';
import storage from "redux-persist/lib/storage";
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const reducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: [appApi.reducerPath], // Corrected typo here: blackList -> blacklist
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // For ignoring redux-persist warnings
            thunk: true, // Redux Thunk is included by default
        }).concat(appApi.middleware),
});

export default store;
