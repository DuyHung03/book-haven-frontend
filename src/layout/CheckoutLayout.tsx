import { Outlet } from 'react-router-dom';
import CheckoutHeader from '../component/CheckoutHeader';
import Footer from '../component/Footer';

const CheckoutLayout = () => {
    return (
        <div>
            <CheckoutHeader />
            <main style={{ marginTop: '120px', paddingBottom: '30px' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutLayout;
