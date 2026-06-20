import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import search_icon from "../../assets/procurar.png";
import logo_icon from "../../assets/capacete-de-construcao.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo_icon} alt="" className="logo" />
      <ul>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/registrar">Registrar</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder="Pesquisar..." />
        <img src={search_icon} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
