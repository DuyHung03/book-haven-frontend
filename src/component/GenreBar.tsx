import {
    Button,
    Flex,
    Group,
    HoverCard,
    HoverCardDropdown,
    HoverCardTarget,
    Text,
} from '@mantine/core';
import { ArrowRight } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { genres } from '../util/constant';

const GenreBar = () => {
    return (
        <Flex p={12} justify={'center'} align={'center'} w={'100%'}>
            <HoverCard>
                <HoverCardTarget>
                    <Button bg={'cyan'} leftSection={<MenuIcon />}>
                        All Categories
                    </Button>
                </HoverCardTarget>
                <HoverCardDropdown>
                    <Flex direction={'column'} align={'flex-start'}>
                        {genres.map((genre, index) => (
                            <Link to={`/search?genre=${genre}`}>
                                <Button
                                    variant='transparent'
                                    leftSection={<ArrowRight fontSize='small' />}
                                    key={index}
                                >
                                    <Text c={'black'}>{genre}</Text>
                                </Button>
                            </Link>
                        ))}
                        <Button variant='transparent' leftSection={<ArrowRight fontSize='small' />}>
                            <Text c={'black'}>All books</Text>
                        </Button>
                    </Flex>
                </HoverCardDropdown>
            </HoverCard>

            <Group ml={12}>
                {genres.slice(0, 5).map((genre, index) => (
                    <Link to={`/search?genre=${genre}`}>
                        <Button variant='transparent' color='black' key={index}>
                            <Text>{genre}</Text>
                        </Button>
                    </Link>
                ))}
            </Group>
        </Flex>
    );
};

export default GenreBar;
