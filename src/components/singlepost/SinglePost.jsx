import React, { useContext, useEffect, useState } from 'react';
import './SinglePost.css'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';
import { AiFillPicture } from 'react-icons/ai';


const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState([])
    const PF = "http://localhost:4000/images/"
    const user = useContext(Context)

    //variable declaration for postupdate
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updatMode, setupdateMode] = useState(false)
    const [file, setFile] = useState(null)


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/api/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path])


    // delete function handler
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}`, { data: { username: user.username } });
            window.location.replace('/')
        } catch (err) {
        }
    }

    // update function handler
    const handleUpdate = async () => {
        const updatePost = {
            username: user.username,
            title,
            desc,
        }

        if (file) {
            const data = new FormData();
            const filename = /*Date.now() +*/ file.name;
            data.append("name", filename);
            data.append("file", file);
            updatePost.photo = filename;
            try {
                await axios.post('/api/upload/', data);
            } catch (error) { }
        }

        try {
            await axios.put(`/api/posts/${post._id}`, updatePost);
            setupdateMode(false)
        } catch (error) {

        }

    }


    return (
        <div className='singlepost'>
            <div className="singlePostWrapper">

                {
                    updatMode ? (
                        <div className='updateImageWrapper'>
                            {
                                file &&
                                (<img
                                    className='updateImg'
                                    src={URL.createObjectURL(file)}
                                    alt="" srcset="" />)
                            }
                            <label htmlFor="fileInput"><span className="updateIcon"><AiFillPicture /></span> <span> Post Picture</span></label>
                            <input
                                type="file"
                                id="fileInput"
                                className='writeInput'
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                        </div>
                    ) : (
                        <div>
                            {post.photo && <img className='singlePostImg' src={PF + post.photo} />}
                        </div>
                    )

                }



                {
                    updatMode ? (
                        <input autoFocus type='text' value={title} className='singlePostTitleInput' onChange={(e) => setTitle(e.target.value)} />
                    ) : (
                        <h1 className='singlePostTitle'>
                            {title}

                            {post.username === user?.username && (
                                <div className="singlePostEdit">
                                    <span className="singlePostIcon"><BiEdit onClick={() => setupdateMode(true)} /></span>
                                    <span className="singlePostIcon">  <BiTrash onClick={handleDelete} /></span>
                                </div>
                            )}

                        </h1>

                    )
                }
                <div className="singlePostInfo">
                    <span className='singlePostAuthor' ><b>Author: <Link className='links' to={`/?user=${post.username}`}>{post.username} </Link></b> </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updatMode ? (
                    <textarea value={desc} name="" id="" cols="30" rows="10" className='singlePostTitleInput' onChange={(e) => setDesc(e.target.value)} />
                ) : (
                    <p className='singlePostDec'>{desc}</p>
                )}
                {
                    updatMode &&
                    <button onClick={handleUpdate} type='submit' className="singlePostButton">Update</button>
                }

            </div>
        </div >
    );
}

export default SinglePost;
