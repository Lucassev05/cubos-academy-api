const db = require('../utils/database');

const createUser = async (obj) => {
	const query = {
		text: `INSERT INTO users
		(name,email,password)
		VALUES($1,$2,$3) RETURNING id`,
		values: [obj.name, obj.email, obj.password],
	};

	const result = await db.query(query);
	return result.rows.shift();
};

const getUser = async (email) => {
	const query = {
		text: `SELECT * FROM users
		WHERE email like $1`,
		values: [email],
	};

	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = { createUser, getUser };
