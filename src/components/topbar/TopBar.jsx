import React, { useContext } from 'react';
import './TopBar.css'
import { FaFacebookSquare, FaInstagramSquare, FaPinterest } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';



const TopBar = () => {

    const { user, dispatch } = useContext(Context); //for login user

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    return (
        <div className='top'>
            <div className="topLeft">
                <span className='topIcon'><FaFacebookSquare /></span>
                <span className='topIcon'><FaInstagramSquare /></span>
                <span className='topIcon'><FaPinterest /></span>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem"><Link className='links' to={'/'}>Home</Link> </li>
                    <li className="topListItem"><Link className='links' to={'/'}>About</Link> </li>
                    <li className="topListItem"><Link className='links' to={'/'}>Contact</Link></li>
                    <li className="topListItem"><Link className='links' to={'/write'}>Write</Link> </li>
                    <li className="topListItem" onClick={handleLogout}>{user && 'Logout'}</li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to={'/settings'}><img className='topImg' src={user.profilePic} alt="" srcset="" /></Link>
                ) :
                    (
                        <ul className="topList">
                            <li className="topListItem"><Link className='links' to={'/register'}>Register</Link></li>
                            <li className="topListItem"><Link className='links' to={'/login'}>Login</Link> </li>
                        </ul>
                    )}
                <span className='topSearchIcon'><BiSearch /></span>

            </div>

        </div>
    );
}

export default TopBar;



