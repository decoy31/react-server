
var { Component } = require('inferno'),
	navigateTo = require("../util/navigateTo");

class Link extends Component {

	static get displayName() {
		return 'Link';
	}

	static get defaultProps() {
		return {
			bundleData : false,
			reuseDom   : false,
		};
	}

	constructor({
		path,
		href,
		onClick,
		bundleData,
		reuseDom,
		className,
	}) {
		super({ path, href, onClick, bundleData, reuseDom, className });

		this._onClick = this._onClick.bind(this);
	}

	render() {
		return (
			<a href={this.props.path || this.props.href} onClick={this._onClick} className={this.props.className}>{this.props.children}</a>
		);
	}

	_onClick(e) {

		// TODO: IE8-9 detection

		// TODO: if OSX && key.isMeta?
		if (!e.metaKey) {
			e.preventDefault();
			e.stopPropagation();
			const {bundleData, reuseDom} = this.props;
			navigateTo(this.props.path || this.props.href, {
				bundleData,
				reuseDom,
			});
			if (this.props.onClick) {
				this.props.onClick(e);
			}
		} else {
			// do normal browser navigate
		}
	}
}

module.exports = Link;
