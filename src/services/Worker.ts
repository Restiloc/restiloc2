import type { Hydrate } from "src/Types";
import Network from "./Network";
import Storage from "./Storage";
import { newPrestation } from "./api/Prestations";
import { closeMission, sendUnavailability } from "./api/Missions";

/**
 * @class Worker - Worker methods for background tasks
 * @method hydrate - Hydrate database from Storage
 */
export default class Worker {

	/**
	 * Hydrate database from Storage
	 * 
	 * @returns void
	 */
	static async hydrate(): Promise<void> {
		let network = await Network.isOk()
		let alreadyHydrated: string[] = [];
		if (network) {
			let items: any = await Storage.all();
			if (items && items.length > 0) {
				for (const item of items) {
					let uuid = item[0];
					if (uuid !== "token" && !alreadyHydrated.includes(uuid)) {
						alreadyHydrated.push(uuid);
						let data: Hydrate = JSON.parse(item[1]);
						switch (data.type) {
							case "unavailability":
								console.log(`An unavailability has been found in the storage. It will be hydrated.`);
								if (data.mission_id && data.reason_id && data.customerResponsible) {
									await sendUnavailability({
										customerResponsible: data.customerResponsible,
										mission_id: data.mission_id,
										reason_id: data.reason_id,
									})
								}
								await Storage.remove(uuid);
								break;
							case "closedMissions":
								console.log(`A closed mission has been found in the storage. It will be hydrated.`);
								await closeMission(data.mission_id.toString(), {
									signature: data.signature,
									signedByClient: !data.signedByClient
								})
								await Storage.remove(uuid);
								break;
							case "prestations":
								console.log(`A prestation has been found in the storage. It will be hydrated.`);
								if (data.mission_id) {
									await newPrestation({
										mission_id: data.mission_id,						
										...data.prestations
									});
								}
						}
					}
				}
			}
		}
	}
}