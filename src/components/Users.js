import React, { useContext, useState } from "react";
import User from "./User";
import { getUsers, UsersDispatchContext, UsersStateContext } from "./UsersContext";

const Users = () => {

    // const [state, refetch] = customUseAsync(getUsers, [], true);
    const [userId, setUserId] = useState(null);
    const state = useContext(UsersStateContext);
    const dispatch = useContext(UsersDispatchContext);

    const refetch = () => {
        getUsers(dispatch);
    }

    const { loading, error, data: users } = state.users;

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>{state.error.toString()}</div>;
    if (!users) return <button onClick={refetch}>불러오기</button>;

    return (
        <>
            <ul>
                {users.map(user => (
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