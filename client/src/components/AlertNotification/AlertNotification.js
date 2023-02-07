import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useState } from 'react';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const AlertNotification = ({ message, fieldName }) => {
	const [ ishidden, setIshidden ] = useState(false);

	const handleClick = () => {
		setIshidden(true);
	};

	return (
		<Fragment>
			<Box
				sx={{
					display: ishidden ? 'none' : 'flex',
					backgroundColor: 'rgb(253 237 237)',
					justifyContent: 'space-between',
					py: '1rem',
					px: '2rem',
					mb: '1rem'
				}}
			>
				<Typography>
					{fieldName ? (
						<span>
							{message} — check {fieldName} field!
						</span>
					) : (
						<span>{message} - Bad request!</span>
					)}
				</Typography>
				<CancelOutlinedIcon onClick={handleClick} sx={{ '&:hover': { cursor: 'pointer' } }} />
			</Box>
		</Fragment>
	);
};

export default AlertNotification;
