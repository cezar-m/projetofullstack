import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../../assets/css/styles.css";
import { validacaoProduto } from "../../components/Validacao.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";

const FormCadProdutos = () => {
	
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
	const file = e.target.files[0];
    setImagem(file);
	setPreviewUrl(URL.createObjectURL(file));
  };
    
  const cadastroFormProduto = async (event) => {
  event.preventDefault(); // Certifique-se de prevenir o comportamento padrão do form
  const validaProduto = await validacaoProduto(event, { nome, preco, imagem, quantidade, descricao });

	 if(validaProduto) {   
        const formData = new FormData();
        formData.append('nome', nome);
		formData.append('preco', preco);
		formData.append('imagem', imagem);
		formData.append('quantidade', quantidade);
		formData.append('descricao', descricao); 
		
	  try {
            const response = await axios.post('http://localhost:5000/produtos', formData, {
              withCredentials: true, // Certifique-se de enviar cookies de sessão
			  headers: {
				'Content-type': 'multipart/form-data',
			  }            
			});

            if (response.status === 200) {
				toast.success("Produto cadastrado com sucesso!!!", {
					position: "bottom-left"
				});
                setNome('');
                setPreco('');
                setImagem(null);
                setQuantidade('');
				setDescricao('');
				setTimeout(() => {
					navigate('/produtos'); // Redirecionar para a lista de produtos após a atualização
				}, 3000); // Atraso de 3 segundos
            } else {
				toast.error("Erro ao fazer cadastro do produto!!!", {
					position: "bottom-left"
				});
            }
        } catch (error) {
           console.log('Erro ao se comunicar com o servidor.', error);
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
				<h2 className="text-center mt-4">Cadastro de Produtos</h2>
				<div className="form-position mt-5">

				<form onSubmit={cadastroFormProduto}>
					<div className="form-group row">
						<label htmlFor="nome" className="col-sm-2 col-form-label">Nome</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="nome" 
								placeholder="Nome" 
								value={nome}
								onChange={(e) => setNome(e.target.value)}
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
								placeholder="Preco" 
								value={preco}
								onChange={(e) => setPreco(e.target.value)}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="imagem" className="col-sm-2 col-form-label">Imagem</label>
						<div className="col-sm-6">
							<input 
								type="file" 
								className="form-control mb-2" 
								id="imagem" 
								onChange={handleImageChange}
							/>
							{previewUrl && <img src={previewUrl} alt="Image Preview" style={{ width: '200px', height: '200px' }} />}
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="quantidade" className="col-sm-2 col-form-label">Quantidade</label>
						<div className="col-sm-6">
							<input 
								type="text" 
								className="form-control mb-2" 
								id="quantidade" 
								placeholder="quantidade" 
								value={quantidade}
								onChange={(e) => setQuantidade(e.target.value)}
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
								placeholder="descricao" 
								value={descricao}
								onChange={(e) => setDescricao(e.target.value)}
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

export default FormCadProdutos;