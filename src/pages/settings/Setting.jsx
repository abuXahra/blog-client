import React, { useContext, useEffect, useState } from 'react';
import './Setting.css'
import Sidebar from '../../components/sidebar/Sidebar';
import { BiUserCircle } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';

const Setting = () => {
    const { user, dispatch } = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._Id,
            username,
            email,
            password,
        }

        console.log(user.username)
        if (file) {
            const data = new FormData();
            const filename = /*Date.now() +*/ file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post('/api/upload/', data);
            } catch (error) { }
        }

        try {
            const res = await axios.put('/api/users' + user._id, updatedUser);
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" })
        }

    };


    return (
        <div className='setting'>
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingUpdateTitle">Update Your Account</span>
                    <span className="settingDeleteTtitle">Delete Account</span>
                </div>
                <form className='settingForm' onClick={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingPP">
                        <img className='settingImg' src={file ? (URL.createObjectURL(file)) : (user.profilePic)} alt="" srcset="" />
                        <label htmlFor="fileInput"><span className='settingPPIcon'><BiUserCircle /></span>ssdds </label>
                        <input type="file" id="fileInput" />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                    <label>password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className='settingSubmit'>Update</button>
                    {success && <span className='sucess'>Profile has been updated</span>}
                </form>
            </div>
            <Sidebar />

        </div>
    );
}

export default Setting;
