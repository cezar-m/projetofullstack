import connection from "../connection/Conexao.js";
import upload from "../middleware/multerConfig.js";

export const getProduto = ("/produtos", (req, res) => {	  
	//const query = "SELECT usuarios.nome, usuarios.email, usuarios.senha, usuarios.acesso, produtos.nome as nome_produto, produtos.preco, produtos.descricao, produtos.quantidade FROM usuarios INNER JOIN produtos ON usuarios.id = produtos.id_usuario";
	if(!req.session.userId) {
		return res.status(401).json("Usuário não autenticado");
	}
	
	const usuarioId = req.session.userId;
	const query = "SELECT * FROM produtos WHERE id_usuario = ?";
	
	connection.query(query, [usuarioId], (err, data) => {
		if(err) return res.json(err);
		
		// Adiciona o caminho base do servidor para as imagens
		const baseUrl = "http://localhost:5000";
		const produtos = data.map(produto => ({
			...produto,
			imagem: produto.imagem ? `${baseUrl}${produto.imagem}` : null
		}));
		
		return res.status(200).json(produtos);
	  });
});

export const getProdutoPorId = ("/produtos/:id", (req, res) => {
	const id = req.params.id;
	const query = "SELECT * FROM produtos WHERE id = ?";
	
	connection.query(query, [id], (err, results) => {
		if (err) return res.status(500).json(err);
        if (results.length > 0) {
            const produto = results[0];
            const baseUrl = "http://localhost:5000";
            produto.imagem = produto.imagem ? `${baseUrl}${produto.imagem}` : null;
            res.json(produto);
        } else {
            res.status(404).json("Produto não encontrado");
        }
	})
})

export const addProduto = ("/produtos", (req, res) => {
  upload.single('imagem')(req, res, (err) => {
  if(err) {
	return res.status(500).json({ error: err.message });
  }
  
  if(!req.session.userId) {
	  return res.status(401).json("Usuário não atenticado");
  }

	const usuarioId = req.session.userId;
	const query = "INSERT INTO produtos(`nome`,`preco`,`imagem`,`quantidade`, `descricao`,`id_usuario`) VALUES(?, ?, ?, ?, ?, ?)";
	const imagem = req.file ? `/uploads/${req.file.filename}` : null;
	const values = [
		req.body.nome,
		req.body.preco,
		imagem,
		req.body.quantidade,
		req.body.descricao,
		usuarioId
	];
	
	connection.query(query, values, (err) => {
		if(err) return res.json(err);
		
		return res.status(200).json("Produto criado com sucesso!!!");
	});
  });
});

export const updateProduto = ("/produtos/:id", upload.single('imagem'), async (req, res) => {
	const id = req.params.id;
	
	console.log("req.file", req.file);
	console.log("req.body.imagem:", req.body.imagem);

	if(!req.session.userId) {
		return res.status(401).json("Usuário não atenticado");
	}
	const usuarioId = req.session.userId;
	let imagem = req.file ? `/uploads/${req.file.filename}` : req.body.imagem;
	
	// Verifica se req.file está presente
	if(req.file) {
		imagem = `/uploads/${req.file.filename}`;
	} else {
		// Caso contrário, use a imagem existente
		imagem = req.body.imagem ? `/uploads/${req.body.imagem}` : '';
	}
	
	const query = "UPDATE produtos SET `nome` = ?,`preco` = ?, `imagem` = ?, `quantidade` = ?,`descricao` = ?, `id_usuario` = ? WHERE `id` = ?";
	
	const values = [
		req.body.nome,
		req.body.preco,
		imagem,
		req.body.quantidade,
		req.body.descricao,
		usuarioId,
		id
	];
	
	connection.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar produto:", err);
            return res.status(500).json({ error: "Erro interno do servidor ao atualizar o produto" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        return res.status(200).json({ message: "Produto atualizado com sucesso!!!" });
    });
});

export const deleteProduto = ("/produtos/:id", (req, res) => {
	const query = "DELETE FROM produtos WHERE `id` = ?";
	
	connection.query(query, [req.params.id], (err) => {
		if(err) return res.json(err);
		
		return res.status(200).json("Produto deletado com sucesso!!!");
	});
});