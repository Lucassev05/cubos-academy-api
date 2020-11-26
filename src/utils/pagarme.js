const axios = require('axios');
require('dotenv').config();

const createBill = async (obj) => {
	try {
		const data = {
			amount: obj.amount,
			payment_method: 'boleto',
			boleto_expiration_date: obj.expirationDate,
			boleto_instructions: obj.description,
			api_key: 'ak_test_UmTegBDBoqn6Bbmjahxb5OUR5k1hWq',
			capture: true,
			customer: {
				type: 'individual',
				country: 'br',
				name: obj.name,
				documents: [
					{
						type: 'cpf',
						number: obj.cpf,
					},
				],
			},
		};

		const transaction = await axios.post(
			'https://api.pagar.me/1/transactions',
			data
		);

		const {
			// eslint-disable-next-line camelcase
			boleto_expiration_date,
			// eslint-disable-next-line camelcase
			boleto_url,
			status,
			tid,
		} = transaction.data;

		const result = {
			boleto_expiration_date,
			boleto_url,
			status,
			tid,
		};

		return result;
	} catch (error) {
		console.log(error.response.data);
		return null;
	}
};

module.exports = { createBill };
