import { Outlet } from 'react-router-dom';
import './App.scss';

import { Container } from '@mantine/core';

const App = () => {
	return (
		<Container mt="md">
			<Outlet />
		</Container>
	);
};

export default App;
