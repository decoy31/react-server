import "./elements.scss";
import "./colors/red.scss";
import "./colors/blue.scss";
import "./colors/purple.scss";
import "./colors/green.scss";
import "./colors/orange.scss";
import "./colors/indigo.scss";
import "./colors/yellow.scss";

const RedThing = () => <div className="thing red-thing"> </div>;
const BlueThing = () => <div className="thing blue-thing"> </div>;
const PurpleThing = () => <div className="thing purple-thing"> </div>;
const GreenThing = () => <div className="thing green-thing"> </div>;
const OrangeThing = () => <div className="thing orange-thing"> </div>;
const IndigoThing = () => <div className="thing indigo-thing"> </div>;
const YellowThing = () => <div className="thing yellow-thing"> </div>;
const ColorWheel = [RedThing(), BlueThing(), PurpleThing(), GreenThing(),
	OrangeThing(), IndigoThing(), YellowThing()];

/**
* This page is a smoke test to determine whether or not the number of elements in
* a page is a performance bottleneck for react-server. It returns a huge assortment of
* randomly generated color-coded elements. Metrics are created in the browser's console
* related to performance metrics (see react-server.core.ClientController).
*/
export default class ElementsPage {

	getElements() {

		const colorThings = [];
		for (var i = 0; i < 10000; i++) {
			colorThings.push(ColorWheel[i%7]);
		};

		return (colorThings);
	}
}
