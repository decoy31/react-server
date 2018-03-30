import { Component } from 'inferno';
import wireUpGitHubButton from '../lib/github-button';
import wireUpSlackinButton from '../lib/slackin-button';
import './Footer.less';

export default class Footer extends Component {
	render() {
		return (
			<footer>
				<p>
					<small>
						<a href="https://www.redfin.com/">Redfin</a> open-source project. &copy;2017 Redfin.
					</small>
				</p>
				<p>
					<small>
						<a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a> Talk with us on <a href="https://slack.react-server.io/">Slack</a>.
					</small>
				</p>
				<a href="https://github.com/redfin/react-server" className="github-button" data-count-href="/redfin/react-server/stargazers" data-count-api="/repos/redfin/react-server#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star redfin/react-server on GitHub">Star</a>
				&nbsp;
				<script async defer src="https://slack.react-server.io/slackin.js"></script>
			</footer>
		);
	}

	componentDidMount() {
		wireUpGitHubButton();
		wireUpSlackinButton();
	}
}
