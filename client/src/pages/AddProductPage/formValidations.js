const validateIntegerValue = (value) => {
	if (!value) {
		return { errMsg: 'Please, submit required data', err: true };
	} else if (isNaN(value) || parseFloat(value) < 0) {
		return { errMsg: 'Please, provide the data of indicated type', err: true };
	} else {
		return { errMsg: '', err: false };
	}
};

const validateStringValue = (value) => {
	if (!value) {
		return { errMsg: 'Please, submit required data', err: true };
	}
	return { errMsg: '', err: false };
};

export { validateIntegerValue, validateStringValue };
