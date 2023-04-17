import { MissionType } from "src/Types";
import Fetch from "../Fetch";
import { Methods } from "src/Enum";

const orderById = (arr: MissionType[]) => arr.sort((a, b) => b.id - a.id); 

export async function getTodayMissions() {
	const response = await Fetch.call("/me/missions?p=today")
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return orderById(data);
}

export async function getMissions() {
	const response = await Fetch.call(`/me/missions`)
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return orderById(data);
}

export async function getFinishedMissions() {
	const response = await Fetch.call(`/me/missions?p=finished`)
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return orderById(data);
}

export async function getMission(endpoint: string) {
	const response = await Fetch.call(`${endpoint}`)
	if (!response) return false;
	const data: MissionType = await response.json();
	return data;
}

export async function sendUnavailability(body: { customerResponsible: boolean, reason_id: number, mission_id: number }) {
	const response = await Fetch.call("/unavailabilities", Methods.POST, body)
	if (!response) return false;
	return true;
}

export async function closeMission(id: string, body: {}) {
	const response = await Fetch.call(`/missions/${id}`, Methods.PUT, {
		"isFinished": true,
		...body
	})
	if (!response) return false;
	return true;
}