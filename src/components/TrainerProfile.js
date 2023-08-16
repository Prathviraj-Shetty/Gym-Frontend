import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../assets/images/trainer.jpg';
import Navbar2 from './Navbar2';
import AuthContext from '../context/AuthContext';

export default function Trainer() {
//   const nav = useNavigate()
  const [msg, setMsg] = useState(0);
  const { user } = useContext(AuthContext)

  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = {'user':user.user_id, 'name': e.target.name.value, 'age': e.target.age.value, 'experience': e.target.experience.value, 'charge': e.target.charge.value, 'gender': e.target.gender.value, 'phone': e.target.phone.value, 'field': e.target.field.value, }
    let response = await fetch(`https://gymbackend-nmxx.onrender.com/trainerprofile/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    e.target.submit.disabled = true
    let res = await response.json();
    let id = res.id
    console.log(id)
    }

    return (
        <>
            <Navbar2 />
            <div className='position-absolute z-3 w-100'>
                {msg ? <div className="box-shadow d-flex justify-content-between border border-2 border-white rounded-5 py-2 px-3 fw-semibold left-2 mt-5 w-25 mx-auto text-center text-light bg-success"><span>Added Successfully</span>
                    <button className='btn text-light py-0 px-1' onClick={() => { setMsg(0) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                    </button></div> : <div></div>}
            </div>
            <div className="container position-absolute top-50 start-50 mt-3 translate-middle mx-auto">
                <div className=' ms-4 fs-3'>
                    <Link to={`/gymhome`} className='fw-bold text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="25" fill="currentColor" className="bi bi-arrow-left-circle mx-2" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                    </Link>
                </div>
                <div className="row justify-content-center">
                    <div className="d-sm-none d-none d-md-grid col-md-3 p-0">
                        <img src={profile} className='w-100 h-100' alt="" />
                    </div>
                    <div className="col-md-6 col-10">
                        <form className=' mx-auto w-100  box-shadow' onSubmit={handleSubmit}>
                            <div className="row px-2">
                                <div className="col-12 px-1 text-center text-white mb-1 fs-2 fw-bold ">
                                    Enter <span style={{color:"red"}}>Trainer</span> Details
                                </div>
                                <div className="col-12 px-1  mx-auto mb-5">
                                    <div className="profileimg  mx-auto"></div>
                                </div>
                                <div className="col-6 px-1 mb-2">
                                    <label for="name" className="ms-2  position-absolute">
                                        <span className="h6 small bg-black text-white  px-1">Full Name</span>
                                    </label>
                                    <input type="text" className="form-control border  bg-black text-white mt-2 pt-3" name="name" id="name" required />
                                </div>
                                <div className="col-6 px-1 mb-2">
                                    <label for="age" className="ms-2  position-absolute">
                                        <span className="h6 small bg-black text-white  px-1">Age</span>
                                    </label>
                                    <input type="number" className="form-control border  bg-black text-white mt-2 pt-3" name="age" id="age" required />
                                </div>
                                <div className=" mx-auto col-6 px-1 mb-2">
                                    <label for="gender" className="ms-2 position-absolute">
                                        <span className="h6 small bg-black text-white px-1">Gender</span>
                                    </label>
                                    <select className="form-control mt-2 border  bg-black text-white pt-3" id="gender" name="gender" required>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="col-6 px-1 mb-2">
                                    <label for="experience" className="ms-2  position-absolute">
                                        <span className="h6 small bg-black text-white  px-1">Experience (in years)</span>
                                    </label>
                                    <input type="number" className="form-control border  bg-black text-white mt-2 pt-3" name="experience" id="experience" required />
                                </div>
                                <div className="col-6 px-1 mb-2">
                                    <label for="charge" className="ms-2  position-absolute">
                                        <span className="h6 small bg-black text-white  px-1">Charge(₹)</span>
                                    </label>
                                    <input type="number" className="form-control border  bg-black text-white mt-2 pt-3" name="charge" id="charge" required />
                                </div>
                                <div className="col-6 px-1 mb-2">
                                    <label for="phone" className="ms-2 position-absolute">
                                        <span className="h6 small bg-black text-white px-1">Phone No</span>
                                    </label>
                                    <input type="text" className="form-control border bg-black text-white mt-2 pt-3" name="phone" id="phone" required />
                                </div>
                                <div className=" mx-auto col-12 px-1 mb-4">
                                    <label for="field" className="ms-2 position-absolute">
                                        <span className="h6 small bg-black text-white px-1">Fields Of Expertise</span>
                                    </label>
                                    <textarea name="field" id="field" className="form-control border bg-black text-white mt-2 pt-3" style={{ resize: 'none' }} required ></textarea>
                                </div>
                            </div>
                            <div className="submit text-center"><button type="submit" name="submit" onClick={(e) => { setMsg(1) }} className='btn btn-light'>Save</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
