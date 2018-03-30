import "./nestedElementsDepth.scss";
import "./colors/red.scss";
import "./colors/blue.scss";
import "./colors/purple.scss";
import "./colors/green.scss";
import "./colors/orange.scss";
import "./colors/indigo.scss";
import "./colors/yellow.scss";

const RedThing = ({children, style}) => <div style={style} className="thing red-thing">{children}</div>;
const BlueThing = ({children, style}) => <div style={style} className="thing blue-thing">{children}</div>;
const PurpleThing = ({children, style}) => <div style={style} className="thing purple-thing">{children}</div>;
const GreenThing = ({children, style}) => <div style={style} className="thing green-thing">{children}</div>;
const OrangeThing = ({children, style}) => <div style={style} className="thing orange-thing">{children}</div>;
const IndigoThing = ({children, style}) => <div style={style} className="thing indigo-thing">{children}</div>;
const YellowThing = ({children, style}) => <div style={style} className="thing yellow-thing">{children}</div>;
const ColorWheel = [RedThing, BlueThing, PurpleThing, GreenThing,
	OrangeThing, IndigoThing, YellowThing];

/**
* This page is a smoke test to determine whether or not the number of deeply nested elements in
* a page is a performance bottleneck for react-server. It returns a huge assortment of
* randomly generated color-coded elements. Metrics are created in the browser's console
* related to performance metrics (see react-server.core.ClientController).
*/
export default class ElementsPage {

	getElements() {
		let width = 2;
		let height = 2;
		let parent = RedThing({ children: ' ', style: { width: `${width}px`, height: `${height}px` } });

		for (var i = 0; i < 100; i++) {
			width += 2;
			height += 2;
			parent = ColorWheel[i%7]({children: parent, style: { width: `${width}px`, height: `${height}px` }});
		}

		return parent;
	}
}
