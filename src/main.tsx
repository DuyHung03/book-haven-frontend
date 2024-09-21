import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </MantineProvider>
);
