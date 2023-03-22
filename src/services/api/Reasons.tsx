import Fetch from "../Fetch";

export async function getReasons() {
	const response = await Fetch.call("/reasons")
	if (!response) return false;
	const data: [] = await response.json();
	return data;
}