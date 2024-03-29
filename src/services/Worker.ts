import type { Hydrate } from "src/Types";
import Network from "./Network";
import Storage from "./Storage";
import { newPrestation } from "./api/Prestations";
import { closeMission, sendUnavailability } from "./api/Missions";

/**
 * @class Worker - Worker methods for background tasks
 * @static hydrated - Array of already hydrated uuids
 * @method hydrate - Hydrate database from Storage
 */
export class Worker {
	
	public static hydrated: string[] = [];

	/**
	 * Hydrate database from Storage
	 * 
	 * @returns Promise<void>
	 */
	static async hydrate(): Promise<void> {
		let network = await Network.isOk()
		if (network) {
			let items: any = await Storage.all();
			if (items && items.length > 0) {
				for (const item of items) {
					let uuid = item[0];
					if (uuid === "token" || this.hydrated.includes(uuid)) return;
					this.hydrated.push(uuid);
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
							await newPrestation({
								mission_id: data.mission_id,						
								label: data.prestation?.label,
								description: data.prestation?.description,
							});
							await Storage.remove(uuid);
							break;
					}
				}
			}
		}
	}
}