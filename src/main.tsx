import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import Router from './router/route';
import './style/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <Router />
    </MantineProvider>
);
