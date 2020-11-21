const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const verify = async (ctx, next) => {
	// eslint-disable-next-line no-unused-vars
	const [bearer, token] = ctx.headers.authorization.split(' ');

	try {
		const verification = await jwt.verify(token, process.env.JWT_SECRET);

		ctx.state.userId = verification.id;
		ctx.state.email = verification.email;
	} catch (error) {
		return response(ctx, 403, { message: 'Ação proibida' });
	}
	return next();
};

module.exports = { verify };
