import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { httpClient } from "../../axios/HttpClient.jsx";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function IssueProductForm({ onToggle, items, onSave }) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: items.id,
      warehouseId: items.warehouseId,
      productId: items.productId,
      stockInWarehouse: items.stockInWarehouse,
    },
  });

  const [warehouse, setWarehouse] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setLoading(true);
      const username = localStorage.getItem("userName");
      const dataProduct = {
        ...data,
        warehouseId: items.warehouseId,
        username: username,
      };
      await httpClient.put(
        "/api/productController/issueProduct/" + items.id,
        dataProduct
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

      if (onSave) onSave();

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

    // console.log(products);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-column md:flex-row gap-1">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">เหลือคงคลัง</span>
            <Controller
              name="stockInWarehouse"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <InputNumber
                  id="stockInWarehouse"
                  value={field.value}
                  disabled={true}
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
            <span className="p-inputgroup-addon">จำนวนที่ต้องการเบิก</span>
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
                  max={items.stockInWarehouse}
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
