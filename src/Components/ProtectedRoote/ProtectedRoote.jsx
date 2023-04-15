import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoote(props) {

if(localStorage.getItem('userToken') ==  null)
{
 return  <Navigate to={'/login'}  />
}
else{
  return props.children;
}

}


