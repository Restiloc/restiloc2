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
	signature: string;
	signedByClient: boolean;
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

/**
 * This is the type of the object returned by the API when we get the information of a vehicle.
 */
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

/**
 * This is the type of the object returned by the API when we get the information of a model.
 */
export type Model = {
	id: number,
	label: string,
	brand: string,
	route: string,
}

/**
 * This is the type of the object returned by the API when we get the information of a garage.
 */
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

/**
 * This is the type of the object returned by the API when we get the information of a client.
 */
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

/**
 * This is the type of the object returned by the API when we get the information of a reason.
 */
export type ReasonType = {
	id: number,
	label: string,
	route: string,
	unavailabilities: [],
}

/**
 * This is the type of the object returned by the API when we get the information of an unavailability.
 */
export type Unavailability = {
	customerResponsible: boolean,
	id: number,
	route: string,
	reason: ReasonType,
}

/**
 * This is the object we use to update the information of an expert.
 */
export type ExpertUpdate = {
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: number|string,
}

/**
 * This is the object we use to login an expert.
 */
export type Credentials = {
  identifier: string,
  password: string,
}

export type Stats = {
	reason: ReasonType,
	count: number,
}

export type WeeklyStats = {
	year: number,
	weeks: {
		[week: string]: Stats[]
	}
}

export type PrestationType = {
	id: number,
	label: string,
	description: string,
	image: string,
	route: string,
	mission: MissionType[],
}

export type NewPrestationType = {
	label: string,
	description: string,
	image: string,
}

export type Hydrate = {
	type: string,
	customerResponsible?: boolean,
	mission_id: number,
	reason_id?: number,
	prestations?: PrestationType[],
	signature?: string,
	signedByClient?: boolean,
}