import axios  from "axios";
import { AuthResponse } from "../models/auth-response";

export const API_URL = "http://localhost:5000/api";

const api = axios.create({
	// `withCredentials` indicates whether or not cross-site Access-Control requests should be made using credentials
	withCredentials: true,
	baseURL: API_URL
})

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
})

// intercept 401 with outdated access token
api.interceptors.response.use(
	
	(config) => { return config; }, 
	
	async(error) => {
		const original_request = error.config;
		if(error.response.status === 401 && error.config && !error.config._isRetry) {
			original_request._isRetry = true;
			try {
				const response = await axios.get<AuthResponse>(`${API_URL}/refresh` , {withCredentials: true});
				localStorage.setItem("token", response.data.accessToken || "");
				return api.request(original_request);

			} catch(e) {
				console.log(e);
			}
		}
		throw error;
})

export default api;