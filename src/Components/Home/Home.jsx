import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


export default function Home() {
const[tv,setTv]=useState([]);
const[movie,setMovie]=useState([]);
const[people,setPeople]=useState([]);
const[loading,setLoading]=useState(true);
 async function getTrending(mediaItem,callback){
  setLoading(true)
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaItem}/week?api_key=f3315c4ac6766b68283c8d019253abdc`)
  setLoading(false)
callback(data.results);
console.log(data.results);
}
useEffect(()=>{
  getTrending('tv',setTv);
  getTrending('movie',setMovie);
  getTrending('person',setPeople);
},[])

  return <>
<Helmet> 
    <title>Home</title>
</Helmet>
{loading? <Loading/>:null}
  <div className="row  py-5">
    <div className="col-md-4 d-flex align-align-items-center">
    <div>
    <div className="brdr w-25 mb-3 "></div>
      <h2 className='h4' >Trending <br />movies <br />Right  </h2>
      <p className='text-muted'>Top Trending Movies By Week</p>
      <div className="brdr w-100 mb-3 "></div>
    </div>
    </div>
    {movie.slice(0,10).map((item , index)=> 
    <div  item={item} key={index} className="col-md-2 text-center">
    <Link className='text-decoration-none text-white' to={`/ItemDetails/${item.id}/${item.media_type}`}>
    <div className='position-relative' >
      {item.poster_path?<img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt="" />:<img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt="" />}<img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100 ' alt="" />
      <h4 className="h6 my-2">{item.name} {item.title} </h4>
      {item.vote_average?      <div className='vote p-1 top-0 end-0 position-absolute'  >{item.vote_average.toFixed(2)}</div>:""}
    </div>
</Link>
  </div>   )}
  </div>
 
  
  <div className="row  py-5">
    <div className="col-md-4 d-flex align-align-items-center">
    <div>
    <div className="brdr w-25 mb-3 "></div>
      <h2 className='h4' >Trending <br />tv <br />Right  </h2>
      <p className='text-muted'>Top Trending tv By Week</p>
      <div className="brdr w-100 mb-3 "></div>
    </div>
    </div>
    {tv.slice(0,10).map((item , index)=>   <div  item={item} key={index} className="col-md-2 text-center">
    <Link className='text-decoration-none text-white' to={`/ItemDetails/${item.id}/${item.media_type}`}>
    <div className='position-relative' >
      {item.poster_path?<img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt="" />:<img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt="" />}<img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100 ' alt="" />
      <h4 className="h6 my-2">{item.name} {item.title} </h4>
      {item.vote_average?      <div className='vote p-1 top-0 end-0 position-absolute'  >{item.vote_average.toFixed(2)}</div>:""}
    </div>
</Link>
  </div> )}
  </div>
  
  <div className="row  py-5">
    <div className="col-md-4 d-flex align-align-items-center">
    <div>
    <div className="brdr w-25 mb-3 "></div>
      <h2 className='h4' >Trending <br />people <br />Right  </h2>
      <p className='text-muted'>Top Trending people By Week</p>
      <div className="brdr w-100 mb-3 "></div>
    </div>
    </div>
    {people.slice(0,10).map((item , index)=>  <div  item={item} key={index} className="col-md-2 text-center">
    <Link className='text-decoration-none text-white' to={`/ItemDetails/${item.id}/${item.media_type}`}>
    <div className='position-relative' >
      {item.poster_path?<img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt="" />:<img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt="" />}<img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100 ' alt="" />
      <h4 className="h6 my-2">{item.name} {item.title} </h4>
      {item.vote_average?      <div className='vote p-1 top-0 end-0 position-absolute'  >{item.vote_average.toFixed(2)}</div>:""}
    </div>
</Link>
  </div>  )}
  </div>
  
  </>
}
