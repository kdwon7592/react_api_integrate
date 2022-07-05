import axios from "axios";
import { createContext, useReducer } from "react";
import { createAsyncDispatcher, createAsyncHandler, initialAsyncState } from "./asyncActionUtils";
import * as api from './api';

const initialState = {
    users: initialAsyncState,
    user: initialAsyncState
};

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const userHandler = createAsyncHandler('GET_USER', 'user');

const usersReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
        case 'GET_USERS_SUCCESS':
        case 'GET_USERS_ERROR':
            return usersHandler(state, action);
        case 'GET_USER':
        case 'GET_USER_SUCCESS':
        case 'GET_USER_ERROR':
            return userHandler(state, action);
        default:
            throw new Error(`Unhandled action type`);
    }
}

export const UsersStateContext = createContext();
export const UsersDispatchContext = createContext();

export const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(usersReducer, initialState);

    return (
        <>
            <UsersStateContext.Provider value={state}>
                <UsersDispatchContext.Provider value={dispatch}>
                    {children}
                </UsersDispatchContext.Provider>
            </UsersStateContext.Provider>
        </>
    );
};

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);
