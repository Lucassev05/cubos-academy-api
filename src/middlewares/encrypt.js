const Password = require('../utils/password');
const response = require('../utils/response');

const encrypt = async (ctx, next) => {
	const { password = null } = ctx.request.body;
	if (!password) {
		return response(ctx, 400, { message: 'Pedido mal formatado' });
	}

	const hash = await Password.encrypt(password);

	ctx.state.hash = hash;
	return next();
};

module.exports = { encrypt };
