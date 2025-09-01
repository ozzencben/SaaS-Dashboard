import { useContext, useEffect, useRef, useState } from "react";
import { BsListUl } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import Spacer from "../../spacer/Spacer";
import "./TopBarStyles.css";

const TopBar = () => {
  const { user, logout } = useContext(AuthContext);

  const [showSideBar, setShowSideBar] = useState(false);

  const sideBarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const menuItems = [
    { name: "Dashboard", path: "/", roles: ["user", "admin"] },
    { name: "Users", path: "/users", roles: ["admin"] },
    { name: "Products", path: "/products", roles: ["user", "admin"] },
    { name: "Analytics", path: "/analysis", roles: ["admin"] },
    { name: "Orders", path: "/orders", roles: ["user", "admin"] },
  ];

  const handleToggle = () => {
    setShowSideBar((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setShowSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="topbar-container">
      <div className="left-side">
        <div ref={hamburgerRef} onClick={handleToggle}>
          <BsListUl size={26} color="white" className="list-icon" />
        </div>
        <h1 className="title">Dashboard</h1>
      </div>

      <div
        ref={sideBarRef}
        className={`sidebar-container ${showSideBar ? "open" : ""}`}
      >
        <Spacer size={30} />
        <div className="links-container">
          <ul>
            {menuItems.map((item) => {
              if (!item.roles.includes(user.role)) return null;
              return (
                <li key={item.name}>
                  <NavLink to={item.path}>{item.name}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <Spacer size={20} />
        <div className="line"></div>
        <Spacer size={20} />
        <ul>
          <li onClick={logout} style={{ cursor: "pointer" }}>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
