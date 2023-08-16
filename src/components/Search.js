import React, { useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
export default function Search() {
    const [result, setResult] = useState([]);
    const [info, setInfo] = useState([]);
    const [str, setStr] = useState("");
    const [popup, setPopup] = useState(false);
    const [msg, setMsg] = useState(false);
    const nav = useNavigate()
    const [status, setStatus] = useState("True")
    const { user } = useContext(AuthContext)
    useEffect(() => {
        statusCheck();
    }, [result])

    const statusCheck = async () => {
        let data = await fetch(`https://gymbackend-nmxx.onrender.com/isregistered/${user ? user.user_id : "None"}/`);
        let res = await data.json()
        setStatus(res.regstatus)
        console.log(status)

    }
    useEffect(() => {
        dynamic()
    }, [str])

    let dynamic = async () => {
        if (str != "") {
            let data = await fetch(`https://gymbackend-nmxx.onrender.com/searchgymdynamic/${str}`);
            let res = await data.json()
            setResult(res);
            console.log(res[0]);

        }
        else {
            console.log("TRUE")
            let data = await fetch(`https://gymbackend-nmxx.onrender.com/searchgym`);
            let res = await data.json()
            setResult(res);
            console.log(res[0]);

        }
    }
    const handleChange = async (e) => {
        console.log(str)
        setStr(e.target.value)
    }

    const handleView = async (e) => {
        setPopup(true)
        let id = e.target.value
        let data = await fetch(`https://gymbackend-nmxx.onrender.com/getgymdetails/${id}`);
        let res = await data.json()
        setInfo(res[0]);
    }

    const handleSubmit = async () => {
        dynamic()
    }
    const handleRegister = async (e) => {
        if(status=="Yes")
            nav(`/schedule/${e.target.value}`)
        else
            setMsg(true)
            

    }
    return (

        <div className='mt-5'>
            {msg ? <div className='position-absolute w-100' style={{zIndex:"3"}}> <div className="box-shadow d-flex   w-50 justify-content-between border border-2 border-white rounded-5 py-3 ps-5 fw-semibold left-2 mx-auto text-center text-light bg-danger "><span>Please Complete Your Profile <Link to="/userprofile" className='text-black text-decoration-underline'>Click Here</Link></span>
                    <button className='btn text-light py-0 px-1 w-25' onClick={() => { setMsg(false) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                    </button></div></div> : <div></div>}
            {popup && <div className='card card-body bg-dark viewcard text-light  w-50 box-shadow position-absolute top-50 start-50 z-2 translate-middle'>
                <button className='btn py-0 px-1 position-absolute z-3 end-0 me-3 text-light' onClick={() => { setPopup(false) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
                </button>
                <div className="text-center mb-4 fs-2 border-bottom border-danger border-2">Gym Details</div>
                <table className="lh-2 fw-bold ">
                    <tbody>
                        <tr>
                            <td className='text-center w-50 py-2'>Gym Name</td>
                            <td>{info.name}</td>

                        </tr>
                        <tr>
                            <td className='text-center w-50 py-2'>Category</td>
                            <td>{info.type}</td>

                        </tr>
                        <tr>
                            <td className='text-center w-50 py-2'>Contact No</td>
                            <td>{info.phone}</td>
                        </tr>

                        <tr>
                            <td className='text-center w-50 py-2'>Opening Timing</td>
                            <td>{info.openingtime}</td>
                        </tr>
                        <tr>
                            <td className='text-center w-50 py-2'>Closing Timing</td>
                            <td>{info.closingtime}</td>
                        </tr>
                        <tr>
                            <td className='text-center w-50 py-2'>MemberShip Charge</td>
                            <td>{info.charge}</td>
                        </tr>
                        <tr>
                            <td className='text-center w-50 py-2'>Trainer details</td>
                            <td><Link to={`/trainerlist/${info.id}`} className='text-link'>Check Out Here</Link></td>

                        </tr>


                        <tr>
                            <td className='text-center w-50 py-2'>Address</td>
                            <td>{info.address}</td>
                        </tr>
                        <tr>
                            <td className='text-center w-50 py-2'>City</td>
                            <td>{info.city}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className='text-center w-50 py-2 '>
                                <button className='btn btn-danger w-100 text-light redbtn ' value={info.id} onClick={handleRegister} >Register</button></td>
                        </tr>
                    </tbody>
                </table>



            </div>}
            <div className="text-center text-white mt-5 w-100 fs-1 fw-bold"><span style={{ color: 'red' }}> Search </span>Our Nearby Branches
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-geo-alt-fill ms-2" style={{ color: 'red' }} viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg></div>
            <div className="input-group rounded w-50 mx-auto searchbar mt-3">
                <input type="search" onChange={handleChange} className="form-control rounded mx-3 border border-dark" placeholder="Search by specific Name, State or City" aria-label="Search" aria-describedby="search-addon" />
                <button className="input-group-text text-white bg-danger border border-dark" onClick={handleSubmit} id="search-addon" >
                    <BsSearch/>
                </button>
            </div>
            <div className="container cardtable card card-body table-scroll box-shadow mt-5 overflow-y-scroll " style={{ maxHeight: "50vh" }}>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Gym Name</th>
                            <th scope="col">Timings</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    {result.length ? <tbody className="table-group-divider fw-semibold">
                        {result.map((e) => {
                            return (
                                <tr key={e.id}>
                                    <th scope="row" >{e.name}</th>
                                    <td>{e.openingtime.substring(0, 5)}-{e.closingtime.substring(0, 5)}</td>
                                    <td>{e.city}</td>
                                    <td>{e.state}</td>
                                    <td><button className='btn blackbtn' value={e.id} onClick={handleView}>View</button></td>
                                </tr>
                            );
                        })}

                    </tbody> :
                        <tbody>
                            <th colspan="4" className='text-center fs-3 fw-medium pt-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor" className="bi bi-x-octagon-fill mx-2  text-danger " viewBox="0 0 16 16">
                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                </svg>
                                No Gym Found</th>
                        </tbody>}

                </table>
            </div>
        </div>
    )
}
