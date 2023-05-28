import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";

import { httpClient } from "../axios/HttpClient.jsx";
import dayjs from "dayjs";

import "../css/table.css";

// import TopBarOverview from "../assets/imgs/topbar/topbar-overview.png";

export default function AddStock() {
  const navigate = useNavigate();
  const mainPage = localStorage.getItem("mainPage")
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [countItem, setCountItem] = useState(0);
  const [Item, setItem] = useState("");
  const [visible, setVisible] = useState(false);
  const [metaKey, setMetaKey] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
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

  const updateProduct = async () => {
    // console.log(Item)
    Swal.fire({
      title: "Are you sure?",
      customClass: { container: "my-sweetalert-container-class" },
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("/api/"+mainPage+"/addstock", {
            ID: Item.ID,
            UnitsInStock: countItem,
            UpdateBy: updateBy
          })
          .then((res) => {
            if (res.data.message !== "success") {
              Swal.fire(res.data.message, "Error");
              setVisible(false);
              getProduct();
            } else {
              Swal.fire("Update Success", "success");
              setVisible(false);
              getProduct();
            }
          });
      }
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const rowClass = (data) => {
    return {
      "bg-red-400": data.UnitsInStock < 10,
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
      </div>
    );
  };

  function labelItemName (data) {
    setVisible(true)
    setItem(data)
  }

  const formatDate = (date) => {
    return (
      dayjs(date.LastUpdate).format('DD-MM-YYYY')
    )
  } 

  const actionAdd = (data) => {
    return (
      <Button
        icon="pi pi-pencil"
        severity="warning"
        aria-label="Add"
        size="small"
        onClick={() => labelItemName(data)}
      />
    );
  };

  const footerContent = (
    <div>
        <Button label="Cancel" icon="pi pi-times" severity="danger" size="small" onClick={() => setVisible(false)}/>
        <Button label="Save" icon="pi pi-check" severity="info" size="small" onClick={() => updateProduct()}/>
    </div>
);

  const header = renderHeader();

  return (
    // <body>
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
              <div className="row justify-content-center gap-4">
                <div className="col-sm-10">
                  <Card title="Product">
                    <DataTable
                      header={header}
                      filters={filters}
                      onFilter={(e) => setFilters(e.filters)}
                      value={tableData}
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
                        field="UnitsInStock"
                        header="Remain"
                        sortable
                        style={{ width: "25%" }}
                      ></Column>
                      <Column
                        field="LastUpdate"
                        header="LastUpdate"
                        sortable
                        body={(data, options) => formatDate(data)}
                        style={{ width: "25%" }}
                      ></Column>
                      <Column
                        headerStyle={{ width: "4rem" }}
                        body={(data) => actionAdd(data)}
                      ></Column>
                    </DataTable>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
          <Dialog
            header="Add Stock"
            visible={visible}
            onHide={() => setVisible(false)}
            style={{ width: "35vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            footer={footerContent}
          >
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon" style={{width:"20rem"}}>Remain</span>
              {/* <label htmlFor="minmax-buttons" className="font-bold block mb-2">Min-Max Boundaries</label> */}
              <InputNumber
                inputId="minmax-buttons"
                value={countItem}
                onValueChange={(e) => setCountItem(e.value)}
                mode="decimal"
                
                showButtons
                min={0}
                max={100}
              />
            </div>
          </Dialog>
        </div>
      </div>
    // </body>
  );
}
