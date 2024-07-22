import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from "./UserContext.js";

const Sidebar = () => {
	const navigate = useNavigate();
	const { user } = useUser();
	
	return (
		<div className="d-flex flex-column p-3">
			<h5 className="mb-4">Menu</h5>
			<ul className="nav flex-column">
				<li className="nav-item">
					<Link to="/dashboard"  className="nav-link link-dark">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/produtos" className="nav-link link-dark">
						Produtos
					</Link>
				</li>
				{user && user.acesso === 'admin' && ( // Renderize o link "Usuários" apenas se o usuário for admin
					<li className="nav-item">
						<Link to="/usuarios" className="nav-link link-dark">
							Usuarios
						</Link>
					</li>
				)}
				<li className="nav-item">
					<Link to="/novidades" className="nav-link link-dark">
						Novidades
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default Sidebar;