import React from 'react'
import Feature from './Feature';
import Header from './Header';
import About from './About';
import Contact from './Contact';
import Offer from './Offer';
export default function UserHome() {
    return (

        <div>
            <Header />
            <Feature />
            <Offer />
            <About />
            <Contact />
        </div>
    )
}
