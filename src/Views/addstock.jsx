import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

import "../css/table.css";

// import TopBarOverview from "../assets/imgs/topbar/topbar-overview.png";

export default function AddStock() {
  const navigate = useNavigate();
  const [productWarehouse, setProductWarehouse] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [metaKey, setMetaKey] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  const getProductWarehouse = async () => {
    const response = await axios.get("http://localhost:3001/api/getstock");
    setProductWarehouse(response.data.result);
    console.log(response);
  };

  useEffect(() => {
    getProductWarehouse();
  }, []);

  const rowClass = (data) => {
    return {
      "bg-red-200": data.UnitInStock < 10,
    };
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;
    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

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
        <Button label="Add Stock" size="small" severity="success" rounded/>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <body>
      <div className="layout-page">
        <div>
          <div className="align-items-left">
            <Button
              label="Back"
              icon="pi pi-angle-left"
              severity="info"
              size="small"
              onClick={() => navigate("/mainwarehouse")}
            />
          </div>
          <div style={{ paddingTop: "16px" }}>
            <Card title="AddStock">
              {/* <img
                src={TopBarOverview}
                style={{ width: "100%", height: "auto" }}
              /> */}
              <div className="row justify-content-center gap-4">
                <div className="col-sm-10">
                  <Card title="Product">
                    <DataTable
                      header={header}
                      filters={filters}
                      onFilter={(e) => setFilters(e.filters)}
                      value={productWarehouse}
                      showGridlines
                      stripedRows
                      sortField="UnitInStock"
                      scrollable
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
                      rows={5}
                      // rowsPerPageOptions={[5, 10, 25]}
                      // tableStyle={{
                      //   minWidth: "50rem",
                      //   minHeight: 400,
                      // }}
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
                        style={{ width: "20%" }}
                      ></Column>
                      <Column
                        field="ProductName"
                        header="Ingredient"
                        sortable
                        style={{ width: "30%" }}
                      ></Column>
                      <Column
                        field="UnitInStock"
                        header="Remain"
                        sortable
                        style={{ width: "25%" }}
                      ></Column>
                      <Column
                        field="Discription"
                        header="Discription"
                        // sortable
                        style={{ width: "35%" }}
                      ></Column>
                      <Column
                        field="LastUpdate"
                        header="LastUpdate"
                        sortable
                        sortField="company"
                        style={{ width: "25%" }}
                      ></Column>
                    </DataTable>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </body>
  );
}
