import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Navbar2 from './Navbar2';
import { useReactToPrint } from 'react-to-print';

export default function SlotBookings() {

    const [result, setResult] = useState(null);
    const [msg1, setMsg1] = useState(false);
    const nav = useNavigate()
    const { id } = useParams()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    useEffect(() => {
        dynamic()
    }, [id])

    let dynamic = async () => {

        let data = await fetch(`https://gymbackend-nmxx.onrender.com/slotbookings/${id}`);
        let res = await data.json()
        setResult(res);
    }

    return (
        <>
            <Navbar2 />
            <div className="text-center text-white w-100 fs-1 fw-bold" style={{ marginTop: "4rem" }}><span style={{ color: 'red' }}>Client</span> Details

            </div>
            <div ref={componentRef} className="container cardtable card card-body table-scroll box-shadow mt-2 overflow-y-scroll " style={{ maxHeight: "65vh" }}>
                <table className="table ">
                    <thead className='border-black border-bottom-2'>
                        <tr style={{ color: 'red' }}>
                            <th scope="col">Booking Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>

                    <tbody className="table-group-divider fw-semibold">
                        {result && result.map((e) => {
                            return (
                                <tr key={e.id} >
                                    <td>{e.id}</td>
                                    <td>{e.person.name}</td>
                                    <td>{e.person.gender}</td>
                                    <td>{e.person.phone}</td>
                                    <td>{e.person.address}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <button onClick={handlePrint} className='btn btn-warning yellowbtn fw-bold  mx-auto mt-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-printer-fill mx-2" viewBox="0 0 16 16">
                        <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                        <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                    </svg>
                  
                </button>
            </div>
        </>
    )
}
