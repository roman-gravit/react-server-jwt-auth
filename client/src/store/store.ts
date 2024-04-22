import { makeAutoObservable } from "mobx";
import { User } from "../models/user";
import AuthService from "../services/auth-service";
import { AuthResponse } from "../models/auth-response";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../http";


export default class Store {
	user: User | null = null;
	isAuth = false;
	isLoading = false;
	constructor() {
		makeAutoObservable(this);
	}

	SetAuth(value: boolean) {
		this.isAuth = value;
	}

	SetUser(user: User | null) {
		this.user = user;
	}

	SetLoading(value: boolean) {
		this.isLoading = value;
	}

	async Login(email: string, password: string): Promise<void> {
		try {
			
			const response: AxiosResponse<AuthResponse> = await AuthService.Login(email, password);
			console.log(response);
			localStorage.setItem("token", response.data.accessToken || "");
			this.SetAuth(true);
			this.SetUser(response.data.user);

		} catch(e: unknown) {
			if(e instanceof AxiosError) {
				console.log(e.response?.data?.message);
			}
		}
	}

	async Register(email: string, password: string): Promise<void> {
		try {
			
			const response: AxiosResponse<AuthResponse> = await AuthService.Registration(email, password);
			console.log(response);
			localStorage.setItem("token", response.data.accessToken || "");
			this.SetAuth(true);
			this.SetUser(response.data.user);

		} catch(e: unknown) {
			if(e instanceof AxiosError) {
				console.log(e.response?.data?.message);
			}
		}
	}

	async Logout(): Promise<void> {
		try {
			await AuthService.Logout();
			localStorage.removeItem("token");
			this.SetAuth(false);
			this.SetUser(null);

		} catch(e: unknown) {
			if(e instanceof AxiosError) {
				console.log(e.response?.data?.message);
			}
		}
	}


	async CheckAuth() {
		this.SetLoading(true);
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh` , {withCredentials: true});

			console.log(response);
			localStorage.setItem("token", response.data.accessToken || "");
			this.SetAuth(true);
			this.SetUser(response.data.user);

		} catch(e: unknown) {
			if(e instanceof AxiosError) {
				console.log(e.response?.data?.message);
			}
		} finally {
			this.SetLoading(false);
		}
	}
}