import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
// import '../assets/css/login.css'
// import { AuthProvider } from '../context/AuthContext'


const Login = () => {
  //   const { loginUser } = useContext(AuthContext)             //Always after rfc
  const [msg, setMsg] = useState();
  const { loginUser } = useContext(AuthContext);
  // const { logoutUser } = useContext(AuthContext)
  const nav = useNavigate()

  const handleLogin = async (e) => {
    let status = await loginUser(e)
    console.log("DATA=", status)
    if (status == false)
      setMsg("Incorrect Username or Password")
    else
    {
      if(e.target.type.value=="Admin")
        nav(`/gymhome`)
      else
        nav(`/`)
    } 
  }

  return (
    <>

      <div id="login">
        <div className="container h-100">
          <div className="position-absolute top-50 start-50 translate-middle px-5">
            <div className="d-flex justify-content-center h-100">
              <div className="user_card">
                <div className="d-flex justify-content-center">
                  <h3 id="form-title">LOGIN</h3>
                </div>
                <p className=' text-center fst-italic text-white pt-2'>{msg}</p>
                <div className="d-flex justify-content-center form_container">
                  <form onSubmit={handleLogin} autoComplete='off'>
                    <div className="input-group mb-3">
                      
                      <select className="w-100  bg-black  text-center py-2 border rounded-3" id="type" name="type" required>
                        <option value="User">User Login</option>
                        <option value="Admin">Admin Login</option>
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-append">
                        <span className="input-group-text h-100"><i className="fas fa-user"></i></span>
                      </div>

                      <input type="text" name="username" placeholder="Username..." className="form-control" required/>
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-append">
                        <span className="input-group-text h-100"><i className="fas fa-key"></i></span>
                      </div>

                      <input type="password" name="password" placeholder="Password..." className="form-control" required/>
                    </div>

                    <div className="d-flex justify-content-center mt-3 login_container">
                      <input className="btn login_btn " type="submit" value="Login" />
                    </div>
                  </form>

                </div>

                {/* {% for message in messages %}
					<p id="messages">{{message}}</p>
				{% endfor %}			 */}

                <div className="mt-4">
                  <div className="d-flex justify-content-center links text-white">
                    Don't have an account?   <Link to="/register" className="mx-2 fs-5 fw-bold" style={{color:'yellow'}} >Sign Up</Link>
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
export default Login

