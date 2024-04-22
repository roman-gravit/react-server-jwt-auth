import { makeAutoObservable } from "mobx";
import { User } from "../models/user";
import AuthService from "../services/auth-service";
import { AuthResponse } from "../models/auth-response";
import { AxiosError, AxiosResponse } from "axios";


export default class Store {
	user: User | null = null;
	isAuth = false;
	constructor() {
		makeAutoObservable(this);
	}

	SetAuth(value: boolean) {
		this.isAuth = value;
	}

	SetUser(user: User | null) {
		this.user = user;
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
}