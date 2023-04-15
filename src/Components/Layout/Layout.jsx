import React, { useContext } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { mainContext } from '../../Context/MainContext'
import { Offline, Online } from "react-detect-offline";
export default function Layout() {

  let {setUserdata} = useContext(mainContext)
  let navigate = useNavigate()
 
function logout(){
    localStorage.removeItem('userToken');
    setUserdata(null); 
    navigate('/login');
    }


  return <>
    <Navbar logout={logout} />
    <div className="container">
      <Outlet></Outlet>
    </div>

    <Offline>
      <div className='network fa-bounce'>You are ofline <i className='fas fa-wifi fa-beat' ></i></div>
    </Offline>
    <Footer />
  </>
}
