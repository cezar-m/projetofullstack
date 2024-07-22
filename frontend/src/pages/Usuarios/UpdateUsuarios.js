import React, {useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { validacaoForm } from "../../components/Validacao.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./../../assets/css/styles.css";

const UpdateUsuarios = () => {
    
	const { id } = useParams();
	const navigate = useNavigate();
	const [usuario, setUsuario] = useState({
		nome: '',
		email: '',
		senha: '',
		acesso: '',
	});
	
	useEffect(() => {
		const fetchUsuario = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/usuarios/${id}`, { withCredentials: true });
				setUsuario(response.data);
			} catch (error) {
				console.error("Erro ao buscar usuário:", error);
			}
		};
		
		fetchUsuario();
	}, [id]);
	
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUsuario({ ...usuario, [name]: value });	
	};
	
	const handleSubmit = async(e) => {
		e.preventDefault();
		  
		const { nome, email, senha, acesso, emailRegex } = usuario;
		const validaForm = await validacaoForm(e, { nome, email, senha, acesso });
		
		if(validaForm) {
			try {
				const response = await axios.put(`http://localhost:5000/usuarios/${id}`, usuario, {
					withCredentials: true,
				});
				
				if(response.status === 200) {
					toast.success("Usuário atualizado com sucesso!");
					setTimeout(() => {
						navigate('/usuarios');
					}, 3000);
				} else {
					throw new Error("Erro ao atualizar usuário!");
				}
			} catch(error) {
				if(error.response) {
					//O servidor respondeu com um status diferente de 2xx
					toast.error(`Erro ao atualizar o usuário: ${error.response.data.message}`);
					console.error("Erro ao Atualizar o usuário:", error.response.data);
				} else {
					//Algo aconteceu na configuração da solicitação
					toast.error(`Erro ao atualizar usuário: ${error.message}`);
					console.error("Erro ao atualizar o usuário:", error.message);
				}
			}
		}
	}
	
	
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
				<h2 className="text-center mt-4">Atualização de Usuarios</h2>
				<div className="form-position mt-5">

				<form onSubmit={handleSubmit}>
					<div className="form-group row">
						<label htmlFor="nome" className="col-sm-2 col-form-label">Nome</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="nome" 
								name="nome"
								placeholder="Nome" 
								value={usuario.nome}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="email" className="col-sm-2 col-form-label">E-mail</label>
						<div className="col-sm-6">
							<input 
								type="email" 
								className="form-control mb-2" 
								id="email"
								name="email"
								placeholder="Email" 
								value={usuario.email}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="senha" className="col-sm-2 col-form-label">senha</label>
						<div className="col-sm-6">
							<input 
								type="password" 
								className="form-control mb-2" 
								id="senha" 
								name="senha"
								placeholder="senha" 
								value={usuario.senha}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="acesso" className="col-sm-2 col-form-label">Acesso</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="acesso" 
								name="acesso"
								placeholder="acesso" 
								value={usuario.acesso}
								onChange={handleChange}
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Atualizar</button>
				</form>
				<ToastContainer autoClose={3000} position="bottom-left" />
				</div>
			</main>
		</div>
    </div>
	)
}

export default UpdateUsuarios