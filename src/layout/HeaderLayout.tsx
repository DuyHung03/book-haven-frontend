import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';

const HeaderLayout = () => {
    history.scrollRestoration = 'manual';
    return (
        <div>
            <Header />
            <main style={{ marginTop: '76px', paddingBottom: '30px' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HeaderLayout;
