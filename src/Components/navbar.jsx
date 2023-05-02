import React from 'react';

function Navbar() {
  return (
    <div>

      <div class="row">
        <div class="navbar">
          <div class="col-12 col-md-10">
            <div class="logo">
              <a href="" style={{ color: "#fff", textDecoration: "none" }}>WareHouseStockDrink</a>
            </div>
          </div>
          <div class="col-6 col-md-2">
            <div class="nav-text-user">
              <p>username : logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;