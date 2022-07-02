import axios from "axios";
import { createContext, useReducer } from "react";

const initialState = {
    users: {
        loading: false,
        data: null,
        error: null,
    },
    user: {
        loading: false,
        data: null,
        error: null,
    }
};

const loadingState = {
    loading: true,
    data: null,
    error: null,
};

const success = data => ({
    loading: false,
    data: data,
    error: null,
});

const error = error => ({
    loading: false,
    data: null,
    error: error,
});

const usersReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: loadingState
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: success(action.data)
            };
        case 'GET_USERS_ERROR':
            return {
                ...state,
                users: error(action.error)
            };
        case 'GET_USER':
            return {
                ...state,
                user: loadingState
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: success(action.data)
            };
        case 'GET_USER_ERROR':
            return {
                ...state,
                user: error(action.error)
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    };
};

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

export const getUsers = async (dispatch, id) => {
    dispatch({ type: 'GET_USERS' });
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
        )
        dispatch({ type: 'GET_USERS_SUCCESS', data: response.data });
    } catch (e) {
        dispatch({ type: 'GET_USERS_ERROR', error: e });
    }
};

export const getUser = async (dispatch, id) => {
    dispatch({ type: 'GET_USER' });
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
        )
        dispatch({ type: 'GET_USER_SUCCESS', data: response.data });
    } catch (e) {
        dispatch({ type: 'GET_USER_ERROR', error: e });
    }
};