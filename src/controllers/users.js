const Users = require('../repositories/users');
const response = require('../utils/response');
const Validator = require('../utils/validator');

const createUser = async (ctx) => {
	const { nome = null, email = null } = ctx.request.body;
	const { hash = null } = ctx.state;

	if (!nome || !email) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const validEmail = Validator.email(email);

	if (!validEmail) {
		return response(ctx, 400, { mensagem: 'Email inválido' });
	}

	const existence = await Users.getUser(email);

	if (existence) {
		return response(ctx, 400, { mensagem: 'Usuário já cadastrado' });
	}

	const user = {
		name: nome,
		email,
		password: hash,
	};

	const result = await Users.createUser(user);
	return response(ctx, 201, result);
};

const getUser = async (ctx) => {
	const { email = null } = ctx.request.body;

	const result = await Users.getUser(email);
	return result;
};

module.exports = { createUser, getUser };
