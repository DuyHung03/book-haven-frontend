import { Grid, GridCol } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';
import SideBar from '../component/admin/SideBar';

const AdminLayout = () => {
    return (
        <div>
            <Grid>
                <GridCol span={2}>
                    <SideBar />
                </GridCol>
                <GridCol span={10}>
                    <Outlet />
                </GridCol>
            </Grid>

            <Footer />
        </div>
    );
};

export default AdminLayout;
