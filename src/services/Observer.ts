import NetInfo from '@react-native-community/netinfo';
import { Worker } from './Worker';

/**
 * @class - Observer methods
 * @static networkState - Network state
 * @method networkObserver - Observe network changes
 */
export default class Observer {

	static networkState: boolean;

	/**
	 * Add a listener to the network state
	 * 
	 * @return Promise<void>
	 */
	static async networkObserver(): Promise<void> {
		NetInfo.addEventListener(state => {
			this.networkState = state.isConnected ?? false;
			if (this.networkState) Worker.hydrate();
		});
	}
	
}