

const httpGetProducts = async () => {
	const response = await fetch('https://crd-products-app2.herokuapp.com/products');
	return await response.json();
};

const httpDeleteProducts = async (idsList) => {
	const response = await fetch('https://crd-products-app2.herokuapp.com/deleteChecked', {
		// crossDomain:true,
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify({
			idsList
		})
	});
	return await response.json();
};

const httpPostProduct = async (dataObj) => {
	const response = await fetch('https://crd-products-app2.herokuapp.com/addProduct', {
		// crossDomain:true,
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify({
			...dataObj
		})
	});
	return await response.json();
};

export { httpGetProducts, httpPostProduct, httpDeleteProducts };
