import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../../assets/css/styles.css";
import { validacaoLogin } from "../../components/Validacao.js";


const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const emailRegex = /[^@\-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*\1/;
  
  const verificarLogin = async (event) => {	
	event.preventDefault(); 
	
	const validaLogin = await validacaoLogin(event, { email, senha, emailRegex });

    if(validaLogin) {
		try {
			const response = await axios.post('http://localhost:5000/login', 
			{ email, senha }, 
			{ withCredentials: true }  // Importante: Envia os cookies com a requisição
			);
			console.log(response.data);
			setLoggedIn(true);
			navigate('/dashboard');
			} catch (error) {
			console.error('Error response:', error.response);
			if (error.response.status === 401) {
				toast.warn('Email ou senha incorretos');
				position: "bottom-left"
			}
		}
	}
 };
  
 const redefinirSenha = async (e) => {
    e.preventDefault();
	
    try {
      const response = await axios.get(`http://localhost:5000/redefinirsenha/${email}`);
      if (response.data.userEmail) {
        // Assuming userId is part of the response for demo purposes
		
        navigate(`/redefinirsenha/${response.data.userEmail}`);
      }
    } catch (error) {
	  toast.warn('"O campo email e obrigatório!!!');
	  position: "bottom-left"
    }
  };
 
  return (
    <div className="container">
        <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" className="profile-name-card"></p>
			<form className="form-signin" onSubmit={verificarLogin}>
				{error && <p>{error}</p>}
				<span id="reauth-email" className="reauth-email"></span>
				<input type="email" id="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" id="senha" className="form-control" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Login</button>
				<Link to="/cadastro" className="link-login">Registre-se</Link>
				<Link to="#" onClick={redefinirSenha} className="link-login">Redefinir Senha</Link>
			</form>
			<ToastContainer autoClose={3000} position="bottom-left" />
        </div>
    </div>
  );
};

export default Login;