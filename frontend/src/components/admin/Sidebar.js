import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar-wrapper pb-4">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-window-maximize" aria-hidden="true"></i> Dashboard
            </Link>
          </li>

          <li>
          <Dropdown className=".bg-transparent d-inline">
            <Dropdown.Toggle  className="dropdown-toggle text-white" variant="outlined" id="dropdown-basic">
            <i className="fa fa-cubes" aria-hidden="true"></i> Products
            </Dropdown.Toggle>
  
            <Dropdown.Menu className="bg-dark text-white">
                <Dropdown.Item href="/admin/products"><i className="fa fa-clipboard"></i> All</Dropdown.Item>
                <Dropdown.Item href="/admin/product"> <i className="fa fa-plus"></i> Create</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/comingsoon">
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
