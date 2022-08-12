import { StatePersister } from './StatePersister.js';

/**
 * Persists state to localStorage, with ability to retrieve and clear it.
 * 
 * @ignore
 */
 class LocalStoragePersister implements StatePersister {

	get(name: string) {

		let state = null;

		if (name in window.localStorage) {

			try {
				state = JSON.parse(window.localStorage.getItem(name));
			} catch (error) {
				throw new Error(`Unable to get state for key '${name}' in localStorage`);
			}
		}

		return state;
	}

	set(state: object, name: string) {

		try {
			window.localStorage.setItem(name, JSON.stringify(state));
		} catch (error) {
			throw new Error(`Unable to set state for key '${name}' in localStorage`);
		}
	}

	clear(name: string) {
		window.localStorage.removeItem(name);
	}
}

export default new LocalStoragePersister();