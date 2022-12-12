import pb from './instance';

export const createUser = async (data = {}) => {
	let response = {};
	try {
		response = await pb.collection('users').create(data);
		response = { code: 200, data: response };
	} catch (e) {
		response = JSON.stringify(e);
		response = await JSON.parse(response).data;
	}
	return response;
};
export const login = async (data = {}) => {
	let response = {};
	try {
		response = await pb
			.collection('users')
			.authWithPassword(data.email, data.password);
		response.code = 200;
	} catch (e) {
		response = JSON.stringify(e);
		response = await JSON.parse(response).data;
	}
	return response;
};

export const updateUser = async (id, data) => {
	let response = {};
	try {
		response = await pb.collection('users').update(id, data);
		response = { code: 200, data: response };
	} catch (e) {
		response = JSON.stringify(e);
		response = await JSON.parse(response).data;
	}
	return response;
};

export const readUser = async (id) => {
	let response = {};
	try {
		response = await pb.collection('users').getOne(id, {});
		response = { code: 200, data: response };
	} catch (e) {
		response = JSON.stringify(e);
		response = await JSON.parse(response).data;
	}
	return response;
};
