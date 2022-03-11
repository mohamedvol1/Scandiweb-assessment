import { Box, Button, Divider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Fragment, useState } from 'react';

import { validateIntegerValue, validateStringValue } from '../../pages/AddProductPage/formValidations';
import { useSpecialFields } from '../../context/SpecialFieldsContext/SpecialFieldsContext';
import BookField from '../BookField/BookField';
import DvdDiscField from '../DvdDiscField/DvdDiscField';
import FurnitureField from '../FurnitureField/FurnitureField';

import ErrObservable from '../../observables/ErrObservable';
import AlertNotification from '../AlertNotification/AlertNotification';
import { httpPostProduct } from '../../hooks/requests';
import { useNavigate } from 'react-router-dom';

const pushErrMsg = (msg, field) => {
	ErrObservable.errMsgList = [ ...ErrObservable.errMsgList, { msg, field } ];
};
ErrObservable.subscribe(pushErrMsg);

const handleErrMsg = (msg, field) => {
	ErrObservable.notify(msg, field);
};

const ProductForm = () => {
	const navigate = useNavigate();

	const { value, setValue } = useSpecialFields();

	const [ type, setType ] = useState('Furniture');

	const [ sku, setSku ] = useState('');
	const [ skuErr, setSkuErr ] = useState(false);

	const [ name, setName ] = useState('');
	const [ nameErr, setNameErr ] = useState(false);

	const [ price, setPrice ] = useState('');
	const [ priceErr, setPriceErr ] = useState(false);

	const [ errors, setErrors ] = useState([]);

	const formTypes = {
		Furniture: <FurnitureField />,
		Book: <BookField />,
		DVD: <DvdDiscField />
	};

	const handleSwitch = (event) => {
		// cleaning Context
		setValue({
			height: '',
			width: '',
			length: '',
			weight: '',
			size: '',
			heightErr: false,
			widthErr: false,
			lengthErr: false,
			weightErr: false,
			sizeErr: false
		});
		// map to special form
		setType(event.target.value);
	};

	const validateForm = () => {
		let validForm = true;
		const validateSku = validateStringValue(sku);
		setSkuErr(validateSku.err);
		if (validateSku.err) {
			//notfy the error message
			handleErrMsg(validateSku.errMsg, 'sku');
			validForm = false;
			// return false;
		}

		const validateName = validateStringValue(name);
		setNameErr(validateName.err);
		if (validateName.err) {
			handleErrMsg(validateName.errMsg, 'name');
			validForm = false;
			// return false;
		}

		const validatePrice = validateIntegerValue(price);
		setPriceErr(validatePrice.err);
		if (validatePrice.err) {
			handleErrMsg(validatePrice.errMsg, 'price');
			validForm = false;
			// return false;
		}

		// validate the choosen field
		if (type === 'Furniture') {
			const height = validateIntegerValue(value.height);
			if (height.errMsg) {
				//push error msg to array
				handleErrMsg(height.errMsg, 'height');
			}

			const width = validateIntegerValue(value.width);
			if (width.errMsg) {
				//push error msg to array
				handleErrMsg(width.errMsg, 'width');
			}

			const length = validateIntegerValue(value.length);
			if (length.errMsg) {
				//push error msg to array
				handleErrMsg(length.errMsg, 'length');
			}

			setValue({
				...value,
				heightErr: height.err,
				widthErr: width.err,
				lengthErr: length.err
			});

			if (height.err || width.err || length.err) {
				validForm = false;
				// return false;
			}
		} else if (type === 'Book') {
			const weight = validateIntegerValue(value.weight);
			setValue({ ...value, weightErr: weight.err });
			if (weight.err) {
				handleErrMsg(weight.errMsg, 'weight');
				validForm = false;
				// return false;
			}
		} else {
			const size = validateIntegerValue(value.size);
			setValue({ ...value, sizeErr: size.err });
			if (size.err) {
				handleErrMsg(size.errMsg, 'weight');
				validForm = false;
				// return false;
			}
		}

		return validForm ? true : false;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			setErrors([ ...ErrObservable.errMsgList ]);
			ErrObservable.emptyMsgList();
			return false;
		}

		// make sure errors list is empty
		ErrObservable.emptyMsgList();
		setErrors([]);

		let attributes = {
			title: name,
			sku,
			price,
			type
		};

		let specialAttr = {};
		if (type === 'Furniture') {
			const { height, width, length } = value;
			specialAttr = {
				height,
				width,
				length
			};
		} else if (type === 'Book') {
			const { weight } = value;
			specialAttr = {
				weight
			};
		} else {
			const { size } = value;
			specialAttr = {
				size
			};
		}

		// attributes = Object.assign(attributes, specialAttr);
		const data = { ...attributes, ...specialAttr };
		httpPostProduct(data).then((res) => navigate('/')).catch((err) => alert('bad request'));

		return
	};

	const handleCancel = () => {
		navigate('/');
	};

	return (
		<Fragment>
			<Box component="form" action="">
				<Box sx={{ backgroundColor: '', height: '100px' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							height: '90%',
							px: '2rem'
						}}
					>
						<Typography variant="h4">Product Add</Typography>
						<div className="header-buttons">
							<Button type="submit" onClick={handleSubmit} sx={{ mr: '1rem' }} variant="contained">
								Save
							</Button>
							<Button onClick={handleCancel} variant="outlined" color="error">
								Cancel
							</Button>
						</div>
					</Box>
					<Divider sx={{ mt: '1rem', mx: '2rem' }} variant="middle" />
				</Box>
				{errors.length ? (
					errors.map(({ msg, field }) => <AlertNotification key={field} message={msg} fieldName={field} />)
				) : null}

				<Box
					// component="form"
					// action=""
					id="product_form"
					sx={{ display: 'flex', mx: '2rem', my: '2rem', flexDirection: 'column', maxWidth: '320px' }}
					onSubmit={handleSubmit}
				>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
						<Typography sx={{ py: '1rem' }}> SKU </Typography>
						<TextField
							value={sku}
							onChange={(e) => setSku(e.target.value)}
							sx={{ width: '260px' }}
							id="sku"
							label="SKU"
							variant="outlined"
							error={skuErr}
							// required
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							mb: '2rem'
						}}
					>
						<Typography sx={{ py: '1rem' }}> Name </Typography>
						<TextField
							value={name}
							onChange={(e) => setName(e.target.value)}
							sx={{ width: '260px' }}
							id="name"
							label="Name"
							variant="outlined"
							error={nameErr}
							// required
						/>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}>
						<Typography sx={{ py: '1rem' }}> Price $ </Typography>
						<TextField
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							// type="number"
							// inputProps={{ min: 0 }}
							sx={{ width: '260px' }}
							id="price"
							label="Price"
							variant="outlined"
							error={priceErr}
							// required
						/>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '4rem' }}>
						<Typography sx={{ py: '1rem' }}> Type Switcher </Typography>
						<select id="productType" style={{ width: '150px' }} value={type} onChange={handleSwitch}>
							<option id="Furniture" value="Furniture">
								Furniture
							</option>
							<option id="Book" value="Book">
								Book
							</option>
							<option id="DVD" value="DVD">
								DVD
							</option>
						</select>
					</Box>
					{formTypes[type]}
				</Box>
			</Box>
		</Fragment>
	);
};

export default ProductForm;
