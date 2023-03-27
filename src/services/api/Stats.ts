import type { Stats } from "src/Types";
import Fetch from "../Fetch";

export async function getStatistics(): Promise<any> {
	const response = await Fetch.call("/stats");
	if (!response) return false;
	const data: Stats[] = await response.json();
	return data;
}