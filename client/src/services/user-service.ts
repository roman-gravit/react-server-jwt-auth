import { AxiosResponse } from "axios";
import api from "../http";
import { User } from "../models/user";

export default class UserService {
	static async GetUsers():  Promise<AxiosResponse<Array<User>>>{
		return api.get<Array<User>>("/users");
	}
}