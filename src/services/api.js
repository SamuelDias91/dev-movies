import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: 'd3d46f96267ece708e876711ffb56848',
		language: 'pt-BR',
		page: 1,
	},
});

export default api;
