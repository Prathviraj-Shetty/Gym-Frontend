import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../assets/images/gymlogo.png';

export default function Success() {

    const [str, setStr] = useState()
    const [result, setResult] = useState([])

    useEffect(() => {
        dynamic()
    }, [str])

    let dynamic = async () => {
        let data = await fetch(`https://gymbackend-nmxx.onrender.com/getbookingdetail/${id}`);
        let res = await data.json()
        setResult(res);
        console.log(res);
    }
    const { id } = useParams()
    return (
        <div className='container successbox position-absolute border border-2  p-0  top-50 start-50 translate-middle'>
            <div className="topHalf bg-info  text-center">
                <img src={logo} width={200} height={200}></img>
            </div>
            <div className="bottomhalf text-center text-white py-2">
                <div className="fs-4 fw-bold mb-4 ">Registerd  Successfully
                 <svg viewBox="0 0 512 512" fill="#0089ff"  className='ms-1' width="20" title="check-circle">
                    <path
                        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                </svg>
                </div>
                <div>Booking Id : {result.id}</div>
                <div>Gym  : {result.gymname}</div>
                <div>Timing : {result.start}-{result.end}</div>
                <div>Amount Payable : ₹{result.amt}</div>
                <div><Link to="/" className='btn btn-warning mt-3 yellowbtn py-1'>Lets Go</Link></div>
            </div>
        </div>
    )
}
