import mysql from 'mysql';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'autenticacao_db'
});

connection.connect(erro => {
	if(erro) {
		console.error('Erro de conexão', erro);
	    return;
	}
	console.log('Conexão realizada com sucesso com banco de dados!!!');
});

export default connection;