const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const Users = require('../repositories/users');
const Password = require('../utils/password');
require('dotenv').config();

const authenticate = async (ctx) => {
	const { email = null, password = null } = ctx.request.body;

	if (!email || !password) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const user = await Users.getUser(email);

	if (user) {
		const comparison = await Password.check(password, user.password);
		if (comparison) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET || 'cubosacademy',
				{
					expiresIn: '1d',
				}
			);
			return response(ctx, 200, { token });
		}
	}

	return response(ctx, 200, { mensagem: 'Email ou senha incorretos' });
};

module.exports = { authenticate };
