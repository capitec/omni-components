# `src/store/Store.ts`:

## class: `Store`

### Fields

| Name                             | Privacy | Type                 | Default    | Description                                                                                                                                                                     | Inherited From |
| -------------------------------- | ------- | -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `_settings`                      | private | `StoreStateSettings` | `settings` |                                                                                                                                                                                 |                |
| `stateHistory`                   |         | `Array`              |            | Exposes store state history only if settings had "trackStateHistory: true" set.                                                                                                 |                |
| `stateChanged`                   |         | `Observable`         |            | Provides RxJS Observable that can be subscribed to in order to retrieve store changes.                                                                                          |                |
| `stateChangedWithName`           |         | `Observable`         |            | Provides RxJS Observable that can be subscribed to in order to retrieve store changes and state name.                                                                           |                |
| `stateChangedNoPayload`          |         | `Observable`         |            | Provides RxJS Observable that can be subscribed to in order to be notified of store changes.                                                                                    |                |
| `stateChangedNoPayloadWithName`  |         | `Observable`         |            | Provides RxJS Observable that can be subscribed to in order to be notified of store changes with state name.                                                                    |                |
| `stateChangedProperties`         |         | `Observable`         |            | Provides RxJS Observable that can be subscribed to in order to retrieve store changes, &#xA;                            includes properties that changed as well.               |                |
| `stateChangedPropertiesWithName` |         | `Observable`         |            | Provides RxJS Observable that can be subscribed to in order to retrieve store changes, &#xA;                            includes properties that changed as well as state name. |                |
| `getStateChangedProperties`      |         |                      |            |                                                                                                                                                                                 |                |
| `persistence`                    |         |                      |            |                                                                                                                                                                                 |                |

### Methods

| Name                | Privacy | Description                                                                                                                                                                                                                                       | Parameters                                                                                 | Return   | Inherited From |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------- | -------------- |
| `getState`          |         | Gets store state.                                                                                                                                                                                                                                 | `deepCloneReturnedState: boolean`                                                          | `Object` |                |
| `getStateProperty`  |         | Gets store state for a given property.                                                                                                                                                                                                            | `propertyName: String, deepCloneReturnedState: Boolean`                                    | `Object` |                |
| `setState`          |         | Sets store state. &#xA;                            &#xA;                            NOTE: State to set MUST be serializable to and from JSON for immutability support &#xA;                            and / or supported persistence mechanisms. | `state: Object\|Function, action: String, dispatchState: Boolean, deepCloneState: Boolean` | `Object` |                |
| `clearState`        |         | Clears store state.                                                                                                                                                                                                                               | `dispatchState: boolean`                                                                   | `void`   |                |
| `resetState`        |         | Resets store state, includes clearing store state history.                                                                                                                                                                                        | `state: Object, dispatchState: boolean`                                                    | `void`   |                |
| `clearStateHistory` |         | Clears store state history.                                                                                                                                                                                                                       |                                                                                            | `void`   |                |
| `_dispatchState`    |         |                                                                                                                                                                                                                                                   | `stateChanges: any, name: string`                                                          |          |                |

<hr/>

## Exports

| Kind | Name    | Declaration | Module             | Package |
| ---- | ------- | ----------- | ------------------ | ------- |
| `js` | `Store` | Store       | src/store/Store.ts |         |

# `src/store/StoreStateSettings.ts`:

## class: `StoreStateSettings`

### Fields

| Name                | Privacy | Type      | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              | Inherited From |
| ------------------- | ------- | --------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `name`              |         | `string`  |            | Unique name of the store, e.g. "client-store".                                                                                                                                                                                                                                                                                                                                                                                                           |                |
| `persistence`       |         | `string`  | `"memory"` | {"memory"\|"sessionStorage"} [persistence="memory"] Where to persist store data to:&#xA;                            \- "memory" - All state is stored in memory for the current session, i.e. it cannot survive page reloads.&#xA;                            \- "sessionStorage" - All state is stored in domain storage for the current session only, i.e it can survive page reloads&#xA;                            as long as the tab remains open. |                |
| `trackStateHistory` |         | `boolean` | `false`    | [trackStateHistory=false] When true, stores the state mutation history.&#xA;                            &#xA;                            NOTE this will perpetually grow memory use within the current session and usage thereof&#xA;                            should be carefully considered, if needed at all.                                                                                                                                       |                |
| `logStateChanges`   |         | `boolean` | `false`    | [logStateChanges=false] When true, logs the state mutation history to console.                                                                                                                                                                                                                                                                                                                                                                           |                |

<hr/>

## Exports

| Kind | Name                 | Declaration        | Module                          | Package |
| ---- | -------------------- | ------------------ | ------------------------------- | ------- |
| `js` | `StoreStateSettings` | StoreStateSettings | src/store/StoreStateSettings.ts |         |
