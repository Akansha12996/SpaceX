import { Button, Container, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
	const navigate = useNavigate();

	return (
		<Container mt="xl" ta="center">
			<Title order={1}>Welcome to the SpaceX Launch Explorer 🚀</Title>
			<Text mt="md" size="lg">
				Login to view and explore launch data with full access.
			</Text>
			<Button mt="xl" size="md" onClick={() => navigate('/login')}>
				Login
			</Button>
		</Container>
	);
};

export default Landing;
