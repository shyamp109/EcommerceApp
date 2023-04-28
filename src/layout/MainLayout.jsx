import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumbs'

const MainLayout = () => {
  // const [token, setToken] = useState(null);
  // useEffect(() => {
  //   const token = localStorage.getItem("loginToken");
  //   console.log(token);
  //   setToken(token);
  // },[token]);
  var location = useLocation();
  
    const NavigatePerUser = () =>{
      const token = localStorage.getItem("loginToken");
      console.log("token",token)
        if(token) {
          return <Outlet />
        } else {
          
          return <Navigate to={"/login"} />
        }
    }
  return (
    <div>
        <Navbar />
        <Breadcrumb path={location} />
        {/* <Outlet /> */}
        {NavigatePerUser()}
        <Footer />
    </div>
  )
}

export default MainLayout