import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Container, Title, Text, Loader, Card, Divider, Space } from '@mantine/core';

interface Launch {
    name: string;
    date_utc: string;
    details: string;
    rocket: string; // rocket ID
}

interface Rocket {
    name: string;
    type: string;
    description: string;
}

const fetchLaunchById = async (id: string) => {
    const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
    return res.json();
};

const fetchRocketById = async (rocketId: string) => {
    const res = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketId}`);
    return res.json();
};

const Detail = () => {
    const { id } = useParams();

    const { data: launch, isLoading: loadingLaunch } = useQuery<Launch>({
        queryKey: ['launch', id],
        queryFn: () => fetchLaunchById(id!),
        enabled: !!id,
    });

    const { data: rocket, isLoading: loadingRocket } = useQuery<Rocket>({
        queryKey: ['rocket', launch?.rocket],
        queryFn: () => fetchRocketById(launch!.rocket),
        enabled: !!launch?.rocket,
    });

    if (loadingLaunch || loadingRocket) return <Loader />;

    return (
        // <Container>
        //     <Title order={2}>{launch?.name}</Title>
        //     <Text>Date: {launch?.date_utc ? new Date(launch.date_utc).toLocaleDateString() : 'N/A'}</Text>
        //     <Text mt="sm">{launch?.details || 'No description available.'}</Text>

        //     {rocket && (
        //         <Card shadow="md" padding="lg" mt="lg">
        //             <Title order={4}>Rocket Info</Title>
        //             <Text>Name: {rocket.name}</Text>
        //             <Text>Type: {rocket.type}</Text>
        //             <Text mt="sm">{rocket.description}</Text>
        //         </Card>
        //     )}
        // </Container>
        <Container size="md" py="xl">
            <Title order={2} mb="xs">
                🚀 {launch?.name || 'Launch Info'}
            </Title>
            <Text size="sm" color="dimmed">
                Date: {launch?.date_utc ? new Date(launch.date_utc).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }) : 'N/A'}
            </Text>

            <Space h="md" />

            <Text>
                {launch?.details || 'No description available.'}
            </Text>

            {rocket && (
                <>
                    <Divider my="xl" label="Rocket Info" labelPosition="center" />

                    <Card shadow="md" padding="xl" radius="md" withBorder>
                        <Title order={4} mb="sm">🚀 {rocket.name}</Title>
                        <Text size="sm" color="dimmed">Type: {rocket.type}</Text>
                        <Space h="sm" />
                        <Text>{rocket.description}</Text>
                    </Card>
                </>
            )}
        </Container>
    );
};

export default Detail;
