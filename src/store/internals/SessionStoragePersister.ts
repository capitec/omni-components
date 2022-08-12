import { StatePersister } from './StatePersister.js';

/**
 * Persists state to sessionStorage, with ability to retrieve and clear it.
 * 
 * @ignore
 */
 class SessionStoragePersister implements StatePersister{

	get(name: string) {

		let state = null;

		if (name in window.sessionStorage) {

			try {
				state = JSON.parse(window.sessionStorage.getItem(name));
			} catch (error) {
				throw new Error(`Unable to get state for key '${name}' in sessionStorage`);
			}
		}

		return state;
	}
    
	set(state: object, name: string) {

		try {
			window.sessionStorage.setItem(name, JSON.stringify(state));
		} catch (error) {
			throw new Error(`Unable to set state for key '${name}' in sessionStorage`);
		}
	}
    
	clear(name: string) {
		window.sessionStorage.removeItem(name);
	}
}

export default new SessionStoragePersister();