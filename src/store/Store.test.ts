import { Store } from './Store.js';
import { v4 } from 'uuid';
import { StoreStateSettings } from './StoreStateSettings.js';

class TodoMemoryStoreImpl extends Store {

	constructor() {

		super({
			name: 'todo-store',
			persistence: 'memory',
			trackStateHistory: true,
			logStateChanges: true
		});
	}

	add(todo: { text?: string; id?: string; }) {

		todo.id = v4();

		const state = this.getState();

		if (state && state.todos) {
			this.setState({ todos: [...state.todos, todo] }, 'TODO_ADD');
		} else {
			this.setState({ todos: [todo] }, 'TODO_ADD');
		}
	}

	edit(todo: { id: string; }) {

		const todos = this.getState().todos;
		const index = todos.findIndex((c: { id: string; }) => c.id === todo.id);

		if (index !== -1) {
			todos[index] = todo;
		}

		this.setState({ todos: todos }, 'TODO_EDIT');
	}

	deleteLast() {

		/** @type {Array} */
		const todos = this.getState().todos;
		todos.splice(todos.length - 1, 1);

		this.setState({ todos }, 'TODOS_DELETE_LAST');
	}

	get() {

		return this.getState().todos;
	}
}

const TodoMemoryStore = new TodoMemoryStoreImpl();


beforeEach(() => {
	TodoMemoryStore.clearState();
});

test('TodoMemoryStore must be an singleton.', () => {
	expect(TodoMemoryStore).toBeTruthy();
});

test('TodoMemoryStore.getState() to be null.', () => {
	const state = TodoMemoryStore.getState();
	expect(state).toBeNull();
});

test('TodoMemoryStore.setState() with object must return an object.', () => {
	const state = TodoMemoryStore.setState({ todos: [] }, 'with-obj');
	expect(state).toBeInstanceOf(Object);
});

test('TodoMemoryStore.clearState() to be null.', () => {
	let state = TodoMemoryStore.setState({ todos: [] }, 'with-obj');
	TodoMemoryStore.clearState();
	state = TodoMemoryStore.getState();
	expect(state).toBeNull();
});

test('TodoMemoryStore.clearState() to be null without dispatching state.', () => {
	let state = TodoMemoryStore.setState({ todos: [] }, 'with-obj');
	TodoMemoryStore.clearState(false);
	state = TodoMemoryStore.getState();
	expect(state).toBeNull();
});

test('TodoMemoryStore.stateHistory to be instance of Array with length of three.', () => {

	TodoMemoryStore.add({ text: `Todo at ${Date.now()}` });
	TodoMemoryStore.add({ text: `Todo at ${Date.now()}` });
	TodoMemoryStore.add({ text: `Todo at ${Date.now()}` });

	const history = TodoMemoryStore.stateHistory;

	expect(history).toBeInstanceOf(Array);
	expect(history.length).toBe(3);
});

test('TodoMemoryStore.getStateProperty() to return correct state for property found.', () => {

	TodoMemoryStore.add({ text: `Todo at ${Date.now()}` });

	const state = TodoMemoryStore.getStateProperty('todos');

	expect(state).toBeInstanceOf(Object);
});

test('TodoMemoryStore.getStateProperty() to return null for property not found.', () => {

	TodoMemoryStore.add({ text: `Todo at ${Date.now()}` });

	const state = TodoMemoryStore.getStateProperty('abc');

	expect(state).toBeNull();
});

test('TodoMemoryStore.setState() with function to work correctly.', () => {

	TodoMemoryStore.add({ text: 'ABC' });
	TodoMemoryStore.add({ text: 'XYZ' });
	TodoMemoryStore.add({ text: '123' });

	const updatedState = TodoMemoryStore.setState((previousState: { todos: { text: string; }[]; }) => {
		previousState.todos[1].text = 'FFF';
		return previousState;
	}, 'TODO_ADD_FUNC');


	expect(updatedState.todos[1].text).toBe('FFF');
});

test('TodoMemoryStore.setState() with non-object to throw an error.', () => {

	let ex;

	try {
		TodoMemoryStore.setState(123 as any, 'with-err');
	} catch (error) {
		ex = error;
	}

	expect(ex).toBeTruthy();
});

test('TodoMemoryStore.resetState() to work correctly.', () => {

	TodoMemoryStore.add({ text: 'ABC' });
	TodoMemoryStore.add({ text: 'XYZ' });
	TodoMemoryStore.add({ text: '123' });

	TodoMemoryStore.resetState({ todos: [{ text: 'ABC' }] });

	const state = TodoMemoryStore.getState();

	expect(state.todos).toBeTruthy();
	expect(state.todos.length).toBe(1);
	expect(state.todos[0].text).toBe('ABC');
});

test('TodoMemoryStore.resetState() to work correctly with no dispatching.', () => {

	TodoMemoryStore.add({ text: 'ABC' });
	TodoMemoryStore.add({ text: 'XYZ' });
	TodoMemoryStore.add({ text: '123' });

	TodoMemoryStore.resetState({ todos: [{ text: 'ABC' }] }, false);

	const state = TodoMemoryStore.getState();

	expect(state.todos).toBeTruthy();
	expect(state.todos.length).toBe(1);
	expect(state.todos[0].text).toBe('ABC');
});

test('TodoMemoryStore.setState() that performs no dispatching.', () => {

	TodoMemoryStore.setState({ text: 'ABC' }, 'TODO_ADD', false);

	const state = TodoMemoryStore.getState();
});

test('BogusStore constructor to default "settings.persistence" to \'memory.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-store'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	expect(bogusStore['_settings'].persistence).toBe('memory');
});

test('BogusStore constructor to set "settings.trackStateHistory" to true and utilise it during setting state', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-store',
				trackStateHistory: true
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	bogusStore.setState({}, 'state');
	expect(bogusStore.stateHistory.length).toBe(1);
});

test('BogusStore constructor to set "settings.trackStateHistory" to false and utilise it during setting state', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus2-store',
				trackStateHistory: false
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	bogusStore.setState({}, 'state');
	expect(bogusStore.stateHistory.length).toBe(0);
});

test('BogusStore constructor to set "settings.logStateChanges" to true and utilise it during setting state with no constructor info.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus2-store',
				logStateChanges: false
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	bogusStore.constructor = null;
	bogusStore.setState({}, 'state');
});

test('BogusStore constructor to set "settings.logStateChanges" to false and utilise it during setting state.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus2-store',
				logStateChanges: false
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	bogusStore.setState({}, 'state');
});

test('BogusStore constructor throws error when no "settings" are provided.', () => {

	class BogusStore extends Store {
		constructor() {
			super(undefined);
		}
	}

	let ex;

	try {
		const bogusStore = new BogusStore();
	} catch (error) {
		ex = error;
	}

	expect(ex).toBeTruthy();
});

test('BogusStore constructor throws error when no "settings.name" are provided.', () => {

	class BogusStore extends Store {
		constructor() {
			super({} as StoreStateSettings);
		}
	}

	let ex;

	try {
		const bogusStore = new BogusStore();
	} catch (error) {
		ex = error;
	}

	expect(ex).toBeTruthy();
});

test('BogusStore constructor throws error when no "settings.persistence" is invalid.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-invalid',
				persistence: 'invalid'
			} as StoreStateSettings);
		}
	}

	let ex;

	try {
		const bogusStore = new BogusStore();
	} catch (error) {
		ex = error;
	}

	expect(ex).toBeTruthy();
});

test('BogusStore setState() for sessionStorage works correctly.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-session',
				persistence: 'sessionStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	const state = bogusStore.setState({ bogus: true }, 'state');

	expect(state).toBeInstanceOf(Object);
});

test('BogusStore setState() for sessionStorage works correctly with no dispatching.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-session',
				persistence: 'sessionStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	const state = bogusStore.setState({ bogus: true }, null, false);

	expect(state).toBeInstanceOf(Object);
});

test('BogusStore setState() for sessionStorage works correctly with no deep cloning.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-session',
				persistence: 'sessionStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	const state = bogusStore.setState({ bogus: true }, null, true, false);

	expect(state).toBeInstanceOf(Object);
});

test('BogusStore clearState() for sessionStorage works correctly.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-session',
				persistence: 'sessionStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	bogusStore.setState({ bogus: true }, 'state');
	bogusStore.clearState();
	const state = bogusStore.getState();

	expect(state).toBe(null);
});

test('BogusStore clearState() for sessionStorage works correctly.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-session',
				persistence: 'sessionStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	bogusStore.setState({ bogus: true }, 'state');
	bogusStore.clearState();
	const state = bogusStore.getState();

	expect(state).toBe(null);
});


test('BogusStore setState() for localStorage works correctly.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-local',
				persistence: 'localStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	const state = bogusStore.setState({ bogus: true }, 'state');

	expect(state).toBeInstanceOf(Object);
});

test('BogusStore setState() for localStorage works correctly with no dispatching.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-local',
				persistence: 'localStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	const state = bogusStore.setState({ bogus: true }, null, false);

	expect(state).toBeInstanceOf(Object);
});

test('BogusStore setState() for localStorage works correctly with no deep cloning.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-local',
				persistence: 'localStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	const state = bogusStore.setState({ bogus: true }, null, true, false);

	expect(state).toBeInstanceOf(Object);
});

test('BogusStore clearState() for localStorage works correctly.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-local',
				persistence: 'localStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	bogusStore.setState({ bogus: true }, 'state');
	bogusStore.clearState();
	const state = bogusStore.getState();

	expect(state).toBe(null);
});

test('BogusStore clearState() for localStorage works correctly.', () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-local',
				persistence: 'localStorage'
			} as StoreStateSettings);
		}
	}

	const bogusStore = new BogusStore();
	bogusStore.setState({ bogus: true }, 'state');
	bogusStore.clearState();
	const state = bogusStore.getState();

	expect(state).toBe(null);
});

test('BogusStore multiple stateChanged.subscribe().', async () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-subs'
			} as StoreStateSettings);
		}
	}

	let count = 0;

	const p = new Promise<void>(resolve => {
		const bogusStore = new BogusStore();
		bogusStore.stateChanged.subscribe(state => {
			if (!state) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		const bogusStore2 = new BogusStore();
		bogusStore2.stateChanged.subscribe(state => {
			if (!state) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		bogusStore.setState({ bogus: true }, 'state');
	});

	await p;
	expect(count).toBe(2);
});

test('BogusStore multiple getStateChangedProperties.subscribe().', async () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-subs-props'
			} as StoreStateSettings);
		}
	}

	let count = 0;

	const p = new Promise<void>(resolve => {
		const bogusStore = new BogusStore();
		bogusStore.getStateChangedProperties.subscribe(props => {
			if (!props) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		const bogusStore2 = new BogusStore();
		bogusStore2.stateChangedProperties.subscribe(props => {
			if (!props) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		bogusStore.setState({ bogus: true }, 'state');
	});

	await p;
	expect(count).toBe(2);
});


test('BogusStore multiple stateChangedWithName.subscribe().', async () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-subs-name'
			} as StoreStateSettings);
		}
	}

	let count = 0;

	const p = new Promise<void>(resolve => {
		const bogusStore = new BogusStore();
		bogusStore.stateChangedWithName.subscribe(s => {
			if (!s) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		const bogusStore2 = new BogusStore();
		bogusStore2.stateChangedWithName.subscribe(s => {
			if (!s) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		bogusStore.setState({ bogus: true }, 'state');
	});

	await p;
	expect(count).toBe(2);
});

test('BogusStore multiple stateChangedNoPayload.subscribe().', async () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-subs-nopay'
			} as StoreStateSettings);
		}
	}

	let count = 0;

	const p = new Promise<void>(resolve => {
		const bogusStore = new BogusStore();
		bogusStore.stateChangedNoPayload.subscribe(() => {
			count++;
			if (count === 4) {
				resolve();
			}
		});

		const bogusStore2 = new BogusStore();
		bogusStore2.stateChangedNoPayload.subscribe(() => {
			count++;
			if (count === 4) {
				resolve();
			}
		});

		bogusStore.setState({ bogus: true }, 'state');
	});

	await p;
	expect(count).toBe(4);
});

test('BogusStore multiple stateChangedNoPayloadWithName.subscribe().', async () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-subs-no-pay-name'
			} as StoreStateSettings);
		}
	}

	let count = 0;

	const p = new Promise<void>(resolve => {
		const bogusStore = new BogusStore();
		bogusStore.stateChangedNoPayloadWithName.subscribe(s => {
			if (!s) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		const bogusStore2 = new BogusStore();
		bogusStore2.stateChangedNoPayloadWithName.subscribe(s => {
			if (!s) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		bogusStore.setState({ bogus: true }, 'state');
	});

	await p;
	expect(count).toBe(2);
});

test('BogusStore multiple stateChangedPropertiesWithName.subscribe().', async () => {

	class BogusStore extends Store {
		constructor() {
			super({
				name: 'bogus-subs-prop-name'
			} as StoreStateSettings);
		}
	}

	let count = 0;

	const p = new Promise<void>(resolve => {
		const bogusStore = new BogusStore();
		bogusStore.stateChangedPropertiesWithName.subscribe(s => {
			if (!s) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		const bogusStore2 = new BogusStore();
		bogusStore2.stateChangedPropertiesWithName.subscribe(s => {
			if (!s) {
				return;
			}
			count++;
			if (count === 2) {
				resolve();
			}
		});

		bogusStore.setState({ bogus: true }, 'state');
	});

	await p;
	expect(count).toBe(2);
});