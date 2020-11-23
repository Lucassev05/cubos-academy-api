const email = (emailString) => {
	const validator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return validator.test(emailString);
};

const cpf = (cpfString) => {
	const cpfFormated = cpfString.replace(/\D/g, '');
	// eslint-disable-next-line eqeqeq
	if (cpfFormated.toString().length != 11 || /^(\d)\1{10}$/.test(cpfFormated))
		return false;
	let result = true;
	[9, 10].forEach((j) => {
		let soma = 0;
		let r;
		cpfFormated
			.split(/(?=)/)
			.splice(0, j)
			.forEach((e, i) => {
				soma += parseInt(e, 10) * (j + 2 - (i + 1));
			});
		r = soma % 11;
		r = r < 2 ? 0 : 11 - r;
		// eslint-disable-next-line eqeqeq
		if (r != cpfFormated.substring(j, j + 1)) result = false;
	});
	return result;
};

module.exports = { email, cpf };
