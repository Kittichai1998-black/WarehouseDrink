/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect, useRef, useState } from "react";
// import { ProductService } from '../../demo/service/ProductService';
// import { LayoutContext } from '../../layout/context/layoutcontext';
// import { Demo } from '@/types';
// import BarChar from '../../Components/barchar';
import StackedbarToDay from "../../Components/stackedbarToday";
import StackedbarToMonth from "../../Components/stackedbarToMonth";
import DataLog from "../../Components/datatable-log";

const Home = () => {
  return (
    <div className="overflow-y-scroll" style={{ height: "100vh" }}>
      <div className="grid ">
        <div className="sm:col-12 md:col-6 lg:col-3 ">
          <div className="mx-3 mt-4 card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-600 text-2xl font-medium mb-3">
                  รับเข้า
                </span>
                <div className="text-900 font-medium text-xl text-green-600">
                  0
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-12 md:col-6 lg:col-3">
          <div className="mx-3 mt-4 card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-600 text-2xl font-medium mb-3">เบิกออก</span>
                <div className="text-900 font-medium text-xl">0</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-box text-orange-500 text-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-12 md:col-6 lg:col-3">
          <div className="mx-3 mt-4 card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-600 text-2xl font-medium mb-3">
                  In Stock
                </span>
                <div className="text-900 font-medium text-xl text-green-600">
                  0
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-home text-cyan-500 text-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-12 md:col-6 lg:col-3">
          <div className="mx-3 mt-4 card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-600 text-2xl font-medium mb-3">
                  In Warehouse
                </span>
                <div className="text-900 font-medium text-xl">0</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-inbox text-purple-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-12 md:col-6 lg:col-6 xl:col-6">
          <div className="mx-3 mt-4 card mb-0">
            <h5>ข้อมูลการรับเข้า - เบิกออก (รายวัน)</h5>
            <StackedbarToDay />
          </div>
        </div>

        <div className="sm:col-12 md:col-6 lg:col-6 xl:col-6">
          <div className="mx-3 mt-4 card mb-0">
            <h5>ข้อมูลการรับเข้า - เบิกออก (รายเดือน)</h5>
            <StackedbarToMonth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
