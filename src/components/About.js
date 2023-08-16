import React from 'react'
import aboutimage from '../assets/images/about.png'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div id='about'>
            <div className="about-image">
                <img src={aboutimage} alt="" />
            </div>
            <div className="about-text">
                <h1 >LEARN MORE ABOUT US</h1>
                <p>Welcome to our gym! We are a community of fitness enthusiasts who are dedicated to helping our members achieve their fitness goals. Our gym offers state-of-the-art equipment, a variety of fitness classes, and expert personal training services to help you get in shape and stay healthy.</p>
                <Link to="/about"><button>READ MORE</button></Link>
            </div>
        </div>
    )
}
