import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import dayjs from "dayjs";
import { httpClient } from "../axios/HttpClient.jsx";
export default function StockDataLog({ item }) {
  // debugger;
  // const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  };

  const formatType = (type) => {
    return type === "receive" ? "รับเข้า" : "เบิกออก";
  };

  useEffect(() => {
    const getDetailLog = async () => {
      try {
        const response = await httpClient.get("/api/transactionController/log/"+item.productId);
        const detail = response.data.result || response.data;
        const formattedDetail = detail;
        setData(formattedDetail);
      } catch (error) {
        console.error("Error fetching detail log:", error);
      }
    };

    console.log(item.productId);
    getDetailLog();
  }, []);

  return (
    <div className="card">
      <DataTable
        value={data}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="transectionType"
          header="ประเภทการทำรายการ"
          body={(data, options) => formatType(data.transectionType)}
          style={{ width: "30%" }}
        ></Column>
        <Column
          field="transactionDateTime"
          header="เวลาทำรายการ"
          body={(data, options) => formatDate(data.transactionDateTime)}
          style={{ width: "30%" }}
        ></Column>
        <Column field="warehouseName" header="Warehouse"></Column>
        <Column field="productName" header="ชื่อสินค้า" style={{ width: "20%" }}></Column>
        <Column field="quantity" header="จำนวนที่ทำรายการ" style={{ width: "20%" }}></Column>
        <Column field="reason" header="เหตุผล" style={{ width: "30%" }}></Column>
        <Column field="remark" header="รายละเอียด" style={{ width: "30%" }}></Column>
      </DataTable>
    </div>
  );
}
