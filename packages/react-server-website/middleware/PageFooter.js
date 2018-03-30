import Footer from '../components/Footer';

export default class PageFooter {
	getElements(next) {
		return next().concat(<Footer />);
	}
}
