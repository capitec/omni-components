import Dispatcher from './internals/Dispatcher.js';
import { Observable } from 'rxjs';
import State from './internals/State.js';
import { StateHistory } from './internals/State.js';
import { StoreStateSettings } from './StoreStateSettings.js';



/**
 * Base class used to create a contextual observable store. 
 * 
 * Core concepts and capabilities include:
 * - Be default store state is immutable (recommended).
 * - Consumers can subscribe to store state changes via exposed RxJS Observables.
 * - Store state change history can be captured and accessed (in memory only).
 * - Store state changes can be logged to console.
 * 
 * ```js 
 * import { Store } from '@capitec/omni-components/store'; 
 * ```
 *
 * @example
 * class ClientStore extends Store {
 *   constructor() {
 *     super({ 
 *       name: 'client-store',
 *       persistence: `sessionStorage`
 *     });
 *   }
 * }
 * 
 * export default new ClientStore();
 */
 export class Store {
	private _settings: StoreStateSettings;

	/**
	 * @param {StoreStateSettings} settings Setting to pass in.
	 */
	constructor(settings: StoreStateSettings) {

		if (!settings) {
			throw new Error(`"settings" parameter value must be supplied`);
		}

		if (!settings.name) {
			throw new Error(`"settings.name" parameter value must be supplied`);
		}

		this._settings = settings;
		this._settings.persistence = settings.persistence || `memory`;

		Dispatcher.initAll(this._settings);

		State.init(this._settings);
	}

	/**
	 * Exposes store state history only if settings had "trackStateHistory: true" set.
	 *
	 * @readonly
	 * @type {Array}
	 */
	get stateHistory() {
		return State.getHistory(this._settings);
	}

	/**
	 * Provides RxJS Observable that can be subscribed to in order to retrieve store changes.
	 * 
	 * @example
	 * // Subscribe
	 * const clientStoreSub = ClientStore.stateChanged.subscribe(state => { 
	 *   this.clients = state && state.clients ? state.clients : null;
	 * });
	 * 
	 * // Unsubscribe
	 * clientStoreSub.unsubscribe();
	 * 
	 * @type {Observable} 
	 */
	get stateChanged() {
		return Dispatcher.getStateChangedObservable(this._settings);
	}

	/**
	 * Provides RxJS Observable that can be subscribed to in order to retrieve store changes and state name.
	 * 
	 * @example
	 * // Subscribe
	 * const clientStoreSub = ClientStore.stateChangedWithName.subscribe(changes => { 
	 *   this.clients = changes.state && changes.state.clients ? changes.state.clients : null;
	 *   const stateAction = changes.name;
	 * });
	 * 
	 * // Unsubscribe
	 * clientStoreSub.unsubscribe();
	 * 
	 * @type {Observable} 
	 */
	get stateChangedWithName() {
		return Dispatcher.getStateChangedWithNameObservable(this._settings);
	}

	/**
	 * Provides RxJS Observable that can be subscribed to in order to be notified of store changes.
	 * 
	 * @example
	 * // Subscribe
	 * const clientStoreSub = ClientStore.stateChangedNoPayload.subscribe(() => { 
	 *   console.log(`State Changed`)
	 * });
	 * 
	 * // Unsubscribe
	 * clientStoreSub.unsubscribe();
	 * 
	 * @type {Observable} 
	 */
	get stateChangedNoPayload() {
		return Dispatcher.getStateChangedNoPayloadObservable(this._settings);
	}

	/**
	 * Provides RxJS Observable that can be subscribed to in order to be notified of store changes with state name.
	 * 
	 * @example
	 * // Subscribe
	 * const clientStoreSub = ClientStore.stateChangedNoPayloadWithName.subscribe(name => { 
	 *   console.log(`State Changed: ${name}`);
	 * });
	 * 
	 * // Unsubscribe
	 * clientStoreSub.unsubscribe();
	 * 
	 * @type {Observable} 
	 */
	get stateChangedNoPayloadWithName() {
		return Dispatcher.getStateChangedNoPayloadWithNameObservable(this._settings);
	}

	/**
	 * Provides RxJS Observable that can be subscribed to in order to retrieve store changes, 
	 * includes properties that changed as well.
	 * 
	 * @example
	 * // Subscribe
	 * const clientStorePropertiesSub = ClientStore.stateChangedProperties.subscribe(changes => { 
	 *   this.clients = changes.state && changes.state.clients ? changes.state.clients : null;
	 * });
	 * 
	 * // Unsubscribe
	 * clientStorePropertiesSub.unsubscribe();
	 * 
	 * @type {Observable} 
	 */
	get stateChangedProperties() {
		return Dispatcher.getStatePropertiesChangedObservable(this._settings);
	}

	/**
	 * Provides RxJS Observable that can be subscribed to in order to retrieve store changes, 
	 * includes properties that changed as well as state name.
	 * 
	 * @example
	 * // Subscribe
	 * const clientStorePropertiesSub = ClientStore.stateChangedPropertiesWithName.subscribe(changes => { 
	 *   this.clients = changes.state && changes.state.clients ? changes.state.clients : null;
	 *   const stateAction = changes.name;
	 * });
	 * 
	 * // Unsubscribe
	 * clientStorePropertiesSub.unsubscribe();
	 * 
	 * @type {Observable} 
	 */
	get stateChangedPropertiesWithName() {
		return Dispatcher.getStatePropertiesChangedWithNameObservable(this._settings);
	}

	/**
	 * @deprecated Use "stateChangedProperties" instead
	 */
	get getStateChangedProperties() {
		return this.stateChangedProperties;
	}

	/**
	 * Gets store state.
	 *
	 * @param {boolean} [deepCloneReturnedState=true] When true, returns a cloned copy of the store state (recommended). 
	 * 
	 * NOTE: When false and the settings had "persistence: 'memory'", a reference to the store state will 
	 * be returned and it's up to the consumer to ensure the state isn't changed from the outside.
	 * 
	 * @returns {Object} Store state to return.
	 */
	getState(deepCloneReturnedState = true) {
		return State.get(this._settings, null, deepCloneReturnedState);
	}

	/**
	 * Gets store state for a given property.
	 *
	 * @param {String} propertyName Name of the property to return from the store state.
	 * @param {Boolean} [deepCloneReturnedState=true] When true, returns a cloned copy of the store state (recommended). 
	 * 
	 * NOTE: When false and the settings had "persistence: 'memory'", a reference to the store state will 
	 * be returned and it's up to the consumer to ensure the state isn't changed from the outside.
	 * 
	 * @returns {Object} Store state to return.
	 */
	getStateProperty(propertyName: string, deepCloneReturnedState: boolean = true) {
		return State.get(this._settings, propertyName, deepCloneReturnedState);
	}

	/**
	 * Sets store state. 
	 * 
	 * NOTE: State to set MUST be serializable to and from JSON for immutability support 
	 * and / or supported persistence mechanisms.
	 *
	 * @param {Object|Function} state State to set, can be an object or a function that accepts latest state as input parameter.
	 * @param {String} action Descriptive name for state action, e.g. "CLIENT_ADD".
	 * @param {Boolean} [dispatchState=true] When true, notifies subscribers of state changes.
	 * @param {Boolean} [deepCloneState=true] When true, clones latest state before performing state update.
	 * 
	 * @returns {Object} Latest store state.
	 */
	setState(state: Object|Function, action: string, dispatchState = true, deepCloneState = true) {

		const previousState = this.getState(deepCloneState);
		let newState = state;

		switch (typeof state) {
			case `function`:
				newState = state(this.getState(deepCloneState));
				State.set(this._settings, newState, deepCloneState);
				break;
			case `object`:
				State.set(this._settings, state, deepCloneState);
				break;
			default:
				throw Error(`Unsupported state type "${typeof state}" provided.`);
		}

		if (this._settings.trackStateHistory) {
			State.getHistory(this._settings).push({
				action: action,
				beginState: previousState,
				endState: this.getState(deepCloneState)
			});
		}

		if (dispatchState) {
			this._dispatchState(newState, action);
		}

		if (this._settings.logStateChanges) {
			const caller = this.constructor ? `\r\nCaller: ${this.constructor.name}` : ``;
			console.log(`%cSTATE CHANGED`, `font-weight: bold`, `\r\nAction: `, action, caller, `\r\nState: `, state);
		}

		return this.getState(deepCloneState);
	}

	/**
	 * Clears store state.
	 *
	 * @param {boolean} [dispatchState=true] When true, notifies subscribers of state changes.
	 * 
	 * @returns {void}
	 */
	clearState(dispatchState = true) {

		State.clear(this._settings);

		if (dispatchState) {
			this._dispatchState(null, `<PLATFORM_STATE_CLEAR>`);
		}
	}

	/**
	 * Resets store state, includes clearing store state history.
	 *
	 * @param {Object} state State to set.
	 * @param {boolean} [dispatchState=true] When true, notifies subscribers of state changes.
	 * 
	 * @returns {void}
	 */
	resetState(state: Object, dispatchState = true) {

		State.set(this._settings, state);

		this.clearStateHistory();

		if (dispatchState) {
			this._dispatchState(state, `<PLATFORM_STATE_RESET>`);
		}
	}

	/**
	 * Clears store state history.
	 * 
	 * @returns {void}
	 */
	clearStateHistory() {
		State.getHistory(this._settings).splice(0);
	}

	_dispatchState(stateChanges: any, name: string) {

		// Dispatchers that require retrieving state
		const stateChangedDispatcher = Dispatcher.getStateChangedDispatcher(this._settings);
		const stateChangedWithNameDispatcher = Dispatcher.getStateChangedWithNameDispatcher(this._settings);
		const statePropertiesChangedDispatcher = Dispatcher.getStatePropertiesChangedDispatcher(this._settings);
		const statePropertiesChangedWithNameDispatcher = Dispatcher.getStatePropertiesChangedWithNameDispatcher(this._settings);

		if (stateChangedDispatcher.observers.length > 0 ||
			stateChangedWithNameDispatcher.observers.length > 0 ||
			statePropertiesChangedDispatcher.observers.length > 0 ||
			statePropertiesChangedWithNameDispatcher.observers.length > 0) {

			// Only retrieve state if at least one of the necessary dispatchers have observers
			const clonedState = State.get(this._settings, null, true);

			stateChangedDispatcher.next(clonedState);
			stateChangedWithNameDispatcher.next({
				state: clonedState,
				name: name
			});


			statePropertiesChangedDispatcher.next({
				state: clonedState,
				stateChanges: stateChanges
			});
			statePropertiesChangedWithNameDispatcher.next({
				state: clonedState,
				stateChanges: stateChanges,
				name: name
			});
		}

		Dispatcher.getStateChangedNoPayloadDispatcher(this._settings).next(undefined);
		Dispatcher.getStateChangedNoPayloadWithNameDispatcher(this._settings).next({ name: name });
	}
}