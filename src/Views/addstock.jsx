import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { Card } from "primereact/card";

import { ProductService } from "../Service/ProductService";
import "../css/table.css";

import TopBarAddStock from "../assets/imgs/topbar/topbar-addstock.png";

export default function AddStock() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [metaKey, setMetaKey] = useState(true);

  useEffect(() => {
    ProductService.getCustomersMedium().then((data) => setCustomers(data));
  }, []);

  return (
    <div className="body-page">
      <div className="container">
        <div className="card">
          <div className="align-items-left">
            <Button label="Back" icon="pi pi-angle-left" severity="info" onClick={() => navigate("/mainwarehouse")}/>
          </div>
          <div className="card-body">
            <div>
              <img
                src={TopBarAddStock}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="row justify-content-center gap-3">
              <div className="col-sm-5">
                <Card title="Main Ingredient">
                  <DataTable
                    value={customers}
                    scrollable
                    scrollHeight="auto"
                    size="small"
                    selectionMode="single"
                    selection={selectedIngredient}
                    onSelectionChange={(e) => setSelectedIngredient(e.value)}
                    dataKey="id"
                    metaKeySelection={metaKey}
                    rowHover
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: "50rem", minHeight: 400 }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  >
                    <Column
                      header="No."
                      headerStyle={{ width: "5%" }}
                      body={(data, options) => options.rowIndex + 1}
                    ></Column>
                    <Column
                      field="country.name"
                      header="Ingredient"
                      sortable
                      style={{ width: "30%" }}
                    ></Column>
                    <Column
                      field="company"
                      header="Remain"
                      sortable
                      style={{ width: "25%" }}
                    ></Column>
                    <Column
                      field="company"
                      header="%"
                      sortable
                      style={{ width: "25%" }}
                    ></Column>
                    <Column
                      field="company"
                      header="LastUpdate"
                      sortable
                      sortField="company"
                      style={{ width: "25%" }}
                    ></Column>
                  </DataTable>
                </Card>
              </div>
              <div className="col-sm-5">
                <Card title="Topping">
                  <DataTable
                    value={customers}
                    scrollable
                    scrollHeight="auto"
                    size="small"
                    selectionMode="single"
                    selection={selectedTopping}
                    onSelectionChange={(e) => setSelectedTopping(e.value)}
                    dataKey="id"
                    metaKeySelection={metaKey}
                    rowHover
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: "50rem", minHeight: 400 }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  >
                    <Column
                      header="No."
                      headerStyle={{ width: "5%" }}
                      body={(data, options) => options.rowIndex + 1}
                    ></Column>
                    <Column
                      field="country.name"
                      header="Ingredient"
                      sortable
                      style={{ width: "30%" }}
                    ></Column>
                    <Column
                      field="company"
                      header="Remain"
                      sortable
                      style={{ width: "25%" }}
                    ></Column>
                    <Column
                      field="company"
                      header="%"
                      sortable
                      style={{ width: "25%" }}
                    ></Column>
                    <Column
                      field="company"
                      header="LastUpdate"
                      sortable
                      sortField="company"
                      style={{ width: "25%" }}
                    ></Column>
                  </DataTable>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
