import React, { useEffect, useState } from 'react';
import './Home.css'
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../posts/Posts';
import axios from "axios"
import { useLocation } from 'react-router-dom';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const { search } = useLocation([]);
    // console.log(location)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/api/posts" + search)
            setPosts(res.data)
        }
        fetchPosts();
    }, [])



    return (
        <>
            <Header />
            <div className='home'>
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>

    );
}

export default Home;
