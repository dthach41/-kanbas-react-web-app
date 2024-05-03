import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"

export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };

    const save = async () => {
        await client.updateUser(profile);
    };

    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };

    
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            
            {/* This screen only renders if profile is truth (not null, undefined, false, 0 ...) and we do that by using the && operator */}
            {profile && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom:'20px'}}>
                    <Link to="/Kanbas/Account/Admin/Users"
                        className="btn btn-warning w-50 mb-4 mt-3">
                        Users
                    </Link>
                    
                    <label>Username: </label>
                    <input className="profile-input" value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })} />

                    <label>Password: </label>
                    <input className="profile-input"  value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })} />
                    
                    <label>First Name: </label>
                    <input className="profile-input"  value={profile.firstName} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })} />

                    <label>Last Name: </label>
                    <input className="profile-input"  value={profile.lastName} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })} />

                    <label>Birthday: </label>
                    <input className="profile-input"  value={profile.dob} type="date" onChange={(e) =>
                        setProfile({ ...profile, dob: e.target.value })} />

                    <label>Email: </label>
                    <input className="profile-input"  value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })} />
                    
                    <label>User Type: </label>
                    <select onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>

                    <button onClick={save} className="btn btn-primary m-3">
                        Save
                    </button>

                    <button onClick={signout} className="btn btn-danger">
                        Signout
                    </button>
                    
                </div>
            )}

            
        </div>
    );
}
