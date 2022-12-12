import pb from './instance';

export const readAllBatch = async () => {
	let response = {};
	try {
		response = await pb.collection('batch').getFullList(200, {
			sort: 'in_time',
		});
		response.data = response;
		response.code = 200;
	} catch (e) {
		response = JSON.stringify(e);
		response = await JSON.parse(response).data;
	}
	return response;
};
export const readOneBatch = async (id) => {
	let response = {};
	try {
		response = await pb.collection('batch').getOne(id, {});
		response.data = response;
		response.code = 200;
	} catch (e) {
		response = JSON.stringify(e);
		response = await JSON.parse(response).data;
	}
	return response;
};
