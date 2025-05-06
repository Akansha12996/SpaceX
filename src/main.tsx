import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme';
import { MantineProvider } from '@mantine/core';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import List from './pages/resources/List';
import Detail from './pages/resources/Detail';
import ProtectedRoute from './components/ProtectedRoute';

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Landing /> },
			{ path: '/login', element: <Login /> },
			{
				element: <ProtectedRoute />,
				children: [
					{ path: '/resources', element: <List /> },
					{ path: '/resources/:id', element: <Detail /> },
				],
			},
		],
	},
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
				<RouterProvider router={router} />
			</MantineProvider>
		</QueryClientProvider>
	</StrictMode>
);
