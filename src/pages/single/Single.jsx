import React from 'react';
import SinglePost from '../../components/singlepost/SinglePost';
import Sidebar from '../../components/sidebar/Sidebar';
import './Single.css'

const Single = () => {
    return (
        <div className='single'>
            <SinglePost />
            <Sidebar />
        </div>
    );
}

export default Single;
