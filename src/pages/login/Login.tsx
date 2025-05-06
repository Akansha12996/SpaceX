import { Container, Title, TextInput, Button, Paper, Group, useMantineTheme, Flex } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const theme = useMantineTheme()
  const handleLogin = () => {
    if (username && password) {
      login();
      navigate('/resources');
    }
  };

  return (

    <Container size="xs" style={{ padding: theme.spacing.md }}>
      <Paper
        shadow="sm"
        style={{
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.primary[0],
          padding: theme.spacing.lg,
        }}
      >
        <Title order={2} align="center" style={{ marginBottom: theme.spacing.md, color: theme.colors.primary[6] }}>
          Login
        </Title>

        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: theme.spacing.sm }}
          placeholder="Enter your username"
          radius="md"
          withAsterisk
          styles={{
            label: {
              color: theme.colors.primary[7],
              fontWeight: 500,
            }
          }
          }
        />

        <TextInput
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: theme.spacing.lg }}
          placeholder="Enter your password"
          radius="md"
          withAsterisk
          styles={{
            label: {
              color: theme.colors.primary[7],
              fontWeight: 500,
            }
          }
          }
        />

        <Group position="center">
          <Button
            onClick={handleLogin}
            style={{
              width: '100%',
              backgroundColor: theme.colors.primary[6], // Using primary color
              color: '#fff',
              borderRadius: theme.radius.md,
              fontWeight: 600,
            }}
            size="lg"
            mt="md"
            radius="md"
            fullWidth

          >
            Login
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default Login;
