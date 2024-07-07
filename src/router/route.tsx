import { RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import CheckoutLayout from '../layout/CheckoutLayout';
import HeaderLayout from '../layout/HeaderLayout';
import Address from '../pages/Address';
import BookDetails from '../pages/BookDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PaymentResult from '../pages/PaymentResult';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <ScrollRestoration />
                <HeaderLayout />
            </>
        ),
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'search',
                element: <Search />,
            },
            {
                path: 'book/:bookTitle',
                element: <BookDetails />,
            },
            {
                path: 'cart/:userId',
                element: <Cart />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/checkout/:userId',
        element: (
            <>
                <ScrollRestoration />
                <CheckoutLayout />
            </>
        ),
        children: [
            {
                path: '',
                element: <Checkout />,
            },
            {
                path: 'address',
                element: <Address />,
            },
        ],
    },
    {
        path: '/payment_return',
        element: <PaymentResult />,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
