import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../../assets/css/styles.css";
import { FaTrash, FaEdit } from "react-icons/fa"; 

const Usuarios = () => {
	const [usuarios, setUsuarios] = useState([]);
	
	useEffect(() => {
		const fetchUsuarios = async () => {
			try {
				const response = await axios.get("http://localhost:5000/usuarios");
				setUsuarios(response.data);
			} catch (error) {
				console.error("Erro ao buscar usuario:", error);
			}
		};
		
		fetchUsuarios();
	}, []);
	
	const deletarUsuario = async(id) => {
		try {
			await axios.delete(`http://localhost:5000/usuarios/${id}`);
			toast.success("Usuário deletado com sucesso!!!");
			// Remove o usuario da lista deleta usuario
			 setUsuarios((usuarios) => usuarios.filter((usuario) => usuario.id !== id));
		} catch (error) {
			console.error("Erro ao deletar usuario:", error);
			toast.error("Erro ao deletar usuário!");
		}
	};
  
	return(
		<div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#ffffff' }}>
			{/* Header */}
			<header>
				<Navbar />
			</header>
			{/* Body */}
			<div className="d-flex flex-grow-1">
				{/* Sidebar */}
				<aside className="sidebar">
					<Sidebar />
				</aside>
				{/* Main Content */}
				<main className="flex-grow-1 p-3">
					<div>
						<h2>Lista de Usuários</h2>
						<div className="container d-flex justify-content-center">
							<table className="table table-light mt-4">
								<thead>
									<tr>
										<th scope="col">Nome</th>
										<th scope="col">E-mail</th>
										<th scope="col">Acesso</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>	   
								{usuarios.map((usuario, i) => (
									<tr key={i}>
										<td width="20%">{usuario.nome}</td>
										<td width="20%">{usuario.email}</td>
										<td width="20%">{usuario.acesso}</td>
										<td width="5%">
											<Link to={`/usuarios/update/${usuario.id}`}><FaEdit /></Link>
										</td>
										<td width="5%">
											<FaTrash onClick={() => deletarUsuario(usuario.id)} />
										</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
						<ToastContainer autoClose={3000} position="bottom-left" />
					</div>
				</main>
			</div>
		</div>
	);
}

export default Usuarios;