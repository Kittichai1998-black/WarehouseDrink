import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import dayjs from "dayjs";

export default function DataLog({ data }) {
  const [products, setProducts] = useState([]);

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  };

  const formatType = (type) => {
    return type === "receive" ? "รับเข้า" : "เบิกออก";
  };

  useEffect(() => {
    // console.log(data);
    setProducts(data);
  }, [data]);

  return (
    <div className="card">
      <DataTable
        value={products}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="transectionType"
          header="ประเภทการทำรายการ"
          body={(data, options) => formatType(data.transectionType)}
        ></Column>
        <Column
          field="transactionDateTime"
          header="เวลาทำรายการ"
          body={(data, options) => formatDate(data.transactionDateTime)}
        ></Column>
        <Column field="warehouseName" header="Warehouse"></Column>
        <Column field="productName" header="ชื่อสินค้า"></Column>
        <Column field="quantity" header="จำนวนที่ทำรายการ"></Column>
        <Column field="reason" header="เหตุผล"></Column>
        <Column field="remark" header="รายละเอียด"></Column>
      </DataTable>
    </div>
  );
}
