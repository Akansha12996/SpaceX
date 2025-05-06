import { useQuery } from '@tanstack/react-query';
import { Card, Container, Grid, Loader, Title } from '@mantine/core';
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
    <Container>
      <Title order={2}>SpaceX Launches</Title>
      <Grid>
        {data?.slice(0, 20).map((launch) => (
          <Grid.Col span={4} key={launch.id}>
            <Link to={`/resources/${launch.id}`} style={{ textDecoration: 'none' }}>
              <Card shadow="sm" padding="md" radius="md" withBorder>
                <Title order={4}>{launch.name}</Title>
                <p>{new Date(launch.date_utc).toLocaleDateString()}</p>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default List;
