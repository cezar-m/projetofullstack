import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Produtos from "./pages/Produtos/Produtos.js";
import FormCadProdutos from "./pages/Produtos/FormCadProdutos.js";
import UpdateProdutos from "./pages/Produtos/UpdateProdutos.js";
import Novidades from "./pages/Novidades/Novidades.js"
import CadastrarNovidades from "./pages/Novidades/CadastrarNovidades.js"
import UpdateNovidades from "./pages/Novidades/UpdateNovidades.js";
import Usuarios from "./pages/Usuarios/Usuarios.js";
import UpdateUsuarios from "./pages/Usuarios/UpdateUsuarios.js";
import Cadastro from "./pages/Cadastro/Cadastro.js";
import RedefinirSenha from "./pages/Login/RedefinirSenha.js"
import { UserProvider } from "./components/Sidebar/UserContext.js";

const App = () => {

 const [loggedIn, setLoggedIn] = useState(false);
	
  return (
  <UserProvider>
    <Router>
		<Routes>
			<Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
			<Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/produtos" element={loggedIn ? <Produtos /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/formcadprodutos" element={loggedIn ? <FormCadProdutos /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/produtos/update/:id" element={loggedIn ? <UpdateProdutos /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/novidades" element={loggedIn ? <Novidades /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/cadnovidades" element={loggedIn ? <CadastrarNovidades /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/updatenovidades/update/:id" element={loggedIn ? <UpdateNovidades /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/usuarios" element={loggedIn ? <Usuarios /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/cadastro" element={<Cadastro />} />
			<Route path="/usuarios/update/:id" element={loggedIn ? <UpdateUsuarios /> : <Login setLoggedIn={setLoggedIn} />} />
			<Route path="/redefinirsenha/:email" element={<RedefinirSenha />} />
		</Routes>
	</Router>    
	</UserProvider>
  );
}

export default App;