// funçao de formatação de respostas
const response = (ctx, codigo, dados) => {
	ctx.status = codigo;
	ctx.body = {
		status: codigo,
		dados,
	};
};

module.exports = response;
