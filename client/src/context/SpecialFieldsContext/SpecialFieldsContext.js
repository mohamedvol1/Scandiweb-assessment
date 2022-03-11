import { createContext, useContext, useState } from 'react';

const SpecialFieldsContext = createContext();

export function useSpecialFields() {
	return useContext(SpecialFieldsContext);
}



const SpecialFieldsProvider = ({ children }) => {
	const [ value, setValue ] = useState({
		height: '',
    heightErr: false ,
		width: '',
    widthErr: false,
		length: '',
    lengthErr: false,
		weight: '',
    weightErr: false,
		size: '',
    sizeErr: false
	});

  return (
		<SpecialFieldsContext.Provider value={{ value, setValue }}>
			{children}
		</SpecialFieldsContext.Provider>
	);
  
};

export default SpecialFieldsProvider;

