const getUserFromLocalStorage = async () => {
	const item = await JSON.parse(localStorage.getItem('pocketbase_auth'));
	if (item !== null) return item?.model;

	return null;
};

export default getUserFromLocalStorage;
