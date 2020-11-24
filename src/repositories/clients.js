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

const editClient = async (obj) => {
	const query = `UPDATE clients
		SET cpf='${obj.cpf}', email='${obj.email}', tel='${obj.tel}', name='${obj.name}'
		WHERE id = ${obj.id}
		RETURNING id, cpf, email, tel,name`;

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

const getClientByID = async (id) => {
	const query = `SELECT * FROM clients
		WHERE id = ${id}`;

	const result = await db.query(query);
	return result.rows.shift();
};

const getClientsList = async (obj) => {
	const query = `SELECT id,name,cpf,email,tel FROM clients
		WHERE user_id = ${obj.userId}
		LIMIT ${obj.limit}
		OFFSET ${obj.offset}`;

	const result = await db.query(query);
	return result.rows;
};

const getClientsSearch = async (obj) => {
	const query = `SELECT id,name,cpf,email,tel FROM clients
	WHERE user_id = ${obj.userId}
	AND (name LIKE '%${obj.busca}%' OR email LIKE '%${obj.busca}%' OR cpf LIKE '%${obj.busca}%')
	LIMIT ${obj.limit}
	OFFSET ${obj.offset}`;

	const result = await db.query(query);
	return result.rows;
};

module.exports = {
	createClient,
	editClient,
	getClientsList,
	getClientsSearch,
	getClient,
	getClientByID,
};
