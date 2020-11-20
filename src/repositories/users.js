const db = require('../utils/database');

const createUser = async (ctx) => {
	const query = {
		text: `INSERT INTO users
		(name,email,password)
		VALUES($1,$2,$3) RETURNING id`,
		values: [ctx.nome, ctx.email, ctx.senha],
	};

	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = { createUser };
