import { Helmet } from 'react-helmet'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function People() {
  const[people,setPeople]=useState([]);
  let mediaType ='person'
  let nums = new Array(10).fill().map((elem,index)=>index+1)

  const[loading,setLoading]=useState(true);
   async function getTrending(page){
    setLoading(true)
    let {data} = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=f3315c4ac6766b68283c8d019253abdc&language=en-US&page=${page}`)
    setLoading(false)
    setPeople(data.results);
  }
  useEffect(()=>{
    getTrending();
  },[])
  



  return<>
  
  <Helmet> 
    <title>People</title>
</Helmet>

{loading? <Loading/>:null}
  <div className="row  py-5">
    <div className="col-md-3 d-flex align-items-center">
    <div>
    <div className="brdr w-25 mb-3 "></div>
      <h2 className='h4' >Trending <br />movies <br />Right  </h2>
      <p className='text-muted'>Top Trending Movies By Week</p>
      <div className="brdr w-100 mb-3 "></div>
    </div>
    </div>
    {people.map((item , index)=>  
    <div  item={item} key={index} className="col-md-2 text-center">
    <Link className='text-decoration-none text-white' to={`/ItemDetails/${item.id}/${mediaType}`}>
    <div className='position-relative' >
      <img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100 ' alt="" />
      <h3 className="h6 my-2">{item.name} {item.title} </h3>
    </div>
</Link>
  </div>  )}
  
    <nav aria-label=" py-5 ">
  <ul className="pagination d-flex  justify-content-center">
    {nums.map((page)=> <li key={page} className='page-item p-1' ><Link 
     onClick={()=> getTrending(page)}  className="page-link text-decoration-none text-light bg-secondary rounded-1 px-2 py-0 p-1">{page}</Link>
   </li>)}
  </ul>
</nav>
  </div>
  

  </>
}
