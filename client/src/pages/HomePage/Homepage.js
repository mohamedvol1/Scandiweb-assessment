import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductCard from '../../components/ProductCard/ProductCard';

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import Observable from '../../observables/Observable';

import { httpDeleteProducts, httpGetProducts } from '../../hooks/requests';

const HomePage = () => {
	const navigate = useNavigate();
	const [ products, setProducts ] = useState([]);
	const [ update, setUpdate ] = useState(false);

	useEffect(
		() => {
			httpGetProducts()
				.then((data) => {
					setProducts(data);
				})
				.catch((err) => console.log(err));
		},
		[ update ]
	);

	const handleMassDelete = (list) => {
		// post request
		httpDeleteProducts(list)
			.then((res) => {
				console.log('response here', res);
				Observable.emptyIdsList();
				setUpdate(!update);
			})
			.catch(() => alert('bad request'));
		// await navigate('/');
		console.log('come after wait');
	};

	const handleAddClick = () => {
		navigate('/addproduct');
	};

	return (
		<Fragment>
			<Box sx={{ backgroundColor: '', height: '100px' }}>
				<Box
					component="form"
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
						height: '90%',
						px: '2rem'
					}}
				>
					<Typography variant="h4">Products List</Typography>
					<div className="header-buttons">
						<Button onClick={handleAddClick} sx={{ mr: '1rem' }} variant="contained">
							ADD
						</Button>
						<Button
							onClick={() => {
								handleMassDelete(Observable.idsList);
							}}
							variant="outlined"
							color="error"
						>
							MASS DELETE
						</Button>
					</div>
				</Box>
				<Divider sx={{ mt: '1rem', mx: '2rem' }} variant="middle" />
			</Box>
			{
				<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mx: '2rem', py: '2rem' }}>
					{!products.length ? (
						<h1>Loading ...</h1>
					) : (
						products.map((ProductData) => <ProductCard key={ProductData.id} data={ProductData} />)
					)}
				</Box>
			}
		</Fragment>
	);
};

export default HomePage;
