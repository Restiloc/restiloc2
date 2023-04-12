import type { NewPrestationType } from "src/Types";
import Fetch from "../Fetch";
import { Methods } from "src/Enum";

export async function newPrestation(body: {}) {
	console.log(body)
	const response = await Fetch.call("/pree", Methods.POST, body)
	if (!response) return false;
	const data: [] = await response.json();
	return data;
}