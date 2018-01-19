import { Component } from 'preact';

export default (reducer, render) => {
	function Machine() {
		Component.call(this);
		let cache = {};
		let action = type => cache[type] || (cache[type] = data => {
			this.setState(reducer(this.state, { type, data, props: this.props }));
		});
		this.render = (props, state) => render(state, action);
		this.componentWillReceiveProps = action('@@PROPS');
		this.componentWillMount = action('@@INIT');
	}
	return (Machine.prototype = new Component()).constructor = Machine;
};
