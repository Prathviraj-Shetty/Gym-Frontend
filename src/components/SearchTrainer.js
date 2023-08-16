import React, { useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Navbar2 from './Navbar2';
import AuthContext from '../context/AuthContext';

export default function SearchTerainer() {
    const [result, setResult] = useState([]);
    const { user } = useContext(AuthContext)
    const [str, setStr] = useState("");
    const nav = useNavigate()
    useEffect(() => {
        dynamic()
    }, [str])

    let dynamic = async () => {
        console.log(str)
        if (str!= "") {
            let data = await fetch(`https://gymbackend-nmxx.onrender.com/gettrainersdynamic/${user.user_id}/${str}`);
            let res = await data.json()
            setResult(res);
            console.log(res[0]);
        }
        else
        {
            let data = await fetch(`https://gymbackend-nmxx.onrender.com/gettrainers/${user.user_id}`);
            let res = await data.json()
            setResult(res);
            console.log(result);
        }
    }
    const handleChange = async (e) => {
        console.log(str)
        setStr(e.target.value)
    }

    const handleSubmit = async () => {
        dynamic()

    }
    const handleSubmitAll = async () => {
        setStr("")
        dynamic()

    }
    return (
        <>
        <Navbar2/>
        <div className='mt-5'>
            <div className="text-center text-white  w-100 fs-1 fw-bold" style={{marginTop:"5rem"}}><span style={{ color: 'red' }}> Search</span> Your Gyms Trainers</div>
            <div className="input-group rounded w-50 mx-auto searchbar  mt-5">
                <input type="search" onChange={handleChange} className="form-control rounded mx-3 border border-dark" placeholder="Search by name" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text btn btn-danger border border-dark" onClick={handleSubmit} id="search-addon" >
                    <BsSearch />
                </span>
                <span className="input-group-text btn btn-danger border border-dark" onClick={handleSubmitAll} id="search-addon" >
                    Show All
                </span>
            </div>
            <div className="container cardtable card card-body table-scroll box-shadow mt-5 overflow-y-scroll">
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Trainer Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Experience</th>
                            <th scope="col">Field Of Expertise</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Charge(₹)</th>
                        </tr>
                    </thead>

                    {result.length ? <tbody className="table-group-divider">
                        {result.map((e) => {
                            return (
                                <tr key={e.id}>
                                    <th scope="row" >{e.name}</th>
                                    <td>{e.age}</td>
                                    <td>{e.gender}</td>
                                    <td>{e.experience}</td>
                                    <td>{e.field}</td>
                                    <td>{e.phone}</td>
                                    <td>{e.charge}</td>
                                </tr>
                            );
                        })}

                    </tbody> :
                        <tbody>
                            <th colspan="7" className='text-center fs-3 fw-medium pt-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor" className="bi bi-x-octagon-fill mx-2  text-danger " viewBox="0 0 16 16">
                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                </svg>
                                No Trainers Registered</th>
                        </tbody>}

                </table>
            </div>
        </div>
        </>
    )
}
