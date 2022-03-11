import './App.css';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage/Homepage';
import AddProductPage from './pages/AddProductPage/AddProductPage';

import { Routes, Route } from 'react-router-dom';
import SpecialFieldsProvider from './context/SpecialFieldsContext/SpecialFieldsContext';



function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
        <Route path='/addproduct' element={<SpecialFieldsProvider children={<AddProductPage />} />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
