import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../Service/ProductService';

export default function BasicDemo() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);

    return (
        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                {/* <Column field="code" header="วันที่"></Column> */}
                <Column field="code" header="รหัสสินค้า"></Column>
                <Column field="name" header="ชื่อสินค้า"></Column>
                {/* <Column field="warehouse" header="Warehouse"></Column> */}
                <Column field="category" header="หมวดหมู่"></Column>
                <Column field="quantity" header="จำนวนคงเหลือ"></Column>

            </DataTable>
        </div>
    );
}