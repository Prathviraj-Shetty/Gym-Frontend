import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function PrivateRoutes() {
  let {user}=useContext(AuthContext)
  console.log("Private Route Works",user)
    // let auth={'token':false}
  return (
    
    user?<Outlet/>:<Navigate to="/login"/>
  )
}
