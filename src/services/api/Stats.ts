import type { Stats } from "src/Types";
import Fetch from "../Fetch";

export async function getStatistics(): Promise<any> {
	const response = await Fetch.call("/stats");
	if (!response) return false;
	const data: Stats[] = await response.json();
	return data;
}

type StatsPeriod = {
	startDate: string;
	endDate: string;
}

export async function getStatisticsByPeriod(dates: StatsPeriod): Promise<any> {
	const response = await Fetch.call("/stats?startDate=" + dates.startDate + "&endDate=" + dates.endDate);
	if (!response) return false;
	const data: Stats[] = await response.json();
	return data;
}

export async function getWeeklyStatistics(): Promise<any> {
	const response = await Fetch.call("/stats/weekly");
	if (!response) return false;
	const data: WeeklyStats[] = await response.json();
	return data;
}