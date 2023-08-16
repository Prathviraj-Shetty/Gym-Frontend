import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo1.png';
import '../index.css'
import AuthContext from '../context/AuthContext';


export default function Navbar() {
    const [nav, setnav] = useState(false)
    const navi=useNavigate();
    const {logoutUser}=useContext(AuthContext)
    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setnav(true);
        }
        else {
            setnav(false);
        }
    }
    window.addEventListener('scroll', changeBackground);
    return (
        <div className="gym">
        <nav className={nav ? "navbar active" :"navbar"}>
            <Link to='#main' className='logo' smooth={true} duration={1000}>
                <img src={logo} alt="" />
            </Link>
            <input classname="menu-btn" type="checkbox" id="menu-btn" hidden/>
            <label htmlFor="menu-btn" className='menu-icon'>
                <span className='nav-icon ms-5'></span>
            </label>
            <ul className="menu">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/gym'>Explore</Link></li>
                <li><Link to='/search'>Search</Link></li>
                <li><Link to='/userprofile'>Profile</Link></li>
                <li><a href='/#about' smooth={true} duration={1000}>About</a></li>
                <li><a href='/#contact' smooth={true} duration={1000}>Contact</a></li>
                <li><a href='/login' onClick={logoutUser}>Log Out</a></li>
            </ul>
        </nav>
        </div>
    )
}
