import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import *as Yup from 'yup';

export default function Register() {
let navigate = useNavigate()
const[isloading,setIsloading]=useState(false)
const[msgErrors,setmsgErrors]=useState('')
   async  function setRegisterData(values){
    setIsloading(true)
    let {data} =await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((err)=>{
      setIsloading(false)
    setmsgErrors(err)})
   localStorage.setItem('userToken',data.token);
  
    
   if(data.message === 'success'){
      setIsloading(false)
    navigate('/login')
  }
  
  }

  let validationSchema =Yup.object({
    name:Yup.string().required('Name is requiered').min(4,'name maust be 4 and more').max(20,'not more 20 digit'),
    email:Yup.string().required('email is requiered').email('Email is invalid').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email must contain @ its not email'),
    password:Yup.string().required('password is requiered').matches(/^[A-z][a-z0-9]{5,10}$/,'password is in valid'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'not matched'),
    phone:Yup.string().required('phone is required').matches(/^(002){0,1}01[0125][0-9]{8}$/,'invalid Number')
  })

let formik = useFormik({
  initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:''
  },
  
  validationSchema
  ,onSubmit:setRegisterData
})



  return <>
  <Helmet> 
    <title>Register</title>
</Helmet>


  <div className="container bg-secondary p-5 mt-4">
  <form  onSubmit={formik.handleSubmit}>
  {msgErrors?<div className='alert alert-success'>{msgErrors}</div>:null}
   
   <label htmlFor="name">Name:</label>
  <input type="text" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name="name" id="name" className='form-control' />
  {formik.errors.name&&formik.touched.name?  <div className="alert alert-danger">{formik.errors.name}</div>:null}

   <label htmlFor="email">email:</label>
  <input type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" id="email" className='form-control' />
  {formik.errors.email&&formik.touched.email?  <div className="alert alert-danger">{formik.errors.email}</div>:null}

   <label htmlFor="password">password:</label>
  <input type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" id="password" className='form-control' />
  {formik.errors.password&&formik.touched.password?  <div className="alert alert-danger">{formik.errors.password}</div>:null}

   <label htmlFor="rePassword">repassword:</label>
  <input type="password" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name="rePassword" id="rePassword" className='form-control' />
  {formik.errors.rePassword&&formik.touched.rePassword?  <div className="alert alert-danger">{formik.errors.rePassword}</div>:null}


   <label htmlFor="phone">phone:</label>
  <input type="tel" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name="phone" id="phone" className='form-control' />
  {formik.errors.phone&&formik.touched.phone?  <div className="alert alert-danger">{formik.errors.phone}</div>:null}
{isloading?   <button disabled={!(formik.dirty&&formik.isValid)} type='button' className='btn btn-warnint btn-success mt-2'><i className='fas fa-spinner fa-spin'></i></button>
:   <button disabled={!(formik.dirty&&formik.isValid)} type='submit' className='btn btn-warnint btn-success mt-2'>Register</button>
}
  </form>
  </div>
  
  
  </>
}
