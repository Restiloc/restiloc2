import Storage from "src/Storage";
import { __DOMAIN__ } from "src/Constants";

export enum Methods {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

export default class Fetch {

	static async call(endpoint: string, method: Methods = Methods.GET, payload: object = {}): Promise<any> {

		console.log(`Calling ${endpoint} with method ${method} and payload: `, payload);

		const token = await Storage.get("token");
		let options: {} = {
			method: `${method}`,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `Bearer ${token}`
			},
		}

		if (method !== Methods.GET) {
			options = {
				...options,
				body: JSON.stringify(payload)
			}
		}

		const reponse = await fetch(__DOMAIN__ + endpoint, options);

		if (!reponse.ok) {
			console.log(reponse);
			return false;
		}
	
		return reponse;

	}

}