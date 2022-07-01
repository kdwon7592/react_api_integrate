import { useEffect, useReducer } from "react";

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type : ${action.type}`);
    }
}

const promiseTimeout = new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log("timeout")), 1500)
});

const useAsync = (callback, deps = [], skip = false) => {
    const [state, dispatch] = useReducer(userReducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchData = async () => {
        try {
            // loading 상태를 true로 변경.
            dispatch({ type: 'LOADING' });
            await promiseTimeout;
            const data = await callback();

            dispatch({ type: 'SUCCESS', data: data });

        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    }

    useEffect(() => {
        if (skip) return;
        fetchData();
        // eslint-disable-next-line
    }, deps)

    return [state, fetchData];
}

export default useAsync;