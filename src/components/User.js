import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

const getUser = async (id) => {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    )

    return response.data;
}

const User = ({ id }) => {

    const [state] = useAsync(() => getUser(id), [id]);

    if (state.loading) return <div>로딩중...</div>;
    if (state.error) return <div>{state.error.toString()}</div>;
    if (!state.data) return null;

    return (
        <>
            <ul>
                <h1>{state.data.username}</h1>
                <h2>{state.data.email}</h2>
            </ul>
        </>
    );
}

export default User;