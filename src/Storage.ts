import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @class - Manage the storage of the app using AsyncStorage
 * @method remove - Remove a key from the storage
 * @method set - Set a key in the storage
 * @method get - Get a key from the storage
 */
export default class Storage {

	/**
	 * This static async method remove a key from the storage
	 * 
	 * @param key - The key to remove from the storage
	 * @returns void
	 */
	static async remove(key: string) {
		try {
			await AsyncStorage.removeItem(key)
		} catch(e) {
			console.error("Error while removing the key " + key + " from the storage: ", e)
		}
	}

	/**
	 * This static async method set a key in the storage
	 * 
	 * @param key - The key to remove from the storage
	 * @returns void
	 */
	static async set(key: string, data: string) {
		try {
			await AsyncStorage.setItem(key, data)
		} catch (e) {
			console.error("Error while setting the key " + key + " in the storage: ", e)
		}
	}
	
	/**
	 * This static async method get a key from the storage
	 * 
	 * @param key - The key to get from the storage
	 * @returns void
	 */
  static async get(key: string) {
		try {
			const value = await AsyncStorage.getItem(key)
			if (value !== null) {
				return value
			}
		} catch(e) {
			console.error("Error while getting the key " + key + " from the storage: ", e)
		}
	}

}