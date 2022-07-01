import React, { useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import User from "./User";

const getUsers = async () => {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    )

    return response.data;
}

const Users = () => {

    const [state, refetch] = useAsync(getUsers, [], true);
    const [userId, setUserId] = useState(null);

    if (state.loading) return <div>로딩중...</div>;
    if (state.error) return <div>{state.error.toString()}</div>;
    if (!state.data) return <button onClick={refetch}>불러오기</button>;

    return (
        <>
            <ul>
                {state.data.map(user => (
                    <li onClick={() => setUserId(user.id)}
                        key={user.id}
                        style={{ cursor: 'pointer' }}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>재요청</button>
            {userId && <User id={userId}></User>}
        </>
    );
}

export default Users;