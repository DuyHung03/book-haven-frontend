import { RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import CheckoutLayout from '../layout/CheckoutLayout';
import HeaderLayout from '../layout/HeaderLayout';
import Address from '../pages/Address';
import BookDetails from '../pages/BookDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OrderDetail from '../pages/OrderDetail';
import PaymentResult from '../pages/PaymentResult';
import Search from '../pages/Search';
import SignUp from '../pages/SignUp';
import User from '../pages/User';

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
            {
                path: '/user',
                element: <User />,
            },
            {
                path: '/order/:orderId',
                element: <OrderDetail />,
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
