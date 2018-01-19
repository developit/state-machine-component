# state-machine-component

A tiny (~250 byte) utility to create state machine components using two pure functions.

🔥 [**JSFiddle Demo**](https://jsfiddle.net/developit/x0td4bmy/)

### Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
npm install --save state-machine-component
```

Then with a module bundler like [webpack](https://webpack.js.org) or [rollup](http://rollupjs.org), use as you would anything else:

```js
import stateMachineComponent from 'state-machine-component';
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="//unpkg.com/state-machine-component/dist/state-machine-component.umd.js"></script>
```

You can find the library on `window.stateMachineComponent`.

### Usage

The API is a single function that accepts 2 pure functions as arguments:

```js
stateMachineComponent(reduce, render)
```

The first function, `reduce()`, takes in the current state and applies an `action` to it, similar to a reducer in Redux:

```js
// Reduce is a redux-style reducer
function reduce(state, action) {
	// actions are like Redux Standard Actions:
	let { type, data, props } = action

	return { }  // just return the new state
}
```

The second function, `render()`, is a pure functional component that gets passed the current `state` instead of `props`, and a second argument `action()` - a function that creates a bound dispatcher for the given action type:

```js
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