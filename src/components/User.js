import React, { useContext, useEffect } from "react";
import { getUser, UsersDispatchContext, UsersStateContext } from "./UsersContext";

const User = ({ id }) => {
    const state = useContext(UsersStateContext);
    const dispatch = useContext(UsersDispatchContext);
    useEffect(() => {
        getUser(dispatch, id);
    }, [dispatch, id])

    const { loading, error, data: user } = state.user;

    // const [state] = customUseAsync(() => getUser(id), [id]);


    if (loading) return <div>로딩중...</div>;
    if (error) return <div>{state.error.toString()}</div>;
    if (!user) return null;

    return (
        <>
            <ul>
                <h1>{user.username}</h1>
                <h2>{user.email}</h2>
            </ul>
        </>
    );
}

export default User;