import connection from "../connection/Conexao.js";

export const getNovidade = ("/novidades", (req, res) => {	  
	if(!req.session.userId) {
		return res.status(401).json("Usuário não autenticado");
	}
	
	const usuarioId = req.session.userId;
	const query = "SELECT * FROM novidades WHERE id_usuario = ?";
	
	connection.query(query, [req.session.userId], (err, data) => {
		if(err) return res.json(err);
		
		return res.status(200).json(data);
	});	
});

export const getNovidadePorId = ("/novidades/:id", (req, res) => {
	const id = req.params.id;
	const query = "SELECT * FROM novidades WHERE id = ?";
	
	connection.query(query, [id], (err, results) => {
		if (err) return res.status(500).json(err);
        if (results.length > 0) {
            const novidade = results[0];
            res.json(novidade);
        } else {
            res.status(404).json("Novidade não encontrado");
        }
	})
})

export const addNovidade = ("/novidades", (req, res) => {
	if(!req.session.userId) {
	  return res.status(401).json("Usuário não atenticado");
	}
	
	const usuarioId = req.session.userId;
	const query = "INSERT INTO novidades(`titulo`,`descricao`,`data_criacao`, `id_usuario`) VALUES(?, ?, ?, ?)";
	
	const values = [
		req.body.titulo,
		req.body.descricao,
		req.body.data_criacao,
		usuarioId
	];
	
	 
  connection.query(query, values, (err) => {
    if (err) {
      console.error('Erro ao inserir novidade no banco de dados:', err);
      return res.status(500).json(err);
    }
    
    return res.status(200).json("Novidade criada com sucesso!!!");
  });
});

export const updateNovidade = ("/novidades/:id", async (req, res) => {
	const id = req.params.id;
	
	if(!req.session.userId) {
		return res.status(401).json("Usuário não atenticado");
	}
	const usuarioId = req.session.userId;
	
	const query = "UPDATE novidades SET `titulo` = ?,`descricao` = ?, `data_criacao` = ?, `id_usuario` = ? WHERE `id` = ?";
	
	const values = [
		req.body.titulo,
		req.body.descricao,
		req.body.data_criacao,
		usuarioId,
		id
	];
	
	connection.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar as novidades:", err);
            return res.status(500).json({ error: "Erro interno do servidor ao atualizar as novidades" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Novidade não encontrado" });
        }

        return res.status(200).json({ message: "Novidade atualizada com sucesso!!!" });
    });
});

export const deleteNovidade = ("/novidades/:id", (req, res) => {
	const query = "DELETE FROM novidades WHERE `id` = ?";
	
	connection.query(query, [req.params.id], (err) => {
		if(err) return res.json(err);
		
		return res.status(200).json("Novidade deletada com sucesso!!!");
	});
});
