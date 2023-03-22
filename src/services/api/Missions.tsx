import { MissionType } from "src/Types";
import Fetch, { Methods } from "../Fetch";

export async function todayMissions() {
	const response = await Fetch.call("/me/missions?p=today")
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return data;
}

export async function expertMissions() {
	const response = await Fetch.call(`/me/missions`)
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return data;
}

export async function finishedMissions() {
	const response = await Fetch.call(`/me/missions?p=finished`)
	if (!response) return false;
	const data: MissionType[] = await response.json();
	return data;
}

export async function mission(endpoint: string) {
	const response = await Fetch.call(`${endpoint}`)
	if (!response) return false;
	const data: MissionType = await response.json();
	return data;
}

export async function unavailable(body: { reason_id: number, mission_id: number }) {
	const response = await Fetch.call("/unavailabilities", Methods.POST, body)
	const data = await response.text();
	if (!response) return false;
	return true;
}