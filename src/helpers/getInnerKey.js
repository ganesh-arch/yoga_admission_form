const getInnerKey = (obj = {}, key = '') => {
	let values = [];
	Object.keys(obj).forEach((temp) => {
		if (temp.includes(key)) values.push(obj[temp]);
	});

	return values;
};

export default getInnerKey;
