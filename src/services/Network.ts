import NetInfo from '@react-native-community/netinfo';

/**
 * @class - Manage the network
 * @method isOk - Check the current status of the network
 */
export default class Network {

	/**
	 * Return the current status of the network
	 * 
	 * @returns Promise<boolean>
	 */
	public static async isOk(): Promise<boolean> {
		const state = await NetInfo.fetch();
		return (state.isConnected && state.isInternetReachable) ?? false;
	}
	
}