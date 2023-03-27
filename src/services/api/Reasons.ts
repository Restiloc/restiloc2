import Fetch from "../Fetch";
import { Methods } from "src/Enum";

export async function getReasons() {
	const response = await Fetch.call("/reasons")
	if (!response) return false;
	const data: [] = await response.json();
	return data;
}