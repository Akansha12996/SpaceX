import { Button, Container, Title, Text, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
	const navigate = useNavigate();

	return (
		<Container
			style={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: "100vw",
				textAlign: "center"

			}}
		>
			<Image
				// width={500}
				radius="md"
				src="https://ebsedu.org/wp-content/uploads/elementor/thumbs/Elon-Musk-SpaceX-qrhfmhgqe2huzg4k3z2y0rmsiisq9mtdi80p1t479g.jpg"
				style={{ maxWidth: '100%' }}
			/>
			<Title order={1} mt="md">
				Welcome to the SpaceX Launch Explorer 🚀
			</Title>
			<Text mt="md" size="lg">
				Login to view and explore launch data with full access.
			</Text>
			<Button mt="xl" size="md" onClick={() => navigate('/login')}>
				Login
			</Button>

		</Container >
	);
};

export default Landing;
