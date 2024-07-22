import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { useUser } from "../../components/Sidebar/UserContext.js";  

const Dashboard = () => {
  
 const { user, setUser } = useUser();  
 const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', 
          { withCredentials: true }  // Importante: Envia os cookies com a requisição
        );
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário', error);
      }
    };

    fetchUser([useUser ]);
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }
  
  const Desolgar = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/logout');
      // Limpar as informações de sessão local
      localStorage.removeItem('token');
      // Redirecionar para a página de login ou atualizar o estado para deslogar o usuário
	  console.log(response.data);
	navigate('/');
   } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };
  
  return (
	<div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#ffffff'}}>
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
			<div className="text-center">
				<h2>Olá seja bem vindo(a): {user.nome}, ao painel administrativo da empresa</h2>
				<button className="btn btn-primary" onClick={Desolgar}>Deslogar</button>
			</div>
			</main>
		</div>
    </div>
  );
};

export default Dashboard;