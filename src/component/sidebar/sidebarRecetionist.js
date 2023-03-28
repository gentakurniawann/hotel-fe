import React, { useState } from "react";
import Media from "../media/media";
import { Link } from "react-router-dom";
import "./styles.css";
export default function SidebarReceptionist(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? "active" : "";
  };

  const logout = () => {
    localStorage.clear();
    window.location = "/login";
  };
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <Media value image="icon-dashboard.svg" alt="icon-dashboard.svg" />,
    },
    {
      path: "/customer",
      name: "Customer",
      icon: <Media value image="icon-customer.svg" alt="icon-customer.svg" />,
    },
    {
      path: "/transaction",
      name: "Transaction",
      icon: (
        <Media value image="icon-transaction.svg" alt="icon-transaction.svg" />
      ),
    },
  ];

  return (
    <div className="sidebar" style={{ width: isOpen ? "240px" : "80px" }}>
      <div className="sidebar-header d-flex align-items-center justify-content-between">
        <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
          <Media
            value
            image="logo-hotel-white.svg"
            alt="logo-hotel-white.svg"
          />
        </div>
        <div className="bars" onClick={toggle}>
          <Media value image="icon-menu.svg" alt="icon-menu.svg" />
        </div>
      </div>
      <div className="sidebar-content">
        {menuItem.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`link d-flex align-items-center`}
          >
            <div className="icon">{item.icon}</div>
            <div
              className="link_text"
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="logout d-flex align-items-center" onClick={logout}>
          <Media
            value
            image="icon-logout.svg"
            alt="icon-logout.svg"
            className="icon"
          />
          <p style={{ display: isOpen ? "block" : "none" }}>Logout</p>
        </div>
      </div>
    </div>
  );
}
