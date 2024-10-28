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
import Swal from "sweetalert2";

import { httpClient } from "../axios/HttpClient.jsx";
import dayjs from "dayjs";

import "../css/table.css";

export default function AddStock() {
  const navigate = useNavigate();
  const mainPage = localStorage.getItem("mainPage");
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [branch, setBranch] = useState("WareHouse");
  const [productDescription, setProductDescription] = useState("");
  const [maximumUnits, setMaximumUnits] = useState("");
  const [minimumUnits, setMinimumUnits] = useState("");
  const [unitsPrice, setUnitsPrice] = useState("");
  const [unitsInStock, setUnitsInStock] = useState("");
  const [unitsOnOrder, setUnitsOnOrder] = useState("");
  const [type, setType] = useState("");
  const [day, setDay] = useState("");
  const [updateBy, setupdateBy] = useState(localStorage.getItem("userName"));

  const [countItem, setCountItem] = useState(0);
  const [Item, setItem] = useState("");
  const [dialogAdd, setDialogAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const [metaKey, setMetaKey] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getProduct = async () => {
    const response = await httpClient.get("/api/" + mainPage);
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
    UpdateBy: product[key].UpdateBy,
  }));

  function incrementValue(value) {
    const numericPart = parseInt(value.slice(1));
    const incrementedValue = 'w' + (numericPart + 1).toString().padStart(4, '0');
    return incrementedValue;
  }

  // const AddProduct = async () => {
  //   const objectsArray = Object.values(tableData);
  //   const lastObject = objectsArray[objectsArray.length - 1];
  //   const runID = incrementValue(lastObject.ID);
  //   if (
  //     productID === "" ||
  //     productName === "" ||
  //     branch === "" ||
  //     productDescription === "" ||
  //     maximumUnits === "" ||
  //     minimumUnits === "" ||
  //     unitsPrice === "" ||
  //     unitsInStock === "" ||
  //     unitsOnOrder === "" ||
  //     type === "" ||
  //     day === "" ||
  //     updateBy === ""
  //   ) {
  //     console.log(runID)
  //     Swal.fire({
  //       title: "โปรดกรอกข้อมูลทั้งหมดให้ครบถ้วน",
  //       customClass: { container: "my-sweetalert-container-class" },
  //     });
  //     return;
  //   }

  //   Swal.fire({
  //     title: "Do you want to save?",
  //     customClass: { container: "my-sweetalert-container-class" },
  //     showCancelButton: true,
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Save",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       httpClient
  //         .post("/api/"+mainPage, {
  //           ID: runID,
  //           productID: productID,
  //           productName: productName,
  //           branch: branch,
  //           productDescription: productDescription,
  //           maximumUnits: maximumUnits,
  //           minimumUnits: minimumUnits,
  //           unitsPrice: unitsPrice,
  //           unitsInStock: unitsInStock,
  //           unitsOnOrder: unitsOnOrder,
  //           type: type,
  //           day: day,
  //           updateBy: updateBy,
  //         })
  //         .then(function (response) {
  //           console.log(response);
  //           if (response.data.message !== "success") {
  //             setDialogAdd(false);
  //             getProduct();
  //             return Swal.fire({
  //               customClass: { container: "my-sweetalert-container-class" },
  //               title: "Error!",
  //               text: response.data.message,
  //               icon: "error",
  //               confirmButtonText: "OK",
  //             });
  //           } else {
  //             Swal.fire("Save Success");
  //             getProduct();
  //           }
  //         })
  //         .catch(function (error) {
  //           setDialogAdd(false);
  //           Swal.fire({
  //             title: "Error!",
  //             text: error,
  //             icon: "error",
  //             confirmButtonText: "OK",
  //           });
  //           getProduct();
  //         });
  //     }
  //   });
  // };

  // const updateProduct = async () => {
  //   // console.log(Item)
  //   Swal.fire({
  //     title: "Are you sure?",
  //     customClass: { container: "my-sweetalert-container-class" },
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .put("/api/" + mainPage, {
  //           ID: Item.ID,
  //           UnitInStock: countItem,
  //           UpdateBy: updateBy,
  //         })
  //         .then((res) => {
  //           if (res.data.message !== "success") {
  //             Swal.fire(res.data.message, "Error");
  //             setVisible(false);
  //             getProduct();
  //           } else {
  //             Swal.fire("Update Success", "success");
  //             setVisible(false);
  //             getProduct();
  //           }
  //         });
  //     }
  //   });
  // };

  // const DeleteProduct = async (data) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .delete("/api/"+ mainPage, {
  //           ID: data.ProductID,
  //         })
  //         .then((res) => {
  //           if (res.data.message !== "success") {
  //             Swal.fire(res.data.message, "Error");
  //             getProduct();
  //           } else {
  //             Swal.fire("Deleted!", "success");
  //             getProduct();
  //           }
  //         });
  //     }
  //   });
  // };

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
        <Button
          label="Add Product"
          size="small"
          severity="success"
          icon="pi pi-plus"
          rounded
          onClick={() => setDialogAdd(true)}
        />
      </div>
    );
  };

  function labelItemName(data) {
    setVisible(true);
    setItem(data);
  }

  const formatDate = (date) => {
    return dayjs(date.LastUpdate).format("DD-MM-YYYY");
  };

  const actionEdit = (data) => {
    return (
      <div className="row">
        <div className="col-sm-5">
          <Button
            icon="pi pi-pencil"
            severity="warning"
            aria-label="Add"
            size="small"
            onClick={() => labelItemName(data)}
          />
        </div>
        <div className="col-sm-5">
          <Button
            icon="pi pi-trash"
            severity="danger"
            aria-label="Add"
            size="small"
            onClick={() => DeleteProduct(data)}
          />
        </div>
      </div>
    );
  };

  const footerAdd = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="danger"
        size="small"
        onClick={() => setDialogAdd(false)}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        severity="info"
        size="small"
        onClick={() => AddProduct()}
      />
    </div>
  );

  const footerUpdate = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="danger"
        size="small"
        onClick={() => setVisible(false)}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        severity="info"
        size="small"
        onClick={() => updateProduct()}
      />
    </div>
  );

  const header = renderHeader();

  return (
    <div className="layout-page">
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
          <Card title="Setting">
            <div className="row justify-content-center gap-4">
              <div className="col-sm-12">
                <h2 className="flex justify-content-center">
                  ****** Wait NewFeatures ******
                </h2>
                {/* <Card title="Product">
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
                    // rowClassName={rowClass}
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
                      field="Day"
                      header="Day"
                      sortable
                      style={{ width: "10%" }}
                    ></Column>
                    <Column
                      field="LastUpdate"
                      header="LastUpdate"
                      sortable
                      body={(data, options) => formatDate(data)}
                      style={{ width: "20%" }}
                    ></Column>
                    <Column
                      // headerStyle={{ width: "4rem" }}
                      style={{ width: "10%" }}
                      body={(data) => actionEdit(data)}
                    ></Column>
                  </DataTable>
                </Card> */}
              </div>
            </div>
          </Card>
        </div>
        <Dialog
          header="Add Product"
          visible={dialogAdd}
          onHide={() => setDialogAdd(false)}
          style={{ width: "70vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          footer={footerAdd}
        >
          <div className="card flex flex-wrap gap-2 p-fluid">
            <div className="row">
              <div className="col-sm 6">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">ProductID</span>
                  <InputNumber placeholder="" onChange={(e)=>setProductID(e.target.value)}/>
                </div>
              </div>
              <div className="col-sm 6">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">ProductName</span>
                  <InputText placeholder="" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm 6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">ProductDescription</span>
                  <InputText placeholder="" onChange={(e)=>setProductDescription(e.target.value)}/>
                </div>
              </div>
              <div className="col-sm 6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">MaximumUnits</span>
                  <InputNumber placeholder="" onChange={(e)=>setMaximumUnits(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm 6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">MinimumUnits</span>
                  <InputNumber placeholder="" onChange={(e)=>setMinimumUnits(e.target.value)}/>
                </div>
              </div>
              <div className="col-sm 6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">UnitsPrice</span>
                  <InputNumber placeholder="" onChange={(e)=>setUnitsPrice(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm 6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">UnitsInStock</span>
                  <InputNumber placeholder="" onChange={(e)=>setUnitsInStock(e.target.value)}/>
                </div>
              </div>
              <div className="col-sm 6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">UnitsOnOrder</span>
                  <InputNumber placeholder="" onChange={(e)=>setUnitsOnOrder(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm 6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">Type</span>
                  <InputText placeholder="" onChange={(e)=>setType(e.target.value)}/>
                </div>
              </div>
              <div className="col-sm 6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">Day</span>
                  <InputNumber placeholder="" onChange={(e)=>setDay(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          header="Edit"
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ width: "35vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          footer={footerUpdate}
        >
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon" style={{ width: "20rem" }}>
              {Item.ProductName}
            </span>
            {/* <label htmlFor="minmax-buttons" className="font-bold block mb-2">Min-Max Boundaries</label> */}
            <InputNumber
              value={Item.Day}
              style={{ width: "1rem" }}
              onValueChange={(e) => setCountItem(e.value)}
            />
            <span className="p-inputgroup-addon" style={{ width: "1rem" }}>
              Day
            </span>
          </div>
        </Dialog>
    </div>
    // </body>
  );
}
