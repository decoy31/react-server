import { Component } from 'inferno';
import Markdown from './Markdown';

export default class DocBody extends Component {
	render() {
		return (
			<article className="DocBody">
				<Markdown source={this.props.text} reuseDom />
			</article>
		);
	}
}
