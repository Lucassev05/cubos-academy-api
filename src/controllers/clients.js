const response = require('../utils/response');
const Clients = require('../repositories/clients');
const Formatter = require('../utils/formatter');
const Validator = require('../utils/validator');

const createClient = async (ctx) => {
	const {
		nome = null,
		cpf = null,
		email = null,
		tel = null,
	} = ctx.request.body;

	const { userId = null } = ctx.state;

	if (!nome || !cpf || !email || !tel || !userId) {
		response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const client = {
		name: nome.trim(),
		cpf: Formatter.stringCleaner(cpf).trim(),
		email: email.toLowerCase().trim(),
		tel: Formatter.stringCleaner(tel).trim(),
		userId,
	};

	const validCPF = Validator.cpf(client.cpf);

	if (!validCPF) {
		return response(ctx, 400, { mensagem: 'CPF inválido' });
	}

	const validEmail = Validator.email(client.email);

	if (!validEmail) {
		return response(ctx, 400, { mensagem: 'Email inválido' });
	}

	const existence = await Clients.getClient(client);

	if (existence) {
		return response(ctx, 400, { mensagem: 'Cliente já cadastrado' });
	}

	const result = await Clients.createClient(client);
	return response(ctx, 201, result);
};

module.exports = { createClient };
