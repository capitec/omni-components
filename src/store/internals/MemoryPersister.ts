
import { StoreStateSettings } from '../StoreStateSettings.js';
import { StatePersister } from './StatePersister.js';

/**
* Persists state to memory, with ability to retrieve and clear it.
*
* @ignore
*/
export class MemoryPersister implements StatePersister {
	private _state: object;

	constructor() {
		this._state = null;
	}

	get(name: string) {
		return this._state;
	}
	
	set(state: object, name: string) {
		this._state = state;
	}

	clear(name: string): void {
		this._state = null;
	}
}