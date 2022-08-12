
/**
 * 
 * Settings for {@link Store} constructor.
 */
 export class StoreStateSettings {
    /**
     * Unique name of the store, e.g. "client-store".
     */
	name: string;
    /**
     * {"memory"|"sessionStorage"} [persistence="memory"] Where to persist store data to:
     * - "memory" - All state is stored in memory for the current session, i.e. it cannot survive page reloads.
     * - "sessionStorage" - All state is stored in domain storage for the current session only, i.e it can survive page reloads
     * as long as the tab remains open.
     */
	persistence: string = "memory";
    /**
     * [trackStateHistory=false] When true, stores the state mutation history.
     *
     * NOTE this will perpetually grow memory use within the current session and usage thereof
     * should be carefully considered, if needed at all.
     */
	trackStateHistory: boolean = false;
    /**
     * [logStateChanges=false] When true, logs the state mutation history to console.
     */
	logStateChanges: boolean = false;
}