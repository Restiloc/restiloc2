import { Client, ClosedMissionType, Garage, MissionType, PrestationType, Vehicle } from "./Types";

export const __DOMAIN__ = 'https://restiloc.space/api';

export const format = {
	address: (isClient: boolean, mission?: MissionType) => {
		let type: Garage | Client | undefined = isClient ? mission?.client : mission?.garage;
		if (type === undefined) return "Adresse inconnue";
		return `${type?.addressNumber} ${type?.street}, ${type?.postalCode} ${type?.city}`
	},
	hourly: (mission?: MissionType) => {
		let date = (mission?.dateMission ?? "").split("-").reverse().join("/"),
			time = (mission?.startedAt ?? "").split(":").slice(0, 2).join("h");
		if (!date || !time) return "Date inconnue";
		return `le ${date} à ${time}`
	},
	licencePlate: (vehicle?: Vehicle) => {
		return vehicle!.licencePlate.substring(0, 7)
	},
	description: (prestation?: PrestationType): string => {
		return prestation!.description.substring(0, 20) + "..."
	},
	refreshTitle: (closedMission?: ClosedMissionType): string => {
		return `Mission #${closedMission?.id} cloturée`
	}
}