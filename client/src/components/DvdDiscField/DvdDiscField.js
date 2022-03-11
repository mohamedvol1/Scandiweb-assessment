import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment } from 'react';
import { useSpecialFields } from '../../context/SpecialFieldsContext/SpecialFieldsContext';

const DvdDiscField = () => {
	const { value, setValue } = useSpecialFields()
	const handleInput = (event) => {
		setValue({...value, size: event.target.value})
	}
	return (
		<Fragment>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
				<Typography sx={{ py: '1rem' }}> Size (MB)</Typography>
				<TextField
					sx={{ width: '200px' }}
					id="size"
					label="Size"
					variant="outlined"
					value={value.size}
					onChange={handleInput}
					error={value.sizeErr}
				
				/>
			</Box>
			<Typography color="text.secondary"> “Please, provide size”</Typography>
		</Fragment>
	);
};

export default DvdDiscField;
