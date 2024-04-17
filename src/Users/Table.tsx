import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import {BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill, } from "react-icons/bs";


export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    useEffect(() => { fetchUsers(); }, []);

    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "USER"
    });
    
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const selectUser = async (user: User) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <h1>User Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>

                    <tr>
                        <td>
                            <input value={user.username} placeholder='username' onChange={(e) =>
                                setUser({ ...user, username: e.target.value })} />
                            <input value={user.password} placeholder='password' onChange={(e) =>
                                setUser({ ...user, password: e.target.value })} />
                        </td>
                        <td>
                            <input value={user.firstName} onChange={(e) =>
                                setUser({ ...user, firstName: e.target.value })} />
                        </td>
                        <td>
                            <input value={user.lastName} onChange={(e) =>
                                setUser({ ...user, lastName: e.target.value })} />
                        </td>
                        <td>
                            <select value={user.role} onChange={(e) =>
                                setUser({ ...user, role: e.target.value })}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </td>
                        <td className="text-nowrap">
                            <BsFillCheckCircleFill
                                onClick={updateUser}
                                className="me-2 text-success fs-1 text"
                            />
                            <BsPlusCircleFill className="me-2 text-success fs-1 text" onClick={createUser} />
                        </td>
                        
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td className="text-nowrap">
                                <button className="btn btn-danger" onClick={() => deleteUser(user)}>
                                    <BsTrash3Fill />
                                </button>
                                <button className="btn btn-warning ms-2">
                                    <BsPencil onClick={() => selectUser(user)} />
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}

