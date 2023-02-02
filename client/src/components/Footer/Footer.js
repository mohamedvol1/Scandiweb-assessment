import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';
// import {  useNavigate } from 'react-router-dom';

const Footer = () => {
	return (
		<Box sx={{ backgroundColor: '', height: '150px' }}>
			<Divider sx={{ mt: '1rem', mx: '2rem' }} variant="middle" />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Typography sx={{ mt: '1rem' }} variant="h7">
					<Link href="https://scandiweb.com/" target="_blank" sx={{ textDecoration: 'none', transition: 'color .3s',fontWeight: 'bold' ,  '&:hover': { color: '#e04f4f' } }}>
						Scandiweb
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
