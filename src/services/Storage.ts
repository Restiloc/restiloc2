import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @class - Manage the storage of the app using AsyncStorage
 * @method generateKey - Generate a random key
 * @method remove - Remove a key from the storage
 * @method set - Set a key in the storage
 * @method get - Get a key from the storage
 * @method all - Get all items from the storage
 * @method getAllKeys - Get all keys from the storage
 * @method save - Save a key in the storage
 */
export default class Storage {

	private static generateKey(): string {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

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

	/**
	 * Get all items from the storage
	 * 
	 * @returns Promise<[string, string][]>
	 */
	static async all() {
		try {
			const keys = await AsyncStorage.getAllKeys();
			const items = await AsyncStorage.multiGet(keys);
			return items;
		} catch (e) {
			console.error("Error while getting all keys from the storage: ", e)
		}
	}

	/**
	 * Return all keys from the storage
	 * 
	 * @returns Promise<string[]>
	 */
	static async getAllKeys() {
		try {
			const keys = await AsyncStorage.getAllKeys();
			return keys;
		} catch (e) {
			console.error("Error while getting all keys from the storage: ", e)
		}
	}

	/**
	 * This method allow you to save a key in the storage.
	 * If this key already exists, it will be added to the existing payload.
	 * 
	 * @param key The key to save
	 * @param payload The payload to save
	 * @returns Promise<void>
	 */
	static async save(payload: {}): Promise<void> {
		const key: string = this.generateKey();
		Storage.set(key, JSON.stringify(payload));
	}

}