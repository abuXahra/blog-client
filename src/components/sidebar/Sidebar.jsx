import React, { useEffect } from 'react';
import './Sidebar.css'
import { FaFacebookSquare, FaInstagramSquare, FaPinterest } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/api/category');
            setCategories(res.data);
        }
        getCategory();
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://th.bing.com/th/id/OIP.gw23gi_lMMZpXIUD-ZmwiwHaEo?pid=ImgDet&rs=1" alt="" />
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, in.
                </p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className='sidebarList'>
                    {
                        categories && categories.map((cat) => (
                            <Link to={`/?cat=${cat.name}`}><l className="sidebarListItem">{cat.name}</l></Link>

                        ))
                    }
                </ul>
            </div>


            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className='sidebarSocial'>
                    <span className='sidebarIcon'><FaFacebookSquare /></span>
                    <span className='sidebarIcon'><FaInstagramSquare /></span>
                    <span className='sidebarIcon'><FaPinterest /></span>
                </div>
            </div>





        </div>
    );
}

export default Sidebar;
