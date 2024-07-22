import React from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BotaoDeslogar from "../../components/Botoes/BotaoDeslogar.js";
import logo from "../../assets/img/logo.png";

const Navbar = () => {	
	return (
		<nav className="navbar navbar-expand-lg navbar-light #fff">
			<Link to="/dashboard" className="navbar-brand ms-3"><img src={logo} width="112" height="28" alt="logo" /></Link>	
		    <div className="ms-auto">
				<BotaoDeslogar />
			</div>
		</nav>
	)
}

export default Navbar;