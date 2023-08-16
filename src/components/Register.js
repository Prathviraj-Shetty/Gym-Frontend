import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
// import '../CSS/createAccount.css'
import '../assets/css/login.css'
export default function Register() {
	const [msg, setMsg] = useState();

	const nav = useNavigate();

	function timeout(delay) {
		return new Promise( res => setTimeout(res, delay) );
	}

	let handleSubmit = async (e) => {
		e.preventDefault();
		let data = await fetch(`https://gymbackend-nmxx.onrender.com/verifyusername/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "username": e.target.username.value })

		});
		let res = await data.json()
		if (res.status == "Yes")
			setMsg("Username Already Exists !!!")
		else if (e.target.password1.value != e.target.password2.value)
			setMsg("Password didn't match !!!")
		else {
			setMsg("Account created  for "+e.target.username.value)
			let response = await fetch(`https://gymbackend-nmxx.onrender.com/register/`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ "type": e.target.type.value,"username": e.target.username.value, "email": e.target.email.value, "password": e.target.password1.value })

			});
			await timeout(3000)
			nav(`/login`)
		}
	}

	return (
		<>


			<div id="login" className="bg-danger">
				<div id="register" className="container h-100">
					<div className='position-absolute top-50 start-50 translate-middle px-5'>
						<div className="d-flex justify-content-center h-100">
							<div className="user_card">
								<div className="d-flex justify-content-center">
									<h3 id="form-title">REGISTER ACCOUNT</h3>
								</div>
								<div className="d-flex justify-content-center form_container">

									<form onSubmit={handleSubmit} autoComplete='off'>
									<p className='xmessage text-center fst-italic mt-2 fw-bold' style={{color:"yellow"}}>{msg}</p>
										<div className="input-group mb-3">
											<select className="w-100  bg-black  text-center py-2 border rounded-3" id="type" name="type" required>
												<option value="User">User</option>
												<option value="Admin">Admin</option>
											</select>
										</div>
										<div className="input-group mb-2">
											<div className="input-group-append">
												<span className="input-group-text h-100"><i className="fas fa-user"></i></span>
											</div>
											<input type="text" name="username" placeholder="Username..." className='form-control' required />
										</div>
										<div className="input-group mb-2">
											<div className="input-group-append">
												<span className="input-group-text h-100"><i className="fas fa-envelope-square"></i></span>
											</div>
											<input type="email" name="email" placeholder="Email.." className='form-control' />
										</div>
										<div className="input-group mb-2">
											<div className="input-group-append">
												<span className="input-group-text h-100"><i className="fas fa-key"></i></span>
											</div>
											<input type="password" name="password1" placeholder="Password..." className='form-control' required />
										</div>
										<div className="input-group mb-2">
											<div className="input-group-append">
												<span className="input-group-text h-100"><i className="fas fa-key"></i></span>
											</div>
											<input type="password" name="password2" placeholder="Re-enter Password..." className='form-control' required />
										</div>

										<div className="d-flex justify-content-center mt-3 login_container">
											<input type="submit" className="btn login_btn" value="Register Account" />

										</div>
									</form>
								</div>
								<div className="mt-2">
									<div className="d-flex justify-content-center links text-light">
										Already have an account? <Link to="/login" className="mx-2 fs-5 fw-bold" style={{ color: 'yellow' }} >Login</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
