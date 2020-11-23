const jwt = require('jsonwebtoken');
const response = require('../utils/response');
require('dotenv').config();

const verify = async (ctx, next) => {
	if (!ctx.headers.authorization) {
		return response(ctx, 401, {
			message:
				'É necessário estar altenticado para realizar esta operação',
		});
	}

	try {
		// eslint-disable-next-line no-unused-vars
		const [bearer, token] = ctx.headers.authorization.split(' ');
		const verification = await jwt.verify(token, process.env.JWT_SECRET);

		ctx.state.userId = verification.id;
		ctx.state.email = verification.email;
	} catch (error) {
		console.log(error);
		return response(ctx, 403, {
			message: 'Ocorreu um erro. Por favor, tente novamente',
		});
	}
	return next();
};

module.exports = { verify };
