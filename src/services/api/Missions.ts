import { MissionType } from "src/Types";
import Fetch from "../Fetch";
import { Methods } from "src/Enum";

export async function getTodayMissions() {
	const response = await Fetch.call("/me/missions?p=today")
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return data;
}

export async function getExpertMissions() {
	const response = await Fetch.call(`/me/missions`)
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return data;
}

export async function getFinishedMissions() {
	const response = await Fetch.call(`/me/missions?p=finished`)
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return data;
}

export async function getMission(endpoint: string) {
	const response = await Fetch.call(`${endpoint}`)
	if (!response) return false;
	const data: MissionType = await response.json();
	return data;
}

export async function sendUnavailability(body: { reason_id: number, mission_id: number }) {
	const response = await Fetch.call("/unavailabilities", Methods.POST, body)
	if (!response) return false;
	return true;
}