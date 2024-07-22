import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../../assets/css/styles.css";
import { validacaoForm } from "../../components/Validacao.js";

export const Cadastro = () => {
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [acesso, setAcesso] = useState('');
  const [error, setError] = useState('');
    
  const cadastroForm = async (event) => {
  const validaForm = await validacaoForm(event, { nome, email, senha, acesso });

	 if(validaForm) {   
	   try {
            const response = await axios.post('http://localhost:5000/usuarios', {
                nome,
                email,
                senha,
				acesso
            });

            if (response.status === 200) {
				toast.success("Cadastrado com sucesso!!!", {
					position: "bottom-left"
				});
                setNome('');
                setEmail('');
                setSenha('');
                setAcesso('');
            } else {
				toast.error("Erro ao fazer cadastro!!!", {
					position: "bottom-left"
				});
            }
        } catch (error) {
           console.log('Erro ao se comunicar com o servidor.');
        }
	 }

  }

	return(
		<div className="form-position mt-5">
            <h2>Cadastro</h2>
            <form onSubmit={cadastroForm}>
			   <div className="form-group row">
					<label forNome="nome" className="col-sm-2 col-form-label">Nome</label>
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
					<label forEmail="email" className="col-sm-2 col-form-label">Email</label>
					<div className="col-sm-6">
						<input 
							type="email" 
							className="form-control mb-2" 
							id="email" 
							placeholder="Email" 
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>
                 <div className="form-group row">
					<label forSenha="senha" className="col-sm-2 col-form-label">Senha</label>
					<div className="col-sm-6">
						<input 
							type="password" 
							className="form-control mb-2" 
							id="senha" 
							placeholder="Senha" 
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
						/>
					</div>
				</div>
                <div className="form-group row">
					<label forAcesso="acesso" className="col-sm-2 col-form-label">Acesso</label>
					<div className="col-sm-6">
					    <select className="form-control form-select" onChange={(e) => setAcesso(e.target.value)}>
							<option value="">Seleciona o acesso</option>
							<option value="admin">Admin</option>
							<option value="usuario">Usuario</option>
						</select>
					</div>
				</div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
				<Link to="/" className="link-cad">Voltar ao Login</Link>
            </form>
			<ToastContainer autoClose={3000} position="bottom-left" />
        </div>
	);
}

export default Cadastro;