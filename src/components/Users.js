import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            // 요청 시작 시 error, users 초기화.
            setError(null);
            setUsers(null);

            // loading 상태를 true로 변경.
            setLoading(true);
            const newTimeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => resolve(console.log("타임아웃")), 1500);
            });
            // async 함수안에 setTimeout을 구현해도 promise를 리턴하지 않기에 제대로 동작하지 않는다.
            const newTimeoutAsync = async () => {
                setTimeout(() => console.log("타임아웃"), 3000);
            };
            await newTimeoutPromise;
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            )
            setUsers(response.data);

        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>{error.toString()}</div>;
    if (!users) return null;

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>재요청</button>
        </>
    );
}

export default Users;