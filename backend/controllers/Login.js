import connection from "../connection/Conexao.js";
import bcrypt from "bcrypt"

export const Login = ("/login", (req, res) => {
    const { email, senha } = req.body; 
	const query = "SELECT * FROM usuarios WHERE email = ?";
	connection.query(query, [email], async (err, results) => {
		if(err) {
			console.error("Erro ao se logar", err);
			res.status(500).json("Erro interno do servidor");
			return;
		}
		
		if (results.length > 0) {
			const user = results[0];
			const passwordMatch = await bcrypt.compare(senha, user.senha);
			if (passwordMatch) {
				req.session.userId = user.id; // Armazena o ID do usuário na sessão
				res.status(200).json("Usuário logado com sucesso!!!");
		 	} else {
				res.status(401).json("Email ou senha incorretos");
			}
		} else {
			res.status(401).json("Email ou senha incorretos");
		}
		
	});
});

// Rota para obter dados do usuário
export const Logar = ('/user', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json('Usuário não autenticado');
  }
  const query = "SELECT * FROM usuarios WHERE id = ?";
  connection.query(query, [req.session.userId], (err, results) => {
	  if(err) {
		  console.error("Erro ao buscar dados do usuário", err);
		  return res.status(500).json("Erro interno do servidor");
	  }
	  if(results.length > 0) {
		  res.json(results[0]);
	  } else {
		  res.status(404).json("Usuário não encontrado");
	  }
  })
});

export const Logout = ("/logout", (req, res) => {
	req.session.destroy(err => {
		if(err) {
			console.error("Erro ao fazer logout");
			res.status(500).json("Erro interno do servidor");
		    return;
		}
		res.status(200).json("Usuário deslogado com sucesso!!!");
	});
});

export const RedefinirSenha = ('/redefinirsenha/:email', (req, res) => {
	const email = req.params.email;
	const query = "SELECT * FROM usuarios WHERE email = ?";
	
	connection.query(query, [email], (err, results) => {
		if(err) throw err;
		if(results.length > 0) {
			res.json({ userEmail: results[0].email });
		} else {
			res.status(404).json("Usuário não encontrado");
		}
	})			
});

// Função para executar consultas SQL retornar uma promessa
const query = (sql, params) => {
	return new Promise((resolve, reject) => {
		connection.query(sql, params, (error, results) => {
			if(error) {
				return reject(error);
			}
			resolve(results);
		})
	})
}

// Implementação da função AtualizarSenha
export const AtualizarSenha = ('/atualizarsenha/:email', async (req, res) => {
	try {
		const {email} = req.params; // Obtém o email dos parâmetros da URL
		const { novaSenha } = req.body; // Obtém a nova senha do corpo da requisição
	
		console.log('Dados recebidos no contralador:', { email, novaSenha });
		
		if(!email || !novaSenha) {
			console.log('Erro: Email ou nova senha ausentes');
			return res.status(400).json({ error: 'Email e nova senha são necessários' });
		}
		
		const result = await query('SELECT * FROM usuarios WHERE email = ?', [email]);
		
		console.log('Resultado da consulta:', result);
		
		if(result.length === 0) {
			console.log('Erro: Usuário não encontrado');
			return res.status(404).json({ error: 'Usuário não encontrado' });
		}
		
		const hashedSenha = await bcrypt.hash(novaSenha, 10);
		
		await query('UPDATE usuarios SET senha = ? WHERE email = ?', [hashedSenha, email]);
		
		res.status(200).json({ message: 'Senha atualizada com sucesso!' });
	} catch(error) {
		console.log('Erro ao atualizar a senha:', error); // Detalhe o erro para depuração
		res.status(500).json({ error: 'Erro ao atualizar a senha' });
	}
});