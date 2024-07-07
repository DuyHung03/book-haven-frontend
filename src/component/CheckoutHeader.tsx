import { Group, Image, Text } from '@mantine/core';
import logo from '../assets/logo_only.png';
import styles from '../style/Header.module.scss';
const CheckoutHeader = () => {
    return (
        <header className={styles.wrapper}>
            <Group display={'flex'} justify='space-between' align='center'>
                <Group align='center' className={styles.logoContainer}>
                    <a href='/' className={styles.logo}>
                        <Image alt='logo' src={logo} width={76} height={76} />
                        <Text
                            c='cyan'
                            fw={'bold'}
                            style={{ letterSpacing: 1.25 }}
                            size={'xl'}
                            ml={12}
                        >
                            Book Haven
                        </Text>
                    </a>
                    <hr style={{ height: '54px', borderLeft: '1px solid #0097B2' }} />
                    <Text c='cyan' fw={'bold'} lts={'1.5px'} size={'xl'} ml={12}>
                        Checkout
                    </Text>
                </Group>
            </Group>
        </header>
    );
};

export default CheckoutHeader;
