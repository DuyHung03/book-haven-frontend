import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    ScrollRestoration,
} from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import CheckoutLayout from '../layout/CheckoutLayout';
import HeaderLayout from '../layout/HeaderLayout';
import Address from '../pages/Address';
import AdminHome from '../pages/admin/AdminHome';
import AdminLogin from '../pages/AdminLogin';
import BookDetails from '../pages/BookDetails';
import Cart from '../pages/Cart';
import ChangePassword from '../pages/ChangePassword';
import Checkout from '../pages/Checkout';
import EditProfile from '../pages/EditProfile';
import EmailVerify from '../pages/EmailVerify';
import Error404 from '../pages/Error404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OrderDetail from '../pages/OrderDetail';
import PaymentResult from '../pages/PaymentResult';
import Search from '../pages/Search';
import SignUp from '../pages/SignUp';
import User from '../pages/User';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Public Routes with Header Layout */}
            <Route path='/' element={<HeaderLayout />} errorElement={<Error404 />}>
                <Route index element={<Home />} />
                <Route path='search' element={<Search />} />
                <Route path='book/:bookTitle' element={<BookDetails />} />
            </Route>

            {/* Authentication Routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/login-admin' element={<AdminLogin />} />
            <Route path='/signup' element={<SignUp />} />

            {/* Protected User Routes with Header Layout */}
            <Route
                path='/user'
                element={
                    <>
                        <ScrollRestoration />
                        <ProtectedRoute element={<HeaderLayout />} allowedRoles={['ROLE_USER']} />
                    </>
                }
                errorElement={<Error404 />}
            >
                <Route path='cart/:userId' element={<Cart />} />
                <Route path=':userId' element={<User />} />
                <Route path=':userId/verification' element={<EmailVerify />} />
                <Route path=':userId/change-password' element={<ChangePassword />} />
                <Route path=':userId/edit-profile' element={<EditProfile />} />
                <Route path='order/:orderId' element={<OrderDetail />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route
                path='/admin'
                element={<ProtectedRoute element={<AdminLayout />} allowedRoles={['ROLE_ADMIN']} />}
                errorElement={<Error404 />}
            >
                <Route index element={<AdminHome />} />
            </Route>

            {/* Checkout Protected Routes */}
            <Route
                path='/checkout/:userId'
                element={
                    <>
                        <ScrollRestoration />
                        <ProtectedRoute element={<CheckoutLayout />} allowedRoles={['ROLE_USER']} />
                    </>
                }
                errorElement={<Error404 />}
            >
                <Route index element={<Checkout />} />
                <Route path='address' element={<Address />} />
            </Route>

            {/* Payment Result */}
            <Route path='/payment_return' element={<PaymentResult />} />
        </>
    )
);

export default function Router() {
    return <RouterProvider router={router} />;
}
