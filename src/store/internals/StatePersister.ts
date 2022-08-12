
export interface StatePersister {
    
	/**
	 * Gets the state for the given key.
	 *
	 * @param {String} name Unique of key of the state.
	 * 
	 * @returns {Object} State.
	 */
    get(name: string): any;

	/**
	 * Sets the state for the given key.
	 *
	 * @param {Object} state  State to set.
	 * @param {String} name Unique of key of the state.
	 * 
	 * @returns {void}
	 */
    set(state: object, name: string): void;

	/**
	 * Clear the state for the given key.
	 *
	 * @param {String} name Unique of key of the state.
	 * 
	 * @returns {void}
	 */
    clear(name: string): void;
}