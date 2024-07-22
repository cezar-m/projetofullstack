import { toast } from 'react-toastify';

const emailRegex = /[^@\-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*\1/;

export const validacaoForm = async (event, { nome, email, senha, acesso }) => {
	  event.preventDefault();
	  	  
	  if(!nome) {
		  toast.warn("O campo nome e obrigatório!!!", {
		  position: "bottom-left"
		  });
		  return;
	  }	  
	  if(!email) {
		  toast.warn("O campo email e obrigatório!!!", {
		  position: "bottom-left"
		  });
		  return;
	  } 
	 if(!emailRegex.test(email)) {
		  toast.warn("Formato de email está inválido!!!", {
		  position: "bottom-left"
		});
		return;
	  }
	  if(!senha) {
		  toast.warn("O campo senha e obrigatório!!!", {
		  position: "bottom-left"
		  });
		  return;
	  }	   
	  if(!acesso) {
		  toast.warn("O campo acesso e obrigatório!!!", {
		  position: "bottom-left"
		  });
		  return;
	  }
	  
	  return true;
}

export const validacaoLogin = async (event, { email, senha, emailRegex }) => {
	  event.preventDefault();
	 
	  if(!email) {
		  toast.warn("O campo email e obrigatório!!!", {
		  position: "bottom-left"
		  });
		  return false;
	  } 
	  if(!emailRegex.test(email)) {
		  toast.warn("Formato de email está inválido!!!", {
		  position: "bottom-left"
		});
		return false;
	  }
	  if(!senha) {
		  toast.warn("O campo senha e obrigatório!!!", {
		  position: "bottom-left"
		  });
		  return false;
	  }	   
	  
	  return true;
}

export const validacaoProduto = async (event, { nome, preco, imagem, quantidade, descricao }) => {
	  event.preventDefault();
	 
	  if(!nome) {
		  toast.warn("O campo nome do produto e obrigatório!!!", {
		  position: "bottom-left"
		  });
		  return false;
	  } 
	  if(!preco) {
		  toast.warn("O campo preço do produto e obrigatório!!!", {
		  position: "bottom-left"
		});
		return false;
	  }
	  /*if(!imagem) {
		  toast.warn("O campo imagem do produto e obrigatório!!!", {
		  position: "bottom-left"
		});
		return false;
	  }  */
	  if(!quantidade) {
		  toast.warn("O campo quantidade do produto e obrigatório!!!", {
		  position: "bottom-left"
		});
		return false;
	  }
	  if(!descricao) {
		  toast.warn("O campo descrição do produto e obrigatório!!!", {
		  position: "bottom-left"
		});
		return false;
	  }
	  
	  return true;
}

export const validacaoNovidade = async (event, { titulo, descricao, data_criacao }) => {
	event.preventDefault();
	
	if(!titulo) {
		toast.warn("O campo titulo de novidade e obrigatório!!!", {
		position: "bottom-left"
		});
		return false;
	} 
	if(!descricao) {
		toast.warn("O campo descrição de novidade e obrigatório!!!", {
		position: "bottom-left"
		});
		return false;
	} 
	if(!data_criacao) {
		toast.warn("O campo data de criação de novidade e obrigatório!!!", {
		position: "bottom-left"
		});
		return false;
	} 
	
	return true;
}