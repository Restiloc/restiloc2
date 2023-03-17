import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

	static async remove(key: string) {
		try {
			await AsyncStorage.removeItem(key)
		} catch(e) {
			// remove failed
		}
	}

	static async set(key: string, data: string) {
		try {
			await AsyncStorage.setItem(key, data)
		} catch (e) {
			// store failed
		}
	}
	
  static async get(key: string) {
		try {
			const value = await AsyncStorage.getItem(key)
			if (value !== null) {
				return value
			}
		} catch(e) {
			// retrieve failed
		}
	}

}

export default Storage;