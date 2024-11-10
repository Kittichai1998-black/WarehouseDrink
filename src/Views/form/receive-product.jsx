import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { httpClient } from "../../axios/HttpClient.jsx";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function ReceiveProductForm({ onToggle, products }) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [warehouse, setWarehouse] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const { state } = useLocation(); // รับ props จากหน้าอื่น
  const [id, setId] = useState(0);
  const product = products
    .filter(
      (product) =>
        product.isActive === "A" &&
        (!selectedWarehouse || product.warehouseId === selectedWarehouse)
    )
    .map((prod) => ({
      id: prod.id,
      label: prod.productName,
      value: prod.productId,
    }));

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setLoading(true);
      const username = localStorage.getItem("userName");
      const dataWithUsername = {
        ...data,
        username: username,
      };
      await httpClient.put(
        "/api/productController/receiveProduct/" + id,
        dataWithUsername
      );
      //   if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        text: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
        customClass: { container: "my-sweetalert-container-class" },
      });
      //   }

      const newStatus = false; //ปิด Dialog
      setIsToggled(newStatus);
      onToggle(newStatus);

      reset();
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถบันทึกข้อมูลได้",
        customClass: { container: "my-sweetalert-container-class" },
      });
    } finally {
      setLoading(false);
    }
  };

  const search = (event) => {
    let query = event.query;
    let _filteredItems = [];

    for (let i = 0; i < product.length; i++) {
      let item = product[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }

    setFilteredItems(_filteredItems);
    // console.log(selectedItem);
  };

  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const response = await httpClient.get(
          "/api/settingController/warehouse"
        );
        const warehouse = response.data.result || response.data;
        const formattedWarehouse = warehouse
          .filter((wh) => wh.isActive === "A")
          .map((wh) => ({
            label: wh.warehouseName,
            value: wh.warehouseId,
          }));
        setWarehouse(formattedWarehouse);
      } catch (error) {
        console.error("Error fetching warehouse:", error);
      }
    };
    getWarehouse();

    console.log(id);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-column md:flex-row gap-1">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">คลังสินค้า</span>
            <Controller
              name="warehouseId"
              control={control}
              rules={{ required: " กรุณาเลือกคลังสินค้า" }}
              render={({ field }) => (
                <Dropdown
                  id="warehouseId"
                  options={warehouse}
                  onChange={(e) => {
                    field.onChange(e.value);
                    setSelectedWarehouse(e.value);
                  }}
                  value={field.value}
                />
              )}
            />
            {errors.warehouse && (
              <small className="p-error">{errors.warehouse.message}</small>
            )}
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">สินค้า</span>
            <Controller
              name="productId"
              control={control}
              rules={{ required: " กรุณาระบุชื่อสินค้า" }}
              render={({ field }) => (
                <AutoComplete
                  id="productId"
                  value={selectedItem}
                  suggestions={filteredItems}
                  completeMethod={search}
                  virtualScrollerOptions={{ itemSize: 38 }}
                  field="label"
                  disabled={!selectedWarehouse}
                  dropdown
                  onChange={(e) => {
                    // console.log(e.value.value);
                    field.onChange(e.value.value);
                    setId(e.value.id);
                    setSelectedItem(e.value);
                  }}

                  //   {...field}
                />
              )}
            />
            {errors.productName && (
              <small className="p-error">{errors.productName.message}</small>
            )}
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">จำนวน</span>
            <Controller
              name="quantity"
              control={control}
              rules={{ required: " กรุณาระบุจำนวนสินค้า" }}
              render={({ field }) => (
                <InputNumber
                  inputId="quantity"
                  //   value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  min={0}
                  max={1000}
                  //   {...field}
                />
              )}
            />
            {errors.quantity && (
              <small className="p-error">{errors.quantity.message}</small>
            )}
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">เหตุผล</span>
            <Controller
              name="reason"
              control={control}
              rules={{ required: " กรุณาระบุเหตุผล" }}
              render={({ field }) => <InputText id="reason" {...field} />}
            />
            {errors.productName && (
              <small className="p-error">{errors.productName.message}</small>
            )}
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">รายละเอียด</span>
            <Controller
              name="remark"
              control={control}
              // rules={{ required: " กรุณาระบุชื่อสินค้า" }}
              render={({ field }) => <InputTextarea id="remark" {...field} />}
            />
            {errors.productName && (
              <small className="p-error">{errors.productName.message}</small>
            )}
          </div>
        </div>

        {/* ปุ่มบันทึก */}
        <div className="col-12">
          <Button
            type="submit"
            label="บันทึก"
            icon="pi pi-check"
            className="mt-2"
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}
