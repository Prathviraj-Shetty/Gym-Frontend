import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const nav = useNavigate();
  let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  let [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
  let [loading, setLoading] = useState(true);

let loginUser = async (e) => {
    e.preventDefault();                                    
    console.log("FOrm Submitted" + e.target.username.value);
    const type = e.target.type.value
    let res = await fetch(`https://gymbackend-nmxx.onrender.com/usertype/${e.target.username.value}`)
    let user=await res.json()
    console.log("TYPE=",user.type , type)
    if (user.type != type)
        return false
    let response = await fetch(`https://gymbackend-nmxx.onrender.com/api/token/`, {

        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
    });

    let data = await response.json();
    if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));  //syntax
        console.log("FOrm Submitted", authTokens, user)
        localStorage.setItem('authTokens', JSON.stringify(data))              
        return true
    }
    else {
        return false
    }
}


let registerUser = async (e) => {
    e.preventDefault();                                    
    console.log("FOrm Submitted" + e.target.username.value);
    // nav(`/login`)

}


let updateToken = async (e) => {
    console.log("Update Token Reached")
    let response = await fetch(`https://gymbackend-nmxx.onrender.com/api/token/refresh/`, {

        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'refresh': authTokens?.refresh })
    });

    let data = await response.json();  
    if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data))
        // nav(`/Header`)
    }
    else {
        logoutUser();
    }
    if (loading) {
        setLoading(false);
    }
}

let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    console.log("LOGGED OUT", user);
    localStorage.removeItem('authTokens')
    nav(`/login`)
}


let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser
}

//Refersh Token must be called 
useEffect(() => {
    if (loading) {
        updateToken();
    }
    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
        if (authTokens) {
            updateToken()
        }
    }, fourMinutes)
    return () => clearInterval(interval)
}, [authTokens, loading])


return (
    <AuthContext.Provider value={contextData}>
        {loading ? null : children}
    </AuthContext.Provider>
)
}

