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

const Novidades = () => {
	const navigate = useNavigate();
	const [novidades, setNovidades] = useState([]);
	
	useEffect(() => {
		const fetchNovidades = async () => {
			try {
				const response = await axios.get("http://localhost:5000/novidades", { withCredentials: true });
				const data = response.data.map(novidade => {
					// Formate a data para DD/MM/YYYY
					const formattedDate = new Date(novidade.data_criacao).toLocaleDateString('pt-BR', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric'
					});
					return { ...novidade, data_criacao: formattedDate };
				});
				setNovidades(data);
			} catch (error) {
				console.error("Erro ao buscar novidades:", error);
			}
		};
		
		fetchNovidades();
	}, []);
	
	const handleNavigate = () => {
		navigate('/cadnovidades');
	}
	
	const deletarNovidades = async(id) => {
		try {
			await axios.delete(`http://localhost:5000/novidades/${id}`, { withCredentials: true });
			toast.success("Novidade deletada com sucesso!!!");
			// Remove a novidade da lista 
			setNovidades(novidades.filter((novidade) => novidade.id !== id));
		} catch (error) {
			console.error("Erro ao deletar novidade:", error);
			toast.error("Erro ao deletar novidade!");
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
						<h2>Lista de Novidades</h2>
						<p><button onClick={handleNavigate} className="btn btn-primary">Cadastrar</button></p>
						<div className="container d-flex justify-content-center">
							<table className="table table-light mt-4">
								<thead>
									<tr>
										<th scope="col">Titulo</th>
										<th scope="col">Descrição</th>
										<th scope="col">Data de Criação</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>	   
								{novidades.map((novidade, i) => (
									<tr key={i}>
										<td width="20%">{novidade.titulo}</td>
										<td width="20%">{novidade.descricao}</td>
										<td width="20%">{novidade.data_criacao}</td>
										<td>
											<Link to={`/updatenovidades/update/${novidade.id}`}><FaEdit /></Link>
										</td>
										<td width="5%">
											<FaTrash onClick={() => deletarNovidades(novidade.id)} />
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

export default Novidades;