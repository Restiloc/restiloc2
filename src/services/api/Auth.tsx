import Storage from "src/Storage";
import Fetch, { Methods } from "../Fetch";
import { Credentials, Expert } from "src/Types";

export async function authenticated(): Promise<any> {
	const token = await Storage.get("token");
	console.log("This token was found in storage when checking authentication: ", token);
	if (token) {
		console.log("/me endpoint is being called to check if token is valid.")
		const response = await Fetch.call("/me");
		const data: Expert = await response.json();
		if (data.message && data.message === "Unauthenticated.") {
			console.log("Token is not valid, redirecting expert to login page.")
			return false;
		}
		console.log("Expert authenticated: ", data)
		return true;
	}
	return false;
}

type Login = {

}

export async function login(credentials: Credentials) {
	const response = await Fetch.call("/auth/login", Methods.POST, credentials);
	if (!response.ok) {
		return false;
	}
	const data = await response.json();
	await Storage.set("fromLoginScreen", JSON.stringify(true));
	await Storage.set("token", data.token);
	return true;
}

export async function logout() {
	Fetch.call("/logout", Methods.POST)
}

export async function me() {
	const response = await Fetch.call("/me");
	if (!response.ok) {
		return false;
	}
	const data = await response.json();
	return data;
}