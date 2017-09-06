# state-machine-component

A tiny (265 byte) utility to create state machine components using two pure functions.

### Usage

```js
// The factory accepts 2 functions
stateMachineComponent(reduce, render)

// Reduce is a redux-style reducer
function reduce(state, action) {
	// actions are like Redux Standard Actions:
	let { type, data, props } = action

	return { }  // new state
}

// Render is a functional component with little twist
function render(state, action) {
	// action() creates a dispatcher for an action type:
	return <button onClick={ action('TYPE') } />
}
```

### Simple Example: Counter

```js
// Remember:
//  `state` is the current state.
//  `action` is a redux standard action.
function reduce(state, action) {
	switch (action.type) {
		case '@@INIT': return { count: 0 }
		case 'ADD': return { count: state.count+1 }
	}
}

function render(state, action) {
	return (
		<div class="counter">
			Current count: {state.count}
			<button onClick={action('ADD')}>Add 1</button>
		</div>
	)
}

stateMachineComponent(reduce, render)
```


### Full Example: To-Do List

```js
const ToDos = stateMachineComponent(
	// (state, action)
	({ todos, text }, { type, data, props }) => {
		switch (type) {
			case '@@INIT':return { todos: props.todos || [], text: '' };
			case 'ADD': return { todos: todos.concat(text), text: '' };
			case 'TEXT': return { text: data.target.value };
		}
	},
	// state, action(type)
	({ todos, text }, action) => (
		<div>
			<h2>State Machine ToDos</h2>
			<ul>{todos.map( todo => <li>{todo}</li> )}</ul>
			<form onSubmit={action('ADD')}>
				<input value={text} onInput={action('TEXT')} />
			</form>
		</div>
	)
);
```