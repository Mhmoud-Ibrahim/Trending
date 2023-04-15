import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";

export let mainContext = createContext();
 
  export default function MaincontextProvider(props){
const [userdata,setUserdata]=useState();

function saveUserdata(){
    let indecodedtoken = localStorage.getItem('userToken');
    let decodedtoken = jwtDecode(indecodedtoken);
    setUserdata(decodedtoken);
}



    return<mainContext.Provider value={{userdata,setUserdata,saveUserdata}}  >
                {props.children}
    </mainContext.Provider>
}