const stringCleaner = (cpf) => {
	// remove every character != number from a string
	return cpf.replace(/[^\d]+/g, '');
};

const cpfFormatter = (cpf) => {
	// put special character in cpf - it must be a string
	return cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4');
};

module.exports = { stringCleaner, cpfFormatter };
