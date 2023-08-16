import React, { useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function UserSchedule() {
    const { user } = useContext(AuthContext)
    let i = 1
    const [result, setResult] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [str, setStr] = useState("");
    const [msg, setMsg] = useState(false);
    const [popup, setPopup] = useState(false);
    const {id}=useParams()
    const nav = useNavigate()
    useEffect(() => {
        dynamic()
    }, [popup])

    let dynamic = async () => {

        let data = await fetch(`https://gymbackend-nmxx.onrender.com/getgymschedule/${id}`);
        let res = await data.json()
        setResult(res);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { "slotid": e.target.value,"uid":user.user_id}
        console.log(data)
        let response = await fetch(`https://gymbackend-nmxx.onrender.com/bookslot/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res=await response.json()
        if(res.status=="full")
        {
                setMsg(true)
        }
       else{
        setMsg(false)
        nav(`/success/${res.id}`)
       }
    }
   
    return (
        <>
            <div className="text-center text-white  w-100 mt-5  fs-1 fw-bold" ><span style={{ color: 'red' }}> Current</span> Schedule
            </div>
            <div className="container card card-body cardtable table-scroll box-shadow mt-5 overflow-y-scroll " style={{ maxHeight: "50vh" }}>
                <table className="table ">
                    <thead className='border-black border-bottom-2'>
                        <tr style={{ color: 'red' }}>
                            <th scope="col">Schedule No</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Intake</th>
                            <th scope="col">Booked</th>
                            <th scope="col">Price(₹)</th>
                            <th scope="col">Trainer1</th>
                            <th scope="col">Trainer2</th>
                            <th scope="col"></th>
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
                                    <td>{e.booked}</td>
                                    <td>{e.totalprice}</td>
                                    <td>{e.trainer1}</td>
                                    <td>{e.trainer2}</td>
                                    <td><button className='btn btn-dark text-light' value={e.id} onClick={handleSubmit}>Book Slot</button></td>
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
            </div>
            {msg&&<div className='text-center fs-4 fw-bold text-white mt-4' style={{fontFamily:"cursive"}}> Sorry !<span style={{ color: 'red' }}> This Slot is Full</span></div>}
        </>
    )
}

