export const verificaUsuario = async (req, res, next) => {
	if(!req.session.userId) {
		return res.status(401).json("Faça login para acessar o sistema!!!");	
	}
	const usuario = await Usuario.findOne({
		where: {
			id: req.session.userId
		}
	});
	if(!usuario) return res.status(404).json("Usuário não logado");
	res.userId = usuario.id;
	req.acesso = usuario.acesso;
	next();
}