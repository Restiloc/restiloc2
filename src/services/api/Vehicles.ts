import Fetch from "../Fetch";
import { Methods } from "src/Enum";

export async function editVehicle(id: number, body: {}) {
	const response = await Fetch.call(`/vehicles/${id}`, Methods.PUT, body)
	if (!response) return false;
	return true;
}