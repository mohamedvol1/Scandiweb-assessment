import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment } from 'react';
import { useSpecialFields } from '../../context/SpecialFieldsContext/SpecialFieldsContext';

const BookField = () => {
	const { value, setValue } = useSpecialFields()
	const handleInput = (event) => {
		setValue({...value, weight: event.target.value})
	}
	return (
		<Fragment>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
				<Typography sx={{ py: '1rem' }}> Weight (KG)</Typography>
				<TextField
					// type="number"
					// inputProps={{ min: 0 }}
					sx={{ width: '200px' }}
					id="weight"
					label="Weight"
					variant="outlined"
					value={value.weight}
					onChange={handleInput}
					error={value.weightErr}
				/>
			</Box>
			<Typography color="text.secondary">“Please, provide weight”</Typography>
		</Fragment>
	);
};

export default BookField;
