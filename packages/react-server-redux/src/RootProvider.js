import { Component } from 'inferno';
import { createElement } from 'inferno-create-element';
var { Provider } = require('inferno-redux');

const rootProviderSymbol = Symbol();
class RootProvider extends Component {
	constructor() {
		super();
		this[rootProviderSymbol] = true;
	}

	static isRootProvider(elem) {
		return elem[rootProviderSymbol];
	}

	render() {
		if (!this.props.store) {
			throw (new Error("Error Root Provider expects a store passed in as a prop"));
		}

		let wrappedElements = []
		if (Array.isArray(this.props.children)) {
			this.props.children.forEach((element, index) => {
				if (!RootProvider.isRootProvider(element)) {
					wrappedElements.push(createElement(Provider, {key: index, store: this.props.store}, element));
				}
			});
		} else {
			wrappedElements.push(createElement(Provider, {key: 0, store: this.props.store}, this.props.children));
		}

		return createElement('div', null, wrappedElements);
	}
}

module.exports = RootProvider;
