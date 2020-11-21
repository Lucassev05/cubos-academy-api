const Users = require('../repositories/users');
const response = require('../utils/response');
const Password = require('../utils/password');

const createUser = async (ctx) => {
	const {
		firstName = null,
		lastName = null,
		email = null,
	} = ctx.request.body;
	const { hash = null } = ctx.state;

	if (!firstName || !lastName || !email) {
		return response(ctx, 400, { message: 'Pedido mal formatado' });
	}

	const existence = await Users.getUser(email);

	if (existence) {
		return response(ctx, 400, { message: 'Usuário já cadastrado' });
	}

	const user = {
		firstName,
		lastName,
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
