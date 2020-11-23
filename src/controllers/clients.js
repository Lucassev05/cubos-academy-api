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

const editClient = async (ctx) => {
	const {
		id = null,
		nome = null,
		cpf = null,
		email = null,
		tel = null,
	} = ctx.request.body;

	const { userId = null } = ctx.state;

	if (!id || !nome || !cpf || !email || !tel || !userId) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const client = {
		id,
		name: nome.trim(),
		cpf: Formatter.stringCleaner(cpf).trim(),
		email: email.toLowerCase().trim(),
		tel: Formatter.stringCleaner(tel).trim(),
		userId,
	};

	const existence = await Clients.getClientByID(client.id);

	if (!existence) {
		return response(ctx, 404, { mensagem: 'Cliente não encontrado' });
	}

	const cpfInUse = await Clients.getClient(client);

	if (cpfInUse) {
		return response(ctx, 404, { mensagem: 'CPF já cadastrado' });
	}

	const validCPF = Validator.cpf(client.cpf);

	if (!validCPF) {
		return response(ctx, 400, { mensagem: 'CPF inválido' });
	}

	const validEmail = Validator.email(client.email);

	if (!validEmail) {
		return response(ctx, 400, { mensagem: 'Email inválido' });
	}

	const result = await Clients.editClient(client);
	return response(ctx, 201, result);
};

const getClients = async (ctx) => {
	const { userId = null } = ctx.state;

	if (!userId) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const result = await Clients.getClients(userId);
	return response(ctx, 201, result);
};

module.exports = { createClient, editClient, getClients };
