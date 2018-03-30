import Inferno from 'inferno';
import {logging} from 'react-server';

const logger = logging.getLogger(__LOGGER__);
const timeSinceTimestamp = s => {
	const parsed = Date.parse(s);
	const timeSince = (new Date()) - parsed;
	const minutesSince = Math.floor(timeSince / 60000);
	const secondsSince = Math.floor((timeSince / 1000) % 60);
	return `${minutesSince} min, ${secondsSince} sec`;
};

const StationCard = ({station}) => {
	logger.info(`rendering card for station ${JSON.stringify(station)}`);
	return (
		<div>{station.name} had {station.empty_slots} empty slots {timeSinceTimestamp(station.timestamp)} ago.</div>
	);
};

StationCard.displayName = 'StationCard';

export default StationCard;
