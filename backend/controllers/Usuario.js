import connection from "../connection/Conexao.js";
import bcrypt from "bcrypt";

export const getUsuario = ("/usuarios", (req, res) => {
	const query = "SELECT * FROM usuarios";
	
	connection.query(query, [req.session.userId], (err, data) => {
		if(err) return res.json(err);
		
		return res.status(200).json(data);
	});	
});

export const getUsuarioPorId = ("/usuarios/:id", (req, res) => {
	const id = req.params.id;
	const query = "SELECT * FROM usuarios WHERE id = ?";
	
	connection.query(query, [id], (err, results) => {
		if(err) throw err;
		if(results.length > 0) {
			res.json(results[0]);
		} else {
			res.status(404).json("Registro não encontrado");
		}
	})
})

export const addUsuario = ("/usuarios", async (req, res) => {
	const query = "INSERT INTO usuarios(`nome`,`email`,`senha`,`acesso`) VALUES(?)";
	
	const values = [
		req.body.nome,
		req.body.email,
		await bcrypt.hash(req.body.senha, 10),
		req.body.acesso,
	];
	
	connection.query(query, [values], (err) => {
		if(err) return res.json(err);
		
		return res.status(200).json("Usuário criado com sucesso!!!");
	});
});

export const updateUsuario = ("/usuarios/:id", async (req, res) => {
	const query = "UPDATE usuarios SET `nome` = ?,`email` = ?,`senha` = ?,`acesso` = ? WHERE `id` = ?";
	
	try {
		// Validando o request do body
		const { nome, email, senha, acesso } = req.body;
		if(!nome || !email || !senha || !acesso) {
			return res.status(400).json({ message: "Os campos (nome, email, senha, acesso) são obrigátorios"});
		}
		
		const hashedPassword = await bcrypt.hash(senha, 10);
		
		const values = [nome, email, hashedPassword, acesso];
		
		connection.query(query, [...values, req.params.id], (err, result) => {
			if(err) {
				console.error("Erro na consulta de usuários", err);
				return res.status(500).json({ message: "Erro na consulta de usuarios", error: err });
			}
			
			return res.status(200).json("Usuário atualizado com sucesso!!!");
		});
	} catch (error) {
		console.error("Erro ao atualizar o usuário:", error);
		return res.status(500).json({ message: "Erro ao atualizar o usuário", error: error.message });
	}
});

export const deleteUsuario = ("/usuarios/:id", (req, res) => {
	const userId = req.params.id;
	
	// iniciar uma transação
	connection.beginTransaction((err) => {
		if(err) return res.json(err);
		
		// Deletar produtos associados ao usuário
		const deleteProductsQuery = "DELETE FROM produtos WHERE `id_usuario` = ?";
		connection.query(deleteProductsQuery, [userId], (err) => {
			if(err) {
				return connection.rollback(() => {
					res.json(err);
				});
			}
			// Deletar produtos associados ao usuário
			const deleteNewsQuery = "DELETE FROM novidades WHERE `id_usuario` = ?";
			connection.query(deleteNewsQuery, [userId], (err) => {
				if(err) {
					return connection.rollback(() => {
						res.json(err);
					});
				}
		
			
				// Deletar o usuário
				const deleteUserQuery = "DELETE FROM usuarios WHERE `id` = ?";
					connection.query(deleteUserQuery, [userId], (err) => {
					if(err) {
						return connection.rollback(() => {
							res.json(err);
						});
					}
				
					// Comitar a transação se ambar as queries forem bem-sucedidas
					connection.commit((err) => {
						if(err) {
							return connection.rollback(() => {
								res.json(err);
							});
						}
						res.status(200).json("Usuário e produtos e novidades deletados com sucesso!!!");
					});
				});
			});
		});
	});
});