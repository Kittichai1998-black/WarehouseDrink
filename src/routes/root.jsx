import * as React from 'react';
import {useLocation, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/navbar'
import Login from '../Authen/Authentication';
import Home from '../Views/home';
import Overview from '../Views/overview';
import AddStock from '../Views/addstock';
import CheckStock from '../Views/checkstock';
import Setting from '../Views/setting';
import ErrorPage from "../error-page404";


function Root() {
  const location = useLocation();

  // if (!token) {
  //   return <Login />;
  // }

  return (
    <div>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
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