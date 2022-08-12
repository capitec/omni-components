import { BehaviorSubject, Observable } from 'rxjs';
import { getName } from './Common.js';
import { StoreStateSettings } from '../StoreStateSettings.js';

interface BehaviorSubjectDictionary {
    [index: string]: BehaviorSubject<any>;
}

interface ObservableDictionary {
    [index: string]: Observable<any>;
}

/**
* Keeps track of dispatchers per store (by name) in order to support
* both singleton- and instance-based stores.
*
* @ignore
*/
class Dispatcher {
    _stateChangedDispatchers: BehaviorSubjectDictionary;
    _stateChangedObservables: ObservableDictionary;
    _stateChangedWithNameDispatchers: BehaviorSubjectDictionary;
    _stateChangedWithNameObservables: ObservableDictionary;
    _stateChangedNoPayloadDispatchers: BehaviorSubjectDictionary;
    _stateChangedNoPayloadObservables: ObservableDictionary;
    _stateChangedNoPayloadWithNameDispatchers: BehaviorSubjectDictionary;
    _stateChangedNoPayloadWithNameObservables: ObservableDictionary;
    _statePropertiesChangedDispatchers: BehaviorSubjectDictionary;
    _statePropertiesChangedObservables: ObservableDictionary;
    _statePropertiesChangedWithNameDispatchers: BehaviorSubjectDictionary;
    _statePropertiesChangedWithNameObservables: ObservableDictionary;

	constructor() {
		this._stateChangedDispatchers = {} as BehaviorSubjectDictionary;
		this._stateChangedObservables = {} as ObservableDictionary;

		this._stateChangedWithNameDispatchers = {} as BehaviorSubjectDictionary;
		this._stateChangedWithNameObservables = {} as ObservableDictionary;

		this._stateChangedNoPayloadDispatchers = {} as BehaviorSubjectDictionary;
		this._stateChangedNoPayloadObservables = {} as ObservableDictionary;

		this._stateChangedNoPayloadWithNameDispatchers = {} as BehaviorSubjectDictionary;
		this._stateChangedNoPayloadWithNameObservables = {} as ObservableDictionary;

		this._statePropertiesChangedDispatchers = {} as BehaviorSubjectDictionary;
		this._statePropertiesChangedObservables = {} as ObservableDictionary;

		this._statePropertiesChangedWithNameDispatchers = {} as BehaviorSubjectDictionary;
		this._statePropertiesChangedWithNameObservables = {} as ObservableDictionary;
	}

	/**
     * Initialises all observables
     * @param settings Store Settings
     */
    initAll(settings: StoreStateSettings) {
		this.initStateChanged(settings);
		this.initStateChangedWithName(settings);
		this.initStateChangedNoPayload(settings);
		this.initStateChangedNoPayloadWithName(settings);
		this.initStatePropertiesChanged(settings);
		this.initStatePropertiesChangedWithName(settings);
	}

	initStateChanged(settings: StoreStateSettings) {

		if (this._stateChangedDispatchers[getName(settings)]) {
			return;
		}

		const dispatcher = new BehaviorSubject(null);
		this._stateChangedDispatchers[getName(settings)] = dispatcher;
		this._stateChangedObservables[getName(settings)] = dispatcher.asObservable();
	}

	initStateChangedWithName(settings: StoreStateSettings) {

		if (this._stateChangedWithNameDispatchers[getName(settings)]) {
			return;
		}

		const dispatcher = new BehaviorSubject(null);
		this._stateChangedWithNameDispatchers[getName(settings)] = dispatcher;
		this._stateChangedWithNameObservables[getName(settings)] = dispatcher.asObservable();
	}

	initStateChangedNoPayload(settings: StoreStateSettings) {

		if (this._stateChangedNoPayloadDispatchers[getName(settings)]) {
			return;
		}

		const dispatcher = new BehaviorSubject(null);
		this._stateChangedNoPayloadDispatchers[getName(settings)] = dispatcher;
		this._stateChangedNoPayloadObservables[getName(settings)] = dispatcher.asObservable();
	}

	initStateChangedNoPayloadWithName(settings: StoreStateSettings) {

		if (this._stateChangedNoPayloadWithNameDispatchers[getName(settings)]) {
			return;
		}

		const dispatcher = new BehaviorSubject(null);
		this._stateChangedNoPayloadWithNameDispatchers[getName(settings)] = dispatcher;
		this._stateChangedNoPayloadWithNameObservables[getName(settings)] = dispatcher.asObservable();
	}

	initStatePropertiesChanged(settings: StoreStateSettings) {

		if (this._statePropertiesChangedDispatchers[getName(settings)]) {
			return;
		}

		const dispatcher = new BehaviorSubject(null);
		this._statePropertiesChangedDispatchers[getName(settings)] = dispatcher;
		this._statePropertiesChangedObservables[getName(settings)] = dispatcher.asObservable();
	}

	initStatePropertiesChangedWithName(settings: StoreStateSettings) {

		if (this._statePropertiesChangedWithNameDispatchers[getName(settings)]) {
			return;
		}

		const dispatcher = new BehaviorSubject(null);
		this._statePropertiesChangedWithNameDispatchers[getName(settings)] = dispatcher;
		this._statePropertiesChangedWithNameObservables[getName(settings)] = dispatcher.asObservable();
	}

	/**
	 * Gets the state changed dispatcher instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {BehaviorSubject} Dispatcher instance.
	 */
	getStateChangedDispatcher(settings: StoreStateSettings) {
		return this._stateChangedDispatchers[getName(settings)];
	}

	/**
	 * Gets the state changed observable instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {Observable} Observable instance.
	 */
	getStateChangedObservable(settings: StoreStateSettings) {
		return this._stateChangedObservables[getName(settings)];
	}

	/**
	 * Gets the state changed with name dispatcher instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {BehaviorSubject} Dispatcher instance.
	 */
	getStateChangedWithNameDispatcher(settings: StoreStateSettings) {
		return this._stateChangedWithNameDispatchers[getName(settings)];
	}

	/**
	 * Gets the state changed with name observable instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {Observable} Observable instance.
	 */
	getStateChangedWithNameObservable(settings: StoreStateSettings) {
		return this._stateChangedWithNameObservables[getName(settings)];
	}

	/**
	 * Gets the state changed without payload dispatcher instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {BehaviorSubject} Dispatcher instance.
	 */
	getStateChangedNoPayloadDispatcher(settings: StoreStateSettings) {
		return this._stateChangedNoPayloadDispatchers[getName(settings)];
	}

	/**
	 * Gets the state changed without payload observable instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {Observable} Observable instance.
	 */
	getStateChangedNoPayloadObservable(settings: StoreStateSettings) {
		return this._stateChangedNoPayloadObservables[getName(settings)];
	}

	/**
	 * Gets the state changed without payload with name dispatcher instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {BehaviorSubject} Dispatcher instance.
	 */
	getStateChangedNoPayloadWithNameDispatcher(settings: StoreStateSettings) {
		return this._stateChangedNoPayloadWithNameDispatchers[getName(settings)];
	}

	/**
	 * Gets the state changed without payload with name observable instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {Observable} Observable instance.
	 */
	getStateChangedNoPayloadWithNameObservable(settings: StoreStateSettings) {
		return this._stateChangedNoPayloadWithNameObservables[getName(settings)];
	}

	/**
	 * Gets the state properties changed dispatcher instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {BehaviorSubject} Dispatcher instance.
	 */
	getStatePropertiesChangedDispatcher(settings: StoreStateSettings) {
		return this._statePropertiesChangedDispatchers[getName(settings)];
	}

	/**
	 * Gets the state properties changed observable instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {Observable} Observable instance.
	 */
	getStatePropertiesChangedObservable(settings: StoreStateSettings) {
		return this._statePropertiesChangedObservables[getName(settings)];
	}

	/**
	 * Gets the state properties changed with name dispatcher instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {BehaviorSubject} Dispatcher instance.
	 */
	getStatePropertiesChangedWithNameDispatcher(settings: StoreStateSettings) {
		return this._statePropertiesChangedWithNameDispatchers[getName(settings)];
	}

	/**
	 * Gets the state properties changed with name observable instance for the given settings context.
	 *
	 * @param {StoreStateSettings} settings Setting for state context.
	 * 
	 * @returns {Observable} Observable instance.
	 */
	getStatePropertiesChangedWithNameObservable(settings: StoreStateSettings) {
		return this._statePropertiesChangedWithNameObservables[getName(settings)];
	}
}

export default new Dispatcher();