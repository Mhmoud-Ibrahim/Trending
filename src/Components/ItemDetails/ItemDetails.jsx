import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'

export default function ItemDetails() {

    let {id,mediaType} = useParams();
    const[itemDetails,setItemDetails]=useState({})

    async function getItemDetails(id,mediaType){
    let {data}= await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f3315c4ac6766b68283c8d019253abdc`)
    setItemDetails(data)
    console.log(data); 
}

useEffect(()=>{
    getItemDetails(id,mediaType)
},[])
  return<>
<Helmet> 
    <title>Details</title>
</Helmet>
  <div className="row">
     <div className="col-md-4"> 
        {itemDetails.poster_path?<img  src={'https://image.tmdb.org/t/p/w500' + itemDetails.poster_path} className='w-100 ' alt="" />:<img  src={'https://image.tmdb.org/t/p/w500' + itemDetails.profile_path} className='w-100 ' alt="" />}
    </div>

 <div className="col-md-8 mt-5">
    <h2  className=" mb-5 text-white ">{itemDetails.name} {itemDetails.title}</h2>
    <p className='text-muted'>{itemDetails.overview} {itemDetails.biography}</p>
    {itemDetails.place_of_birth? <p>Place of Birth: {itemDetails.place_of_birth}</p>: ""}
 {itemDetails.popularity?<p>popularity:{itemDetails.popularity}</p> : '' }
 {itemDetails.vote_average?<p>Vote:{itemDetails.vote_average}</p> : '' }
 {itemDetails.vote_count?<p>Vote Count:{itemDetails.vote_count}</p> : '' }
 {itemDetails.original_name?<p>Original Name:{itemDetails.original_name}</p> : '' }
 {itemDetails.release_date?<p>Release Date :{itemDetails.release_date}</p> : '' }
 </div>
  </div>

  </>
}
