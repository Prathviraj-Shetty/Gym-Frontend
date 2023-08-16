import React from 'react'
import Navbar2 from './Navbar2'
import { Link } from 'react-router-dom'
import logo from '../assets/images/gymlogo.png';

export default function GymHome() {
  return (<>
  <Navbar2/>
    <div className='gymhome'>
        <div className="gymcontainer header-heading w-100">
        <div className='gymlogo mx-auto'><img width={100}  height={100} src={logo} alt="" /></div>
            <h5 className='mb-3' >Stronger Together</h5>
            <h1 className='fw-bold' style={{color:"red",textShadow:"2px 2px 8px #FFFFFF"}}> FITNESS POINT</h1>
            <p className='details'>Build Your Body And Fitness With Professional Touch</p>
            <div className='mb-3'><Link to="/gymprofile"><button className='register-btn text-white fw-semibold p-1 btn border border-danger border-2' >Register This Branch</button></Link></div>
        </div>
        
    </div>
   
    </>
  )
}
