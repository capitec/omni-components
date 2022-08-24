
# `Store`
Base class used to create a contextual observable store.

Core concepts and capabilities include:
- Be default store state is immutable (recommended).
- Consumers can subscribe to store state changes via exposed RxJS Observables.
- Store state change history can be captured and accessed (in memory only).
- Store state changes can be logged to console.


```js

import { Store } from '@innofake/omni-components/store';

```


```js

class ClientStore extends Store {
  constructor() {
    super({
      name: 'client-store',
      persistence: `sessionStorage`
    });
  }
}

export default new ClientStore();

```
            

## Instance Members
<table><thead><tr><th>Name</th><th>Type</th><th>Description</th><th>Example</th></tr></thead><tbody>
<tr><td>

`stateHistory`

</td><td>

``Array``

</td><td>Exposes store state history only if settings had "trackStateHistory: true" set.</td><td>



</td></tr>
<tr><td>

`stateChanged`

</td><td>

``Observable``

</td><td>Provides RxJS Observable that can be subscribed to in order to retrieve store changes.</td><td>



```js

// Subscribe
const clientStoreSub = ClientStore.stateChanged.subscribe(state => {
  this.clients = state && state.clients ? state.clients : null;
});

// Unsubscribe
clientStoreSub.unsubscribe();

```
            


</td></tr>
<tr><td>

`stateChangedWithName`

</td><td>

``Observable``

</td><td>Provides RxJS Observable that can be subscribed to in order to retrieve store changes and state name.</td><td>



```js

// Subscribe
const clientStoreSub = ClientStore.stateChangedWithName.subscribe(changes => {
  this.clients = changes.state && changes.state.clients ? changes.state.clients : null;
  const stateAction = changes.name;
});

// Unsubscribe
clientStoreSub.unsubscribe();

```
            


</td></tr>
<tr><td>

`stateChangedNoPayload`

</td><td>

``Observable``

</td><td>Provides RxJS Observable that can be subscribed to in order to be notified of store changes.</td><td>



```js

// Subscribe
const clientStoreSub = ClientStore.stateChangedNoPayload.subscribe(() => {
  console.log(`State Changed`)
});

// Unsubscribe
clientStoreSub.unsubscribe();

```
            


</td></tr>
<tr><td>

`stateChangedNoPayloadWithName`

</td><td>

``Observable``

</td><td>Provides RxJS Observable that can be subscribed to in order to be notified of store changes with state name.</td><td>



```js

// Subscribe
const clientStoreSub = ClientStore.stateChangedNoPayloadWithName.subscribe(name => {
  console.log(`State Changed: ${name}`);
});

// Unsubscribe
clientStoreSub.unsubscribe();

```
            


</td></tr>
<tr><td>

`stateChangedProperties`

</td><td>

``Observable``

</td><td>Provides RxJS Observable that can be subscribed to in order to retrieve store changes,
includes properties that changed as well.</td><td>



```js

// Subscribe
const clientStorePropertiesSub = ClientStore.stateChangedProperties.subscribe(changes => {
  this.clients = changes.state && changes.state.clients ? changes.state.clients : null;
});

// Unsubscribe
clientStorePropertiesSub.unsubscribe();

```
            


</td></tr>
<tr><td>

`stateChangedPropertiesWithName`

</td><td>

``Observable``

</td><td>Provides RxJS Observable that can be subscribed to in order to retrieve store changes,
includes properties that changed as well as state name.</td><td>



```js

// Subscribe
const clientStorePropertiesSub = ClientStore.stateChangedPropertiesWithName.subscribe(changes => {
  this.clients = changes.state && changes.state.clients ? changes.state.clients : null;
  const stateAction = changes.name;
});

// Unsubscribe
clientStorePropertiesSub.unsubscribe();

```
            


</td></tr>
<tr><td>

`getStateChangedProperties`

</td><td>

``

</td><td></td><td>



</td></tr>
</tbody></table>

## Instance Functions
<table><thead><tr><th>Name</th><th>Description</th><th>Parameters</th><th>Return</th><th>Example</th></tr></thead><tbody>
<tr><td>

`getState`

</td><td>Gets store state.</td><td>

deepCloneReturnedState {`boolean`} - When true, returns a cloned copy of the store state (recommended).

NOTE: When false and the settings had "persistence: 'memory'", a reference to the store state will
be returned and it's up to the consumer to ensure the state isn't changed from the outside.

</td><td>

{`Object`} - Store state to return.

</td><td>



</td></tr>
<tr><td>

`getStateProperty`

</td><td>Gets store state for a given property.</td><td>

propertyName {`String`} - Name of the property to return from the store state.

 deepCloneReturnedState {`Boolean`} - When true, returns a cloned copy of the store state (recommended).

NOTE: When false and the settings had "persistence: 'memory'", a reference to the store state will
be returned and it's up to the consumer to ensure the state isn't changed from the outside.

</td><td>

{`Object`} - Store state to return.

</td><td>



</td></tr>
<tr><td>

`setState`

</td><td>Sets store state.

NOTE: State to set MUST be serializable to and from JSON for immutability support
and / or supported persistence mechanisms.</td><td>

state {`Object`|`function`} - State to set, can be an object or a function that accepts latest state as input parameter.

 action {`String`} - Descriptive name for state action, e.g. "CLIENT_ADD".

 dispatchState {`Boolean`} - When true, notifies subscribers of state changes.

 deepCloneState {`Boolean`} - When true, clones latest state before performing state update.

</td><td>

{`Object`} - Latest store state.

</td><td>



</td></tr>
<tr><td>

`clearState`

</td><td>Clears store state.</td><td>

dispatchState {`boolean`} - When true, notifies subscribers of state changes.

</td><td>

{`void`} - 

</td><td>



</td></tr>
<tr><td>

`resetState`

</td><td>Resets store state, includes clearing store state history.</td><td>

state {`Object`} - State to set.

 dispatchState {`boolean`} - When true, notifies subscribers of state changes.

</td><td>

{`void`} - 

</td><td>



</td></tr>
<tr><td>

`clearStateHistory`

</td><td>Clears store state history.</td><td>



</td><td>

{`void`} - 

</td><td>



</td></tr>
</tbody></table>


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)




# `StoreStateSettings`
Settings for [Store](#store) constructor.

## Instance Members
<table><thead><tr><th>Name</th><th>Type</th><th>Description</th><th>Example</th></tr></thead><tbody>
<tr><td>

`persistence`

</td><td>

``

</td><td>{"memory"|"sessionStorage|"localStorage"} [persistence="memory"] Where to persist store data to:
- "memory" - All state is stored in memory for the current session, i.e. it cannot survive page reloads.
- "sessionStorage" - All state is stored in domain storage for the current session only, i.e it can survive page reloads as long as the tab remains open.
- "localStorage" - All state is stored in local storage , i.e it can survive page reloads and browser reopen</td><td>



</td></tr>
<tr><td>

`trackStateHistory`

</td><td>

``

</td><td>[trackStateHistory=false] When true, stores the state mutation history.

NOTE this will perpetually grow memory use within the current session and usage thereof
should be carefully considered, if needed at all.</td><td>



</td></tr>
<tr><td>

`logStateChanges`

</td><td>

``

</td><td>[logStateChanges=false] When true, logs the state mutation history to console.</td><td>



</td></tr>
</tbody></table>


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

