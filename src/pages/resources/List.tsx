import { useQuery } from '@tanstack/react-query';
import { Card, Container, Grid, Loader, Title, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface Launch {
  id: string;
  name: string;
  date_utc: string;
}

const fetchLaunches = async () => {
  const res = await fetch('https://api.spacexdata.com/v4/launches');
  return res.json();
};

const List = () => {
  const { data, isLoading } = useQuery<Launch[]>({
    queryKey: ['launches'],
    queryFn: fetchLaunches,
  });

  if (isLoading) return <Loader />;

  return (
    <Container size="lg" py="xl">
      <Title order={4} mb="sm" align="center">
        🚀 SpaceX Launches
      </Title>

      <Grid gutter="lg">
        {data?.slice(0, 20).map((launch) => (
          <Grid.Col xs={12} sm={6} md={4} key={launch.id}>
            <Link
              to={`/resources/${launch.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card
                shadow="md"
                padding="lg"
                radius="lg"
                withBorder
                style={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 20px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <Title order={4} mb="sm">
                  {launch.name}
                </Title>
                <Text size="sm" color="dimmed">
                  {new Date(launch.date_utc).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </Container>



  );
};

export default List;
