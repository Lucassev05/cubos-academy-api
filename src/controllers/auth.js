const response = require('../utils/response');
const Users = require('../repositories/users');
const Password = require('../utils/password');

const authenticate = async (ctx) => {
	const { email = null, password = null } = ctx.request.body;

	if (!email || !password) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const user = await Users.getUser(email);

	if (user) {
		const comparison = await Password.check(password, user.password);
		if (comparison) {
			return response(ctx, 200, { mensagem: 'Sucess!' });
		}
	}

	return response(ctx, 200, { mensagem: 'Email ou senha incorretos' });
};

module.exports = { authenticate };
