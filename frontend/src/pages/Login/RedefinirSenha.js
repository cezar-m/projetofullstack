import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../assets/css/styles.css';

const RedefinirSenha = () => {
  const [novaSenha, setNovaSenha] = useState('');
  const { email } = useParams();
  const navigate = useNavigate();

  const atualizarSenha = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/atualizarsenha/${email}`, { novaSenha });
      toast.success('Senha atualizada com sucesso');
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error.response?.data || error.message);
      toast.error('Erro ao atualizar a senha. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="card card-container">
        <form className="form-signin" onSubmit={atualizarSenha}>
          <input
            type="password"
            id="novaSenha"
            className="form-control"
            placeholder="Nova Senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
          <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Redefinir Senha</button>
        </form>
        <ToastContainer autoClose={3000} position="bottom-left" />
      </div>
    </div>
  );
};

export default RedefinirSenha;

