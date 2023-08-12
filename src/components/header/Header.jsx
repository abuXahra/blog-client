import React from 'react';
import './Header.css'
const Header = () => {
    return (
        <div className='header'>
            <div className='headerTitles'>
                <span className='headerTitleSm'>React & Node</span>
                <span className='headerTitleLg'><h1>Blog</h1></span>
            </div>
            <img className='headerImg' src="https://th.bing.com/th/id/OIP.gw23gi_lMMZpXIUD-ZmwiwHaEo?pid=ImgDet&rs=1" alt="" srcset="" />
        </div>
    );
}

export default Header;
