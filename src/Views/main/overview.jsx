import React, { useEffect, useState } from "react";
import { httpClient } from "../../axios/HttpClient.jsx";
import StackedbarToDay from "../../Components/stackedbarToday";
import DataLog from "../../Components/datatable-log";

const Home = () => {

  const [data, setData] = useState([]);

  const totalReceive = data.totalReceive;
  const totalIssue = data.totalIssue;
  const stockInStore = data.stockInStore;
  const lowStock = data.lowStock;
  const logPerWeek = data.logPerWeek;
  const logtransection = data.logtransection;

  useEffect(() => {
    // debugger;
    const fetchData = async () => {
      const response = await httpClient.get("/api/transactionController/overview");
      const result = response.data.result || response.data;
      setData(result);
    };
    fetchData();
    // console.log(data);
  }, []);

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
                  {totalReceive}
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
                <span className="block text-600 text-2xl font-medium mb-3">
                  เบิกออก
                </span>
                <div className="text-900 font-medium text-xl">{totalIssue}</div>
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
                  สินค้าคงเหลือ
                </span>
                <div className="text-900 font-medium text-xl text-green-600">
                  {stockInStore}
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
                  สินค้าคงเหลือต่ำในสต็อก
                </span>
                <div className="text-900 font-medium text-xl">{lowStock}</div>
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
            <h5>ข้อมูลการรับเข้า - เบิกออก (รายสัปดาห์)</h5>
            <StackedbarToDay data={logPerWeek}/>
          </div>
        </div>

        <div className="sm:col-12 md:col-6 lg:col-6 xl:col-6">
          <div className="mx-3 mt-4 card mb-0">
            <h5>รายการสินค้าเข้า-ออกล่าสุด</h5>
            <DataLog data={logtransection}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
