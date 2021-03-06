const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const Users = require('../repositories/users');
const Password = require('../utils/password');
require('dotenv').config();

const authenticate = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;

	if (!email || !senha) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const data = {
		email: email.trim().toLowerCase(),
		senha,
	};

	const user = await Users.getUser(data.email);

	if (user) {
		const comparison = await Password.check(data.senha, user.password);
		if (comparison) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET || 'cubosacademy',
				{
					expiresIn: '1d',
				}
			);
			return response(ctx, 200, {
				mensagem: 'Usuário logado com sucesso!',
				token,
			});
		}
	}

	return response(ctx, 200, { mensagem: 'Email ou senha incorretos' });
};

module.exports = { authenticate };
