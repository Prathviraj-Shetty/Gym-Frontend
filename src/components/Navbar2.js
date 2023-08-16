import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo1.png';
import '../index.css'
import GymHome from './GymHome';
import AuthContext from '../context/AuthContext';

export default function Navbar2() {
    const [nav, setnav] = useState(false)
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
        <nav className={nav ? "navbar active bg-black" :"navbar bg-black"}>
            <Link to='/gymhome' className='logo' smooth={true} duration={1000}>
                <img src={logo} alt="" />
            </Link>
            <input classname="menu-btn2" type="checkbox" id="menu-btn2" hidden />
            <label htmlFor="menu-btn2" className='menu-icon2'>
                <span className='nav-icon2 ms-5'></span>
            </label>
            <ul className="menu2">
                <li><Link to='/gymhome'>Home</Link></li>
                <li><Link to='/gymprofile'>Profile</Link></li>
                <li><Link to='/trainer'>Add Trainer</Link></li>
                <li><Link to='/searchtrainer'>Trainers</Link></li>
                <li><Link to='/gymschedule'>Schedule</Link></li>
                <li><Link to='/login' onClick={logoutUser}>Log Out</Link></li>
            </ul>
        </nav>
        </div>
    )
}
