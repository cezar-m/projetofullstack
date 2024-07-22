import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { validacaoNovidade } from "../../components/Validacao.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateNovidades = () => {

	const { id } = useParams();
	const navigate = useNavigate();
	const [novidade, setNovidade] = useState({
		titulo: '',
		descricao: '',
		data_criacao: ''
	});

	useEffect(() => {
		const fetchNovidades = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/novidades/${id}`, { withCredentials: true });
				const data = response.data;
                // Formate a data para AAAA-MM-DD se necessário
                data.data_criacao = new Date(data.data_criacao).toISOString().split('T')[0];
				setNovidade(response.data);				
			} catch (error) {
				console.error("Erro ao buscar a novidade:", error);
			}
		};
		fetchNovidades();
	}, [id]);
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNovidade({ ...novidade, [name]: value });	
	};
	
	const handleSubmit = async(e) => {
		e.preventDefault();
		
		const validaForm = await validacaoNovidade(e, { ...novidade});

		if (validaForm) {
		try {
			
			const response = await axios.put(`http://localhost:5000/novidades/${id}`, novidade, {
				withCredentials: true,  // Adiciona esta linha para enviar cookies de sessão
				headers: {
					"Content-type": "application/json"
				}
			});
			
			if(response.status === 200){
				toast.success("Novidade atualizado com sucesso!");
				setTimeout(() => {
					navigate('/novidades');
				}, 3000);
			} else {
				throw new Error("Erro ao atualizar novidade!");
			}
			} catch(error) {
				toast.error("Erro ao atualizar novidade!");
				console.error("Erro ao atualizar a novidade:", error.response ? error.response.data : error.message);
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
				<h2 className="text-center mt-4">Atualização de Novidades</h2>
				<div className="form-position mt-5">

				<form onSubmit={handleSubmit}>
					<div className="form-group row">
						<label htmlFor="titulo" className="col-sm-2 col-form-label">Titulo</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="titulo" 
								name="titulo"
								placeholder="Titulo" 
								value={novidade.titulo}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="descricao" className="col-sm-2 col-form-label">Descrição</label>
						<div className="col-sm-6">
							<textarea 
								className="form-control mb-2" 
								rows="10"
								id="descricao"
								name="descricao"
								placeholder="Descrição" 
								value={novidade.descricao}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="data_criacao" className="col-sm-2 col-form-label">Data Criação</label>
						<div className="col-sm-6">
							<input 
								type="date" 
								className="form-control mb-2" 
								id="data_criacao" 
								name="data_criacao"
								placeholder="Data de Criação" 
								value={novidade.data_criacao}
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

export default UpdateNovidades;