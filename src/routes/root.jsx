import * as React from 'react';
import {useLocation, Route, Routes,Navigate } from 'react-router-dom';
import Navbar from '../Components/navbar'
import Login from '../Authen/Authentication';
import Home from '../Views/main/home';
// import MainWarehouse from '../Views/main/main-warehouse';
// import MainStore from '../Views/main/main-store'
// import Home2 from '../Views/main/home2';
import MainWarehouse2 from '../Views/main/main-warehouse2';
import MainStore2 from '../Views/main/main-store2'
import Overview from '../Views/overview';
import AddStock from '../Views/addstock';
import CheckStock from '../Views/checkstock';
import Setting from '../Views/setting';
import ErrorPage from "../error-page404";


function Root() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn")
 
  if(!isLoggedIn){
    return <Login />
  }
  
  return (
    <div>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/mainwarehouse" element={<MainWarehouse/>} /> */}
        <Route path="/mainwarehouse" element={<MainWarehouse2/>} />
        <Route path="/mainstore" element={<MainStore2/>} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/addstock" element={<AddStock />} />
        <Route path="/checkstock" element={<CheckStock />} />
        <Route path="/setting" element={<Setting />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default Root;