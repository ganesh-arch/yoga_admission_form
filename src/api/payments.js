import pb from './instance';

export const readAllPayments = async (id) => {
	let response = {};
	try {
		response = await pb.collection('payment').getFullList(200, {
			sort: '-created',
			filter: `user_id = "${id}"`,
		});
		response = { data: response, code: 200 };
	} catch (e) {
		response = JSON.stringify(e);
		response = await JSON.parse(response).data;
	}
	return response;
};

export const createPayment = async (data = {}) => {
	let response = {};
	try {
		response = await pb.collection('payment').create(data);
		response.code = 200;
	} catch (e) {
		response = JSON.stringify(e);
		response = await JSON.parse(response).data;
	}
	return response;
};
