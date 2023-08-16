import React, { useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Navbar2 from './Navbar2';

export default function GymSchedule() {
    const { user } = useContext(AuthContext)
    let i = 1
    const [result, setResult] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [msg1, setMsg1] = useState(false);
    const [msg2, setMsg2] = useState(false);
    const [popup, setPopup] = useState(false);
    const nav = useNavigate()
    useEffect(() => {
        dynamic()
    }, [popup])

    let dynamic = async () => {

        let data = await fetch(`https://gymbackend-nmxx.onrender.com/getschedule/${user.user_id}`);
        let res = await data.json()
        setResult(res);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { 'uid': user.user_id, 'start': e.target.start.value, 'end': e.target.end.value, 'intake': e.target.intake.value, 'price': e.target.price.value, 'trainer1': e.target.trainer1.value, 'trainer2': e.target.trainer2.value }
        let response = await fetch(`https://gymbackend-nmxx.onrender.com/addschedule/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        console.log("res")
        // setPopup(false);
    }
    const handleAdd = async () => {

        let data1 = await fetch(`https://gymbackend-nmxx.onrender.com/isgymregistered/${user ? user.user_id : "None"}/`);
        let res1 = await data1.json()
        console.log(res1.regstatus)
        if (res1.regstatus == "Yes") {
            console.log(res1.regstatus)
            setMsg1(false)
            console.log(res1.regstatus)
            let data = await fetch(`https://gymbackend-nmxx.onrender.com/gettrainers/${user.user_id}`);
            let res = await data.json()
            if (res.length) {
                setTrainers(res);
                console.log(res)
                setMsg2(false)
                setPopup(true);
            }
            else {
                setMsg2(true)
            }
        }
        else {
            console.log("FALSEMAN")
            setMsg1(true)
        }
    }
    return (
        <>
            <Navbar2 />
            <div className="text-center text-white  w-100 fs-1 fw-bold" style={{ marginTop: "5rem" }}><span style={{ color: 'red' }}> Current</span> Schedule
            </div>
            <div className="container cardtable card card-body table-scroll box-shadow mt-2 overflow-y-scroll " style={{ maxHeight: "50vh" }}>
                <table className="table ">
                    <thead className='border-black border-bottom-2'>
                        <tr style={{ color: 'red' }}>
                            <th scope="col">Schedule No</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Intake</th>
                            <th scope="col">Price(₹)</th>
                            <th scope="col">Trainer1</th>
                            <th scope="col">Trainer2</th>
                            <th scope="col">Bookings</th>
                        </tr>
                    </thead>

                    {result.length ? <tbody className="table-group-divider fw-semibold">
                        {result.map((e) => {
                            return (
                                <tr key={e.id} >
                                    <th scope="row" >{i++}</th>
                                    <td>{e.start}</td>
                                    <td>{e.end}</td>
                                    <td>{e.intake}</td>
                                    <td>{e.totalprice}</td>
                                    <td>{e.trainer1}</td>
                                    <td>{e.trainer2}</td>
                                    <td><button className='btn text-white px-3'><Link to={`/SlotBookings/${e.id}`} className='text-white'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="black" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                    </Link></button></td>
                                </tr>
                            );
                        })}

                    </tbody> :
                        <tbody>
                            <tr>
                                <th colSpan="7" className='text-center fw-bold fs-3 fw-medium pt-3'>
                                    No Schedules Set</th>
                            </tr>
                        </tbody>}

                </table>
                <div className='mx-auto'><button className='btn yellowbtn' onClick={handleAdd}>Add +</button></div>
            </div>
            {popup && <div className='container cardtable card card-body mx-auto mt-3 w-100 box-shadow'>

                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <div className="row">
                                <div className="col-6 col-md-4 px-1 mb-2">
                                    <label htmlFor="start" className="ms-2 position-absolute">
                                        <span className="h5 small bg-light text-black px-1">Start</span>
                                    </label>
                                    <input type="time" className="form-control border border-dark bg-white text-black mt-2" name="start" id="start" required />
                                </div>
                                <div className="col-6 col-md-4 px-1 mb-2">
                                    <label htmlFor="end" className="ms-2 position-absolute">
                                        <span className="h5 small bg-light text-black px-1">End</span>
                                    </label>
                                    <input type="time" className="form-control border border-dark bg-white text-black mt-2" name="end" id="end" required />
                                </div>
                                <div className="col-6 col-md-4 px-1 mb-2">
                                    <label htmlFor="intake" className="ms-2 position-absolute">
                                        <span className="h5 small bg-light text-black px-1">Intake</span>
                                    </label>
                                    <input type="number" min="0" className="form-control border border-dark bg-white text-black mt-2" name="intake" id="intake" required />
                                </div>
                                <div className="col-6 col-md-4 px-1 mb-2">
                                    <label htmlFor="price" className="ms-2 position-absolute">
                                        <span className="h5 small bg-light text-black px-1">Price(₹)</span>
                                    </label>
                                    <input type="number" min="0" className="form-control border border-dark bg-white text-black mt-2" name="price" id="price" required />
                                </div>
                                <div className="col-6 col-md-4 px-1 mb-2">
                                    <label htmlFor="trainer1" className="ms-2 position-absolute">
                                        <span className="h5 small bg-light text-black px-1">Trainer 1</span>
                                    </label>
                                    <select className="form-control mt-2 border border-dark bg-white text-black" id="trainer1" name="trainer1" required>
                                        {trainers.map((e) => {
                                            return (
                                                <option key={e.id} value={e.name}>{e.name}</option>
                                            );
                                        })}

                                    </select>
                                </div>
                                <div className="col-6 col-md-4 px-1 mb-2">
                                    <label htmlFor="trainer2" className="ms-2 position-absolute">
                                        <span className="h5 small bg-light text-black px-1">Trainer 2</span>
                                    </label>
                                    <select className="form-control mt-2 border border-dark bg-white text-black" id="trainer2" name="trainer2" required>
                                        <option value="No">No</option>
                                        {trainers.map((e) => {
                                            return (
                                                <option key={e.id} value={e.name}>{e.name}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className=" schedulebtns col-12  col-lg-2 ">
                            <button className='col-5 col-sm-3 col-lg-12 btn btn-dark mt-2 mb-2 ' type='submit'>Add Schedule</button>
                            <button className='cancelbtn col-5 col-sm-3 col-lg-12 btn btn-danger mt-2 ' onClick={() => { setPopup(0) }}>Cancel</button>
                        </div>

                    </div>
                </form>
            </div>}
            <div className="mt-5 w-100 text-center fst-italic font-monospace fs-5">{msg1 && <div className="mt-2 text-white">Not registered yet !!<button className='btn btn-link  fs-5'><Link to="/gymprofile">Register Here</Link></button></div>}{msg2 && <div className="mt-2 text-white font-monospace">No Trainers are registered <button className='btn btn-link fs-5'><Link to="/trainer">Register Here</Link></button></div>}</div>
        </>
    )
}

