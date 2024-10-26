import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Card } from "primereact/card";

import dayjs from "dayjs";

import {httpClient} from '../axios/HttpClient.jsx'

import "../css/table.css";

import TopBarOverview from "../assets/imgs/topbar/topbar-overview.png";

export default function OverView() {
  const navigate = useNavigate();
  const mainPage = localStorage.getItem("mainPage")
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [metaKey, setMetaKey] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getProduct = async () => {
  const response = await httpClient.get("/api/"+ mainPage);
  setProduct(response.data.result);
  console.log(response);
};

  const tableData = Object.keys(product).map((key) => ({
    ID: key,
    Branch: product[key].Branch,
    Day: product[key].Day,
    LastUpdate: product[key].LastUpdate,
    MaximumUnits: product[key].MaximumUnits,
    MinimumUnits: product[key].MinimumUnits,
    ProductDescription: product[key].ProductDescription,
    ProductID: product[key].ProductID,
    ProductName: product[key].ProductName,
    Type: product[key].Type,
    UnitsInStock: product[key].UnitsInStock,
    UnitsOnOrder: product[key].UnitsOnOrder,
    UnitsPrice: product[key].UnitsPrice,
    UpdateBy: product[key].UpdateBy
  }));

  useEffect(() => {
    getProduct();
  }, []);

  const rowClass = (data) => {
    return {
        'bg-red-300': data.UnitsInStock < 10
    };
};

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;
    setFilters(_filters);
};
  
  const renderHeader = () => {
    const value = filters['global'] ? filters['global'].value : '';

    return (
        <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder="Search"
          />
        </span>
      </div>
    );
};

  const formatDate = (date) => {
    return (
      dayjs(date.LastUpdate).format('DD-MM-YYYY')
    )
  } 

const header = renderHeader();

  return (
    // <body>
      <div className="layout-page">
        <div className="card">
          {/* <div className="align-items-left">
            <Button
              label="Back"
              icon="pi pi-angle-left"
              severity="info"
              size="small"
              onClick={() => navigate("/mainwarehouse")}
            />
          </div> */}
          {/* <div style={{paddingTop:"16px"}}> */}
            <Card>
             <p class="w-2 text-left font-bold text-black-alpha-60 mr-3 text-3xl w-10">OverView</p>
              <div className="row justify-content-center gap-4">
                <div className="col-sm-12">
                  {/* <Card title="Product"> */}
                    <DataTable
                      header={header}
                      filters={filters} 
                      onFilter={(e) => setFilters(e.filters)}
                      value={tableData}
                      showGridlines
                      stripedRows
                      scrollHeight="auto"
                      size="small"
                      rowClassName={rowClass}
                      selection={selectedProduct} 
                      onSelectionChange={(e) => setSelectedProduct(e.value)}
                      selectionMode="single"
                      dataKey="ProductID"
                      metaKeySelection={metaKey}
                      rowHover
                      paginator
                      rows={10}
                      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                      currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    >
                      <Column
                        header="No."
                        headerStyle={{ width: "3%" }}
                        body={(data, options) => options.rowIndex + 1}
                      ></Column>
                       <Column
                        field="ProductID"
                        header="ProductID"
                        sortable
                        style={{ width: "10%" }}
                      ></Column>
                      <Column
                        field="ProductName"
                        header="Ingredient"
                        sortable
                        style={{ width: "30%" }}
                      ></Column>
                      <Column
                        field="UnitsInStock"
                        header="Remain"
                        sortable
                        style={{ width: "25%" }}
                      ></Column>
                      <Column
                        field="Discription"
                        header="%"
                        // sortable
                        style={{ width: "10%" }}
                      ></Column>
                      <Column
                        field="LastUpdate"
                        header="LastUpdate"
                        sortable
                        style={{ width: "25%" }}
                        body={(data, options) => formatDate(data)}
                      ></Column>
                    </DataTable>
                  {/* </Card> */}
                </div>
              </div>
            </Card>
          {/* </div> */}
        </div>
      </div>
    // </body>
  );
}
