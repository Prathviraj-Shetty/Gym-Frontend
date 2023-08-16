import React, { useEffect, useState } from 'react'
import image from '../assets/images/3.svg'
import { Link, useParams } from 'react-router-dom';

export default function TrainerList() {
  const [result, setResult] = useState([]);
  const [str, setstr] = useState();
  const { gym } = useParams();
  useEffect(() => {
    dynamic()
  }, [str])

  let dynamic = async () => {
    let data = await fetch(`https://gymbackend-nmxx.onrender.com/getgymtrainers/${gym}`);
    let res = await data.json()
    setResult(res);
    console.log(res);
  }


  return (
    <div>
      {result.length ? <div className="mt-5 a-container">
        {result.map((e) => {
          return (
            <div className='a-box'>
              <div className="a-b-img">
                <img src={image} alt="" />
              </div>
              <div className="a-b-text">
                <h2>{e.name}</h2>
                <p>Gender- {e.gender}</p>
                <p>Experience- {e.experience} years</p>
                <p>Contact No- {e.phone}</p>
                <p>Charge- {e.charge} rupees</p>
                <p>Field- {e.field}</p>

              </div>
            </div>
          );
        })}

      </div> :
      <>
        <div className="mt-5 a-container">
          <div className='a-box'>
            <div className="a-b-img mb-5">
              <img src={image} alt="" />
            </div>
            <div className="a-b-text">
              <h2>No Trainers Found</h2>
            </div>
          </div>
        </div>
        <div className='w-100 fs-5 text-center'><Link to="/search">Go Back</Link></div>
        </>
      }
    </div>
  )
}
