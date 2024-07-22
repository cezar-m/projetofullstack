import React, {useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { validacaoProduto } from "../../components/Validacao.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./../../assets/css/styles.css";

const UpdateProdutos = () => {

	const { id } = useParams();
	const navigate = useNavigate();
	const [imagem , setImagem] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [existingImageUrl, setExistingImageUrl] = useState(null);
	const [fileName, setFileName] = useState('');
	const [produto, setProduto] = useState({
		nome: '',
		preco: '',
		imagem: '',
		descricao: '',
		quantidade: ''
	});

	useEffect(() => {
		const fetchProdutos = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/produtos/${id}`, { withCredentials: true });
				setProduto(response.data);
				setExistingImageUrl(response.data.imagem);
				setFileName(response.data.imagem.split('/').pop());
			} catch (error) {
				console.error("Erro ao buscar produto:", error);
			}
		};
		
		fetchProdutos();
	}, [id]);
	
	
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImagem(file);
		setPreviewUrl(URL.createObjectURL(file));
		setFileName(file.name);
	};
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduto({ ...produto, [name]: value });	
		//setFileName(e.target.files[0])		
	};
	
	const handleSubmit = async(e) => {
		e.preventDefault();
		
		const validaProduto = await validacaoProduto(e, { ...produto, imagem });

		if (validaProduto) {
		try {
			const formData = new FormData();
			formData.append('nome', produto.nome);
			formData.append('preco', produto.preco);
			formData.append('descricao', produto.descricao);
			formData.append('quantidade', produto.quantidade);
			
			if(imagem) {
				formData.append('imagem', imagem);
			} else if(existingImageUrl) {
				// Envia a imagem existente com o nome do arquivo
				formData.append('imagem', existingImageUrl.split('/').pop());
			} else {
				// Se não houver imagem, envie uma string vazia
				formData.append('imagem', '');
			}
			
			const response = await axios.put(`http://localhost:5000/produtos/${id}`, formData, {
				withCredentials: true,  // Adiciona esta linha para enviar cookies de sessão
				headers: {
					"Content-type": "multipart/form-data"
				}
			});
			
			if(response.status === 200){
				toast.success("Produto atualizado com sucesso!");
				setTimeout(() => {
					navigate('/produtos');
				}, 3000);
			} else {
				throw new Error("Erro ao atualizar produto!");
			}
			} catch(error) {
				toast.error("Erro ao atualizar produto!");
				console.error("Erro ao atualizar o produto:", error.response ? error.response.data : error.message);
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
				<h2 className="text-center mt-4">Atualização de Produtos</h2>
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
								value={produto.nome}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="preco" className="col-sm-2 col-form-label">Preço</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="preco"
								name="preco"
								placeholder="Preco" 
								value={produto.preco}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="fileImagem" className="col-sm-2 col-form-label">Imagem</label>
						<div className="col-sm-6">
							<input 
								type="file" 
								className="form-control mb-2" 
								id="fileImagem" 
								name="fileImagem"
								onChange={handleImageChange}
							/>
								
							{existingImageUrl && !previewUrl && (
                                        <div className="mt-2">
                                            <p>Imagem atual:</p>
                                            <img src={existingImageUrl} alt="Existing Image" style={{ width: '200px', height: '200px' }} />
                                        </div>
                                    )}
                                    {previewUrl && (
                                        <div className="mt-2">
                                            <p>Nova imagem selecionada:</p>
                                            <img src={previewUrl} alt="Image Preview" style={{ width: '200px', height: '200px' }} />
                                        </div>
                                    )}
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="quantidade" className="col-sm-2 col-form-label">Quantidade</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="quantidade" 
								name="quantidade"
								placeholder="quantidade" 
								value={produto.quantidade}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="descricao" className="col-sm-2 col-form-label">Descrição</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="descricao" 
								name="descricao"
								placeholder="descricao" 
								value={produto.descricao}
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

export default UpdateProdutos;