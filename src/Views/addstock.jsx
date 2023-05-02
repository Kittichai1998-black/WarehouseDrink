import React, { useState } from 'react';
import '../css/table.css';

function AddStock() {
  const [data, setData] = useState([
    { id: 1, firstname: 'John', lastname: 'Doe', address: '123 Main St', phonenumber: '555-555-5555' },
    { id: 2, firstname: 'Jane', lastname: 'Smith', address: '456 Oak St', phonenumber: '555-123-4567' },
    { id: 3, firstname: 'Bob', lastname: 'Johnson', address: '789 Maple Ave', phonenumber: '555-987-6543' }
  ]);

  const handleEdit = (id) => {
    // สำหรับการแก้ไขข้อมูล
  };

  const handleDelete = (id) => {
    // ใสำหรับการลบข้อมูล
  };

  return (
    <div>
    <button onClick={() => handleEdit(row.id)}>Add Stock</button>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.firstname}</td>
            <td>{row.lastname}</td>
            <td>{row.address}</td>
            <td>{row.phonenumber}</td>
            <td>
              <button onClick={() => handleEdit(row.id)}>Edit</button>
              <button onClick={() => handleDelete(row.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default AddStock;