const response = require('../utils/response');
const Charges = require('../repositories/charges');
const Clients = require('../repositories/clients');
const Pagarme = require('../utils/pagarme');

const createCharge = async (ctx) => {
	const {
		idDoCliente = null,
		descricao = null,
		valor = null,
		vencimento = null,
	} = ctx.request.body;

	if (!idDoCliente || !descricao || !valor || !vencimento) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const client = await Clients.getClientByID(idDoCliente);

	const requestData = {
		clientId: idDoCliente,
		description: descricao,
		amount: valor,
		expirationDate: vencimento,
		name: client.name,
		cpf: client.cpf,
	};

	const transactionResponse = await Pagarme.createBill(requestData);

	if (!transactionResponse) {
		return response(ctx, 400, {
			mensagem: 'Ocorreu um erro ao criar o Boleto',
		});
	}

	const charger = { ...requestData, ...transactionResponse };

	const result = await Charges.createCharge(charger);

	let cobrancaStatus = null;
	if (result.status === 'waiting_payment') {
		cobrancaStatus = 'AGUARDANDO';
	} else if (result.status === 'paid') {
		cobrancaStatus = 'PAGO';
	} else {
		cobrancaStatus = 'VENCIDO';
	}

	const cobranca = {
		idDoCliente: result.client_id,
		descricao: result.description,
		valor: result.amount,
		vencimento: result.expiration_date,
		linkDoBoleto: result.link,
		status: cobrancaStatus,
	};

	return response(ctx, 201, { cobranca });
};

module.exports = { createCharge };
