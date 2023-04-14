import Storage from "src/services/Storage";
import { __DOMAIN__ } from "src/Constants";
import { Methods } from "src/Enum";

/**
 * @class - Customize your fetch request
 * @method call - Configure the fetch call with differents parameters
 */
export default class Fetch {

	/**
	 * This method is used to call the API
	 * @example const response = await Fetch.call("/endpoint", Methods.POST, credentials);
	 */
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