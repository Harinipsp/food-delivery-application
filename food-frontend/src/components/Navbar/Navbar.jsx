import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const location = useLocation(); 
  const [menu, setMenu] = useState(location.pathname.replace("/", "") || "home"); // Set active based on current route
  const {getTotalCartAmount,token,setToken}=useContext(StoreContext)
  const navigate = useNavigate();
  const logout = ()=>{
     localStorage.removeItem("token")
     setToken("");
     navigate("/")
  }
  return (
    <div className='navbar'>
      <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className='navbar-menu'>
      
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          <Link to="/menu">Menu</Link>
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          <Link to="/mobile-app">Mobile App</Link>
        </li>
        <a href="#footer"><li
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </li></a>
        
        
      </ul>
      <div className='navbar-right'>
        {/* <img src={assets.search_icon} alt='search' /> */}
        <div className='navbar-search-icon'>
          <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
          <div className= {getTotalCartAmount()===0?"": "dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
        : <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" />Orders</li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
          </ul>
          </div>
          }
        
      </div>
    </div>
  );
};

export default Navbar;
