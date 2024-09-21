import emailjs from '@emailjs/browser';
import Router from './router/route';

function App() {
    emailjs.init({
        publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
        limitRate: {
            // Set the limit rate for the application
            id: 'app',
            // Allow 1 request per 10s
            throttle: 10000,
        },
        blockHeadless: true,
    });
    return <Router />;
}

export default App;
