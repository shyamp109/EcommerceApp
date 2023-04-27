import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumbs'

const MainLayout = () => {
  var location = useLocation();
  
   
  return (
    <div>
        <Navbar />
        <Breadcrumb path={location} />
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainLayout