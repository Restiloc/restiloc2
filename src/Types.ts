/**
 * This is the type of the object returned by the API for a mission.
 */
export type MissionType = {
	id: number;
	dateMission: string;
	startedAt?: string;
	kilometersCounter: number;
	nameExpertFile: string;
	isFinished: boolean;
	route: string;
	vehicle: [];
	expert: [];
	garage: [];
	unavailability: [];
	pree: [];
}


/**
 * This is the type of the object returned by the API when we get the information of the authenticated expert.
 */
export type Expert = {
	message?: string,
	created_at: string,
	email: string,
	email_verified_at: string,
	firstName: string,
	id: number,
	lastName: string,
	phoneNumber: string,
	updated_at: string,
	username: string,
}

export type ExpertUpdate = {
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: string,
}