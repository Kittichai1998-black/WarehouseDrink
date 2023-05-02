import { useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from '../Components/navbar';
import '../css/home.css'
// import '../index.css/'
import InventoryIcon from '../assets/icons/inventory.svg';
import LocalIcon from '../assets/icons/local_shipping.svg';
import StoreIcon from '../assets/icons/store.svg';
import SettingIcon from '../assets/icons/settings.svg';

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header>
        {/* <h1>Welcom To Dev</h1> */}
        <div class='contaier text-center'>
          <div class='row'>
            <div class="col-sm-4 mb-2 mb-sm-0">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">title 1</h5>
                  <p>description</p>
                </div>
              </div>
            </div>
            <div class="col-sm-4 mb-2 mb-sm-0">
              <div class="card ">
                <div class="card-body">
                  <h5 class="card-title">title 2</h5>
                  <p>description</p>
                </div>
              </div>
            </div> <div class="col-sm-4 mb-2 mb-sm-0">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">title 3</h5>
                  <p>description</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="tabmenu">
        <div class="row">
          <div class="col-sm-3 rowbox-items">
            <a href="/overview" style={{ textDecoration: 'none' }}>
              <img src={StoreIcon} />
              <h4 style={{ color: '#65647C', textDecoration: 'none' }}>Overview</h4>
            </a>
          </div>
          <div class="col-sm-3 rowbox-items">
            <a href="/addstock" style={{ textDecoration: 'none' }}>
              <img src={LocalIcon} />
              <h4 style={{ color: '#65647C' }}>Add Stock</h4>
            </a>
          </div>
          <div class="col-sm-3 rowbox-items">
            <a href="/checkstock" style={{ textDecoration: 'none' }}>
              <img src={InventoryIcon} />
              <h4 style={{ color: '#65647C' }}>Check Stock</h4>
            </a>
          </div>
          <div class="col-sm-3 rowbox-items">
            <a href="/login" style={{ textDecoration: 'none' }}>
              <img src={SettingIcon} />
              <h4 style={{ color: '#65647C' }}>Setting</h4>
            </a>
          </div>
        </div>
      </div>
      {/* <footer>
          <h6>
            &copy; 2023
          </h6>
        </footer> */}

    </div>
  )
}

export default Home
