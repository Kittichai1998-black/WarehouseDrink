// import * as React from 'react';
import React, { useState, useEffect } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import Login from "../Authen/Authentication";
import Home1 from "../Views/main/home";
import Home2 from "../Views/main/home2";
import MainWarehouse2 from "../Views/main/main-warehouse2";
import MainStore2 from "../Views/main/main-store2";
import Overview from "../Views/main/overview";
import AddStock from "../Views/addstock2";
import CheckStock from "../Views/checkstock";
import Setting from "../Views/setting2";
import ErrorPage from "../error-page404";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function Root() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  // const isLoggedIn = localStorage.getItem("isLoggedIn");

  function checkTokenExpiry() {
    // debugger
    if (token) {
      const decoded = jwtDecode(token); 
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        Swal.fire({
          title: "Session หมดอายุ",
          text: "โปรดเข้าสู่ระบบอีกครั้ง",
          icon: "warning",
          button: "OK",
        }).then(() => {
          window.location.href = "/login";
        });
      }
    }
  }

  if (!token) {
    return <Login />;
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // ตรวจสอบว่าหน้าจอเป็นมือถือหรือไม่

  // ฟังก์ชันตรวจจับการเปลี่ยนขนาดหน้าจอ
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkTokenExpiry();
    window.addEventListener("resize", handleResize); // ฟังการเปลี่ยนแปลงขนาดจอ
    return () => window.removeEventListener("resize", handleResize); // ลบ listener เมื่อไม่ใช้แล้ว
  }, []);

  return (
    <div>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={isMobile ? <Home2 /> : <Home1 />} />
        {/* <Route path="/mainwarehouse" element={<MainWarehouse/>} /> */}
        <Route path="/mainwarehouse" element={<MainWarehouse2 />} />
        <Route path="/mainstore" element={<MainStore2 />} />
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
