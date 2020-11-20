const db = require('../utils/database');

const createUser = async (obj) => {
	const query = {
		text: `INSERT INTO users
		(first_name,last_name,email,password)
		VALUES($1,$2,$3,$4) RETURNING id`,
		values: [obj.first_name, obj.last_name, obj.email, obj.password],
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
