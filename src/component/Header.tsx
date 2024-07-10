'use client';
import {
    Avatar,
    Button,
    CloseButton,
    Group,
    Image,
    Input,
    Text,
    UnstyledButton,
} from '@mantine/core';
import { FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_only.png';
import useCartStore from '../store/useCartStore';
import useUserStore from '../store/useUserStore';
import styles from '../style/Header.module.scss';
import GenreBar from './GenreBar';

const Header = () => {
    const { user, token } = useUserStore();
    const { cartItems } = useCartStore();
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    function isTokenExpired(token: string | null | undefined) {
        if (token != null) {
            const decodedToken = jwtDecode<{ exp: number }>(token);
            if (decodedToken && decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
                return true;
            }
        }
        return false;
    }

    const handleSearchClick = () => {
        if (searchValue.trim()) {
            console.log('Searching for:', searchValue);
            navigate(`/search?query=${searchValue}`);
        }
    };

    const handleKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSearchClick();
    };

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
                </Group>

                <Input
                    onKeyDown={handleKeyEnter}
                    w={350}
                    radius={'xl'}
                    size='md'
                    placeholder='Search'
                    leftSectionPointerEvents='all'
                    rightSectionPointerEvents='all'
                    leftSection={
                        <Search
                            fontSize='small'
                            onClick={handleSearchClick}
                            style={{ cursor: 'pointer' }}
                        />
                    }
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    rightSection={
                        <CloseButton
                            aria-label='Clear input'
                            size={'sm'}
                            onClick={() => setSearchValue('')}
                            style={{ display: searchValue ? undefined : 'none' }}
                        />
                    }
                />

                <Group>
                    {!user.userId || isTokenExpired(token) ? (
                        <Group>
                            <Link to='/signup'>
                                <Button variant='outline' radius={'md'}>
                                    Sign up
                                </Button>
                            </Link>
                            <Link to='/login'>
                                <Button variant='filled' radius={'md'}>
                                    Login
                                </Button>
                            </Link>
                        </Group>
                    ) : (
                        <Group grow>
                            <UnstyledButton>
                                <Badge badgeContent={0} color='error'>
                                    <FavoriteBorderOutlined fontSize='large' color='error' />
                                </Badge>
                            </UnstyledButton>

                            <UnstyledButton>
                                <Link to={`/cart/${user.userId}`}>
                                    <Badge badgeContent={cartItems.length} color='error'>
                                        <ShoppingCartOutlined fontSize='large' color='primary' />
                                    </Badge>
                                </Link>
                            </UnstyledButton>

                            <Link to='/profile'>
                                <Avatar src={user.photoUrl} alt='avatar' size={'lg'} />
                            </Link>
                        </Group>
                    )}
                </Group>
            </Group>
            <GenreBar />
        </header>
    );
};

export default Header;
