import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { validacaoNovidade } from "../../components/Validacao.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadastrarNovidades = () => {
	
	const [titulo, setTitulo] = useState(''); 	
	const [descricao, setDescricao] = useState('');
	const [data_criacao, setDataCriacao] = useState('');
	const navigate = useNavigate();
	
	const cadastroNovidades = async (event) => {
		event.preventDefault();
		
		const validaForm = await validacaoNovidade(event, {titulo, descricao, data_criacao });
		
		if(validaForm) {
			const formData = new FormData();
			formData.append('titulo', titulo);
			formData.append('descricao', descricao);
			formData.append('data_criacao', data_criacao);
			
			try {
				const response = await axios.post('http://localhost:5000/novidades', formData, {
					withCredentials: true, // Certifique-se de enviar cookies de sessão
						headers: {
							'Content-type': 'application/json',
						}
				});
				
				if(response.status === 200) {
					toast.success("Novidade cadastrado com sucesso!!!", {
						position: "bottom-left"
					});
					setTitulo('');
					setDescricao('');
					setDataCriacao('');
					setTimeout(() => {
						navigate('/novidades');// Redirecionar para a lista de usuaris após o cadastro

					}, 3000); // Atraso de 3 segundos
				} else {
					toast.error("Erro ao fazer o cadastro!!!", {
						position: "bottom-left"
					});
				}
			} catch (error) {
				console.log("Erro ao se comunicar com o servidor.", error);
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
				<h2 className="text-center">Novidades</h2>
				<div className="form-position mt-5">

				<form onSubmit={cadastroNovidades}>
					<div className="form-group row">
						<label htmlFor="titulo" className="col-sm-2 col-form-label">Titulo</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="titulo" 
								placeholder="Titulo" 
								value={titulo}
								onChange={(e) => setTitulo(e.target.value)}
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
								placeholder="Descrição" 
								value={descricao}
								onChange={(e) => setDescricao(e.target.value)}
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
								placeholder="data criação" 
								value={data_criacao}
								onChange={(e) => setDataCriacao(e.target.value)}
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Cadastrar</button>
				</form>
				</div>
			</main>
		</div>
		<ToastContainer autoClose={3000} position="bottom-left" />
    </div>
	);	
}
export default CadastrarNovidades;