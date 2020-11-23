const db = require('../utils/database');

const createClient = async (obj) => {
	const query = {
		text: `INSERT INTO clients
		(user_id,cpf,email,tel,name)
		VALUES($1,$2,$3,$4,$5) 
		RETURNING id`,
		values: [obj.userId, obj.cpf, obj.email, obj.tel, obj.name],
	};

	const result = await db.query(query);
	return result.rows.shift();
};

const getClient = async (obj) => {
	const query = `SELECT * FROM clients
		WHERE user_id = ${obj.userId} 
		AND cpf like '${obj.cpf}'`;

	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = { createClient, getClient };
