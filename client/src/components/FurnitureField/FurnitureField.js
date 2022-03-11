import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment } from 'react';
import { useSpecialFields } from '../../context/SpecialFieldsContext/SpecialFieldsContext';

const FurnitureField = () => {
	const { value, setValue } = useSpecialFields();
	const { height, heightErr, width, widthErr, length, lengthErr } = value;

	const handleInput = (event, inputType) => {
		setValue({ ...value, [inputType]: event.target.value });
	};
	
	return (
		<Fragment>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
				<Typography sx={{ py: '1rem' }}> Height </Typography>
				<TextField
					sx={{ width: '260px' }}
					id="height"
					label="Height"
					variant="outlined"
					value={height}
					onChange={(event) => handleInput(event, 'height')}
					error={heightErr}
				/>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
				<Typography sx={{ py: '1rem' }}> Width </Typography>
				<TextField
					sx={{ width: '260px' }}
					id="width"
					label="Width"
					variant="outlined"
					value={width}
					onChange={(event) => handleInput(event, 'width')}
					error={widthErr}
				/>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
				<Typography sx={{ py: '1rem' }}> Length </Typography>
				<TextField
					sx={{ width: '260px' }}
					id="length"
					label="Length"
					variant="outlined"
					value={length}
					onChange={(event) => handleInput(event, 'length')}
					error={lengthErr}
				/>
			</Box>
			<Typography color="text.secondary">“Please, provide dimensions” </Typography>
		</Fragment>
	);
};

export default FurnitureField;
