import Inferno from 'inferno';
import {logging, Link} from 'react-server';

const logger = logging.getLogger(__LOGGER__);

const NetworkCard = ({id, name, location, company}) => {
	logger.info(`rendering card for network ${name}`);
	return (
		<div><Link path={`/network?network=${id}`}>{name}</Link> in {location.city}, {location.country}, run by {company}</div>
	);
};

NetworkCard.displayName = 'NetworkCard';

export default NetworkCard;
