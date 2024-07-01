import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';

const HeaderLayout = () => {
    return (
        <div>
            <Header />
            <main style={{ paddingTop: '76px', paddingBottom: '30px' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HeaderLayout;
