import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { memo } from 'react';

import Observable from '../../observables/Observable';

const updateIds = (bool, id) => {
	if (bool) {
		Observable.idsList = [ ...Observable.idsList, id ];
	} else {
		Observable.idsList = Observable.idsList.filter((value) => value !== id);
	}
};

Observable.subscribe(updateIds);

const handleClick = (bool, id) => {
	Observable.notify(bool, id);
};

const ProductCard = ({ data }) => {
	const { id, sku, title, price, description, specialAttr } = data;

	return (
		<Card sx={{ display: 'flex', justifyContent: 'center', minWidth: 300, mx: '1rem', my: '1rem' }}>
			<Checkbox
				className="delete-checkbox"
				sx={{ alignSelf: 'flex-start', flexShrink: 1 }}
				onClick={(e) => handleClick(e.target.checked, id)}
			/>
			<CardContent sx={{ textAlign: 'center', width: '100%', pr: '2rem' }}>
				<Typography variant="h6" component="div">
					{sku}
				</Typography>
				<Typography variant="h6" component="div">
					{title}
				</Typography>
				<Typography variant="h6" component="div">
					{price} $
				</Typography>
				<Typography variant="h6" component="div">
					{specialAttr}: {description}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default memo(ProductCard);
