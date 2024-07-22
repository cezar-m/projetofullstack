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

const Produtos = () => {
	const navigate = useNavigate();
	const [produtos, setProdutos] = useState([]);
	
	useEffect(() => {
		const fetchProdutos = async () => {
			try {
				const response = await axios.get("http://localhost:5000/produtos", { withCredentials: true });
				setProdutos(response.data);
			} catch (error) {
				console.error("Erro ao buscar produtos:", error);
			}
		};
		
		fetchProdutos();
	}, []);
	
	const handleNavigate = () => {
		navigate('/formcadprodutos');
	}
	
	const deletarProduto = async(id) => {
		try {
			await axios.delete(`http://localhost:5000/produtos/${id}`, { withCredentials: true });
			toast.success("Produto deletado com sucesso!!!");
			// Remove o produto da lista deleta produto
			setProdutos(produtos.filter((produto) => produto.id !== id));
		} catch (error) {
			console.error("Erro ao deletar produto:", error);
			toast.error("Erro ao deletar produto!");
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
						<h2>Lista de Produtos</h2>
						<p><button onClick={handleNavigate} className="btn btn-primary">Cadastrar</button></p>
						<div className="container d-flex justify-content-center">
							<table className="table table-light mt-4">
								<thead>
									<tr>
										<th scope="col">Nome</th>
										<th scope="col">Preço</th>
										<th scope="col">Imagem</th>
										<th scope="col">Quantidade</th>
										<th scope="col">Descrição</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>	   
								{produtos.map((produto, i) => (
									<tr key={i}>
										<td width="20%">{produto.nome}</td>
										<td width="20%">R$ {produto.preco}</td>
										<td width="20%">
										<img 
											src={produto.imagem}
											style={{ height: '100px', objectFit: 'cover' }}
										/>
										</td>
										<td width="20%">{produto.quantidade}</td>
										<td width="10%">{produto.descricao}</td>
										<td width="5%">
											<Link to={`/produtos/update/${produto.id}`}><FaEdit /></Link>
										</td>
										<td width="5%">
											<FaTrash onClick={() => deletarProduto(produto.id)} />
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

export default Produtos;