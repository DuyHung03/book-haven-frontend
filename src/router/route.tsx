import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HeaderLayout from '../layout/HeaderLayout';
import BookDetails from '../pages/BookDetails';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HeaderLayout />,
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
                path: '/search',
                element: <Search />,
            },
            {
                path: '/book/:bookTitle',
                element: <BookDetails />,
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
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
