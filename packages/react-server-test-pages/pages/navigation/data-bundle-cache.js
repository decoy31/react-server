import { Component } from "inferno";
import DataBundleCache from "react-server-data-bundle-cache";
import {
	Link,
	RootContainer,
} from "react-server";
import {
	GET,
	ROWS,
	PagePointer,
	RowIndex,
	RowMS,
	ClientRenderIndicator,
} from "./common";

require("./common.css");
require("./data-bundle-cache.css");

DataBundleCache.install();

const BASE = "/navigation/data-bundle-cache";
const LINK = page => `${BASE}?page=${page}`

const BundleLink = ({row}) => <Link bundleData={true} reuseDom={true} path={LINK(row)}>Go</Link>

class PreloadLink extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	_preload(){
		this.setState({loading: true});
		DataBundleCache
			.preload(LINK(this.props.row))
			.then(() => this.setState({loading: false}))
			.catch(err => console.error('preload failed', err));
	}
	render() {
		return <div className="preload">{this.state.loading
			?'⌛️'
			:<a className="preload" onClick={this._preload.bind(this)}>Preload</a>
		}</div>

	}
}

let _cacheEnabled = false;

class CacheToggle extends Component {
	_toggle() {
		this.setState({on: _cacheEnabled = !_cacheEnabled});
	}
	render() {
		return <div>
			<a className="toggle" onClick={this._toggle.bind(this)}>
				{_cacheEnabled?'Disable':'Enable'} cache
			</a>
		</div>
	}
}

export default class DataBundleCachePage {
	handleRoute(next) {
		const {page} = this.getRequest().getQuery();
		this.data = ROWS.map(GET.bind({page}));

		if (_cacheEnabled) {
			DataBundleCache.optIn();
		}

		return next();
	}
	getElements() {
		return [
			<RootContainer>
				<h1>Data Bundle Cache</h1>
				<CacheToggle />
			</RootContainer>,
			...this.data.map(promise => <RootContainer when={promise} className="row">
				<PagePointer />
				<RowIndex />
				<RowMS />
				<ClientRenderIndicator />
				<PreloadLink />
				<BundleLink />
			</RootContainer>),
		]
	}
}
