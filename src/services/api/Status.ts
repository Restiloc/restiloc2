import Fetch from "../Fetch";
import { Methods } from "src/Enum";

export async function getStatus() {
	const response = await Fetch.call("/status")
	if (!response) return false;
	const data: [] = await response.json();
	return data;
}