/**
 * This is the type of the object returned by the API for a mission.
 */
export type MissionType = {
	message?: string;
	id: number;
	dateMission: string;
	startedAt?: string;
	kilometersCounter: number;
	nameExpertFile: string;
	isFinished: boolean;
	route: string;
	vehicle: Vehicle;
	expert: Expert;
	garage?: Garage;
	client?: Client;
	unavailability?: Unavailability;
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

export type Vehicle = {
	message?: string,
	id: number,
	licensePlate: string,
	color: string,
	releaseYear: number,
	route: string,
	model: Model,
	missions: MissionType[],
}

export type Model = {
	id: number,
	label: string,
	brand: string,
	route: string,
}

export type Garage = {
	id: number,
	name: string,
	addressNumber: string,
	street: string,
	postalCode: string,
	city: string,
	phoneNumber: string,
	latitude: string,
	longitude: string,
	url: string,
}

export type Client = {
	id: number,
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: string,
	addressNumber: string,
	street: string,
	postalCode: string,
	city: string,
	latitude: string,
	longitude: string,
	url: string,
	mission?: MissionType,
}

export type ExpertUpdate = {
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: number|string,
}

export type Credentials = {
  identifier: string,
  password: string,
}

export type ReasonType = {
	id: number,
	label: string,
	route: string,
	unavailabilities: [],
}

export type Unavailability = {
	customerResponsible: boolean,
	id: number,
	route: string,
	reason: ReasonType,
}