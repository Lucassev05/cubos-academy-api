const db = require('../utils/database');

const createCharge = async (obj) => {
	const query = {
		text: `INSERT INTO charges
		(client_id, description, amount, expiration_date, link, status, tid)
		VALUES($1,$2,$3,$4,$5,$6,$7) 
		RETURNING client_id, description, amount, expiration_date, link, status`,
		values: [
			obj.clientId,
			obj.description,
			obj.amount,
			obj.expirationDate,
			obj.boleto_url,
			obj.status,
			obj.tid,
		],
	};

	const result = await db.query(query);
	const cobranca = result.rows.shift();
	return cobranca;
};

module.exports = { createCharge };
