import axios from 'axios';
import { useFormik } from 'formik';
import React, {  useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import *as Yup from 'yup';
import { mainContext } from '../../Context/MainContext';
import { Helmet } from 'react-helmet';


export default function Login() {

  let {saveUserdata} = useContext(mainContext)
let navigate = useNavigate()
const[isloading,setIsloading]=useState(false)
const[msgErrors,setmsgErrors]=useState('')

   async  function setRegisterData(values){

  
    setIsloading(true);
    let {data} =await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((err)=>{ 
    setmsgErrors(err.response.data.message)
      console.log(err.response.data.message);
     setIsloading(false)
    });
  if(data.message === 'success'){
    
    localStorage.setItem('userToken' , data.token)
    
    saveUserdata()
    setIsloading(false);
   navigate('/')
  }
 
  }

  let validationSchema =Yup.object({
    email:Yup.string().required('email is requiered').email('Email is invalid').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email must contain @ its not email'),
    password:Yup.string().required('password is requiered').matches(/^[A-z][a-z0-9]{5,10}$/,'password is in valid'),
  })

let formik = useFormik({
  initialValues:{
    email:'',
    password:''
  },
  
  validationSchema
  ,onSubmit:setRegisterData
})



  return <>
 <Helmet> 
    <title>login</title>
</Helmet>
  <div className="container bg-secondary p-5 mt-4">
  <form  onSubmit={formik.handleSubmit}>
 {msgErrors?<div className="alert alert-danger">{msgErrors}</div>:null}
   
   <label htmlFor="email">email:</label>
  <input type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" id="email" className='form-control' />
  {formik.errors.email&&formik.touched.email?  <div className="alert alert-danger">{formik.errors.email}</div>:null}

   <label htmlFor="password">password:</label>
  <input type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" id="password" className='form-control' />
  {formik.errors.password&&formik.touched.password?  <div className="alert alert-danger">{formik.errors.password}</div>:null}

{isloading?   <button disabled={!(formik.dirty&&formik.isValid)} type='button' className='btn btn-warnint btn-success mt-2'><i className='fas fa-spinner fa-spin'></i></button>
:   <button disabled={!(formik.dirty&&formik.isValid)} type='submit' className='btn btn-warnint btn-success mt-2'>Login</button>
}
  </form>
  </div>
  
  
  </>
}
