import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import MaincontextProvider from './Context/MainContext';
import Loading from './Components/Loading/Loading';
import ProtectedRoote from './Components/ProtectedRoote/ProtectedRoote';
import { Offline } from "react-detect-offline";

let routers = createBrowserRouter([
  { path: "", element:<Layout />  , children: [
    {index:true , element:<ProtectedRoote><Home/> </ProtectedRoote> },
    {path:'home' , element:<ProtectedRoote><Home/></ProtectedRoote>  },
    {path:"movies" , element:<ProtectedRoote> <Movies/></ProtectedRoote>},
    {path:"tvshow" , element:<ProtectedRoote><Tvshow/></ProtectedRoote> },
    {path:"people" , element:<ProtectedRoote><People/></ProtectedRoote> },
    {path:"login" , element: <Login/>},
    {path:"loading" , element:  <Loading/>},
    {path:"ItemDetails/:id/:mediaType" , element: <ItemDetails/>},
    {path:"register" , element: <Register/>},
    {path:"*", element: <ProtectedRoote><Notfound/></ProtectedRoote>},
  ]}
])

function App() {
  return <>    
    <Offline> <div className="network">You are ofline 
    <i class="fa-sharp fa-solid fa-wifi"></i> </div>  </Offline>
  <MaincontextProvider>
        <RouterProvider router={routers}></RouterProvider>
  </MaincontextProvider>

  </>
 
  
}

export default App;
