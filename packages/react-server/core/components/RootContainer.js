var { Component } = require('inferno');
var {
	ensureRootElementWithContainer,
	getRootElementAttributes,
} = require('./RootElement');

class RootContainer extends Component {
	render() {
		throw new Error("RootContainers can't go in non-RootContainers!");
	}
}

module.exports = RootContainer;

RootContainer.defaultProps = {
	_isRootContainer: true,
}

RootContainer.flattenForRender = function(element) {
	return [{containerOpen: getRootElementAttributes(element)}]
		.concat(prepChildren(element))
		.concat([{containerClose: true}])
		.reduce((m,v) => m.concat(Array.isArray(v)?v:[v]), [])
}

RootContainer.isRootContainer = function(element) {
	return element && element.props && element.props._isRootContainer;
}

function prepChildren (element) {
	const children = [...element.props.children];
	return children.map(
		child => RootContainer.isRootContainer(child)
			?RootContainer.flattenForRender(child)
			:ensureRootElementWithContainer(child, element)
	)
}
