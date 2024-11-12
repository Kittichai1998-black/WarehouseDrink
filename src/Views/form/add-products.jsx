import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useForm, Controller } from "react-hook-form";
import { httpClient } from "../../axios/HttpClient.jsx";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function AddProductForm({ onToggle, onSave }) {
  const [loading, setLoading] = useState(false); 
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isToggled, setIsToggled] = useState(false);
  const [category, setCategory] = useState([]);
  const [warehouse, setWarehouse] = useState([]);

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setLoading(true);
      const response = await httpClient.post(
        "/api/productController/product",
        data
      );
      console.log("Response:", response.data);

      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        text: "ข้อมูลสินค้าถูกบันทึกเรียบร้อยแล้ว",
        customClass: { container: "my-sweetalert-container-class" },
      });

      const newStatus = false; //ปิด Dialog
      setIsToggled(newStatus);
      onToggle(newStatus);
      if (onSave) onSave();
      reset();
    } catch (error) {
      // console.error("Error:", error); F

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถบันทึกข้อมูลสินค้าได้",
        customClass: { container: "my-sweetalert-container-class" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await httpClient.get(
          "/api/settingController/category"
        );
        const categories = response.data.result || response.data;
        const formattedCategories = categories
          .filter((cat) => cat.isActive === "A")
          .map((cat) => ({
            label: cat.categoryName,
            value: cat.categoryId,
          }));
        setCategory(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategory();

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
  }, []);

  return (
    <div className="card flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div className="sm:col-12 md:col-12 lg:col-3">
            <label htmlFor="productName">ชื่อสินค้า</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-3">
            <Controller
              name="productName"
              control={control}
              rules={{ required: " กรุณาระบุชื่อสินค้า" }}
              render={({ field }) => <InputText id="productName" {...field} />}
            />
            {errors.productName && (
              <small className="p-error">{errors.productName.message}</small>
            )}
          </div>

          {/* รายละเอียด */}
          <div className="sm:col-12 md:col-12 lg:col-3">
            <label htmlFor="description">รายละเอียด</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-3">
            <Controller
              name="description"
              control={control}
              rules={{ required: " กรุณาระบุรายละเอียด" }}
              render={({ field }) => <InputText id="description" {...field} />}
            />
            {errors.productName && (
              <small className="p-error">{errors.productName.message}</small>
            )}
          </div>

          {/* หมวดหมู่สินค้า */}
          <div className="sm:col-12 md:col-12 lg:col-3">
            <label htmlFor="category">หมวดหมู่สินค้า</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-3">
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: " กรุณาเลือกหมวดหมู่สินค้า" }}
              render={({ field }) => (
                <Dropdown
                  id="categoryId"
                  options={category}
                  optionLabel="label"
                  optionValue="value"
                  placeholder="เลือกหมวดหมู่"
                  {...field}
                />
              )}
            />
            {errors.category && (
              <small className="p-error">{errors.category.message}</small>
            )}
          </div>

          {/* คลัง */}
          <div className="sm:col-12 md:col-12 lg:col-3">
            <label htmlFor="category">คลังสินค้า</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-3">
            <Controller
              name="warehouseId"
              control={control}
              rules={{ required: " กรุณาเลือกคลังสินค้า" }}
              render={({ field }) => (
                <Dropdown id="warehouseId" options={warehouse} {...field} />
              )}
            />
            {errors.warehouse && (
              <small className="p-error">{errors.warehouse.message}</small>
            )}
          </div>

          {/* สต็อกในคลัง */}
          <div className="sm:col-12 md:col-12 lg:col-3">
            <label htmlFor="stockInWarehouse">จำนวนในคลังสินค้า</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-3">
            <Controller
              name="stockInWarehouse"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <InputNumber
                  id="stockInWarehouse"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  mode="decimal"
                  min={0}
                />
              )}
            />
            {errors.stockInWarehouse && (
              <small className="p-error">
                {errors.stockInWarehouse.message}
              </small>
            )}
          </div>
          {/* Reorder Point */}
          <div className="sm:col-12 md:col-12 lg:col-3">
            <label htmlFor="reorderPoint">
              จุดสั่งซื้อใหม่ (Reorder Point)
            </label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-3">
            <Controller
              name="reorderPoint"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <InputNumber
                  id="reorderPoint"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  mode="decimal"
                  min={0}
                />
              )}
            />
            {errors.reorderPoint && (
              <small className="p-error">{errors.reorderPoint.message}</small>
            )}
          </div>

          {/* วันหมดอายุ */}
          <div className="sm:col-12 md:col-12 lg:col-3">
            <label htmlFor="expirationDate">วันหมดอายุ</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-3">
            <Controller
              name="expirationDate"
              control={control}
              rules={{ required: " กรุณาระบุวันหมดอายุ" }}
              render={({ field }) => (
                <Calendar
                  id="expirationDate"
                  {...field}
                  dateFormat="dd/mm/yy"
                  showIcon
                />
              )}
            />
            {errors.expirationDate && (
              <small className="p-error">{errors.expirationDate.message}</small>
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
