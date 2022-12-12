import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.REACT_APP_BASE_URL);

export default pb;
