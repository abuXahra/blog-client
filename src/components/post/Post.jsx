import React from 'react';
import './Post.css'
import { Link } from 'react-router-dom';

const Post = ({ post }) => {

    const PF = "http://localhost:4000/images/"
    return (
        <div className='post'>
            {post.photo && <img className='postImg' src={PF + post.photo} alt='profile image' />}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}

                </div>
                <Link to={`/post/${post._id}`} className='links'> <span className='postTitle'>{post.title}</span></Link>

                <hr />
                <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <div className="postDesc">{post.desc}</div>

        </div>
    );
}

export default Post;
