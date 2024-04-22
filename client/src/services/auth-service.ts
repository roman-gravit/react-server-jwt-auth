import api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/auth-response";

export default class AuthService {

	static async Login(email: string, 
		               password: string
					   ): Promise<AxiosResponse<AuthResponse>> 
	{
		return api.post<AuthResponse>("/login", {email, password});
	}

	static async Registration(email: string, 
		                      password: string
					          ): Promise<AxiosResponse<AuthResponse>> 
	{
		return api.post<AuthResponse>("/registration", {email, password});
	}

	static async Logout(): Promise<void> {
		return api.post("/logout");
	}
}