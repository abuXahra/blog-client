import React, { useContext, useState } from 'react';
import { AiFillPicture } from 'react-icons/ai'
import './Write.css'
import axios from 'axios';
import { Context } from '../../context/Context';

const Write = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const user = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPost = {
            username: user.username,
            title,
            desc,
        }

        console.log(user.username)
        if (file) {
            const data = new FormData();
            const filename = /*Date.now() +*/ file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post('/api/upload/', data);
            } catch (error) { }
        }

        try {
            const res = await axios.post('/api/posts', newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (error) {

        }

    };
    return (
        <div className='write'>

            {
                file &&
                (<img
                    className='writeImg'
                    src={URL.createObjectURL(file)}
                    alt="" srcset="" />)
            }

            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='writeFormGroup'>
                    <label htmlFor="fileInput"><span className="writeIcon"><AiFillPicture /></span> </label>
                    <input
                        type="file"
                        id="fileInput"
                        className='writeInput'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder='Tile'
                        className='writeInput'
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='writeFormGroup'>
                    <textarea
                        placeholder='Tell your story...'
                        type="text="
                        cols="30" rows="10"
                        className='writeInput writeText'
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className='writeSubmit'>Publish</button>
            </form>
        </div>
    );
}

export default Write;
