import {createStore, applyMiddleware} from "redux";
import { Component } from 'inferno';
import { connect } from 'inferno-redux';
import {RootElement} from "react-server";
import {RootProvider, ReduxAdapter} from "react-server-redux";
import ReduxThunk from "redux-thunk";

function reduxAdapterReducer(state = {}, action) {
	if (action.type === 'ACTION_ROUTE') {
		return Object.assign({}, state, {
			routeData: action.data,
		});
	} else if (action.type === 'ACTION_ELEMENT') {
		return Object.assign({}, state, {
			elementData: action.data,
		});
	}

	return state;
}

function initAction() {
	return function (dispatch) {
		setTimeout(() => {
			dispatch({type: 'ACTION_ROUTE', data: 'Route data'});
		}, 500);

		setTimeout(() => {
			dispatch({type: 'ACTION_ELEMENT', data: 'Element data'});
		}, 3000);

	}
}

class BasicComponent extends Component {
	render() {
		return (<div>{this.props.elementData}</div>)
	}
}

const mapStateToProps = function(state) {
	return {
		elementData: state.elementData,
	}
}

const BasicReduxComponent = connect(mapStateToProps)(BasicComponent);

export default class ReduxAdapterPage {
	handleRoute() {
		this._store = createStore(reduxAdapterReducer, {}, applyMiddleware(ReduxThunk));
		this._storeAdapter = new ReduxAdapter(this._store);
		this._store.dispatch(initAction());
		return this._storeAdapter.when(['routeData']).then((state) => {
			if (state.routeData) {
				return {code: 200};
			}

			return {code: 400};
		});
	}

	getElements() {
		return [
			<RootProvider store={this._store}>
				<RootElement when={this._storeAdapter.when(['elementData'])}>
					<BasicReduxComponent></BasicReduxComponent>
				</RootElement>
			</RootProvider>,
		]
	}
}
