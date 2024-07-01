import {
    Button,
    Flex,
    Group,
    HoverCard,
    HoverCardDropdown,
    HoverCardTarget,
    Text,
    UnstyledButton,
} from '@mantine/core';
import { ArrowRight } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { genres } from '../util/constant';

const GenreBar = () => {
    return (
        <Flex p={24} pl={176} justify={'flex-start'} align={'center'} w={'100%'}>
            <HoverCard>
                <HoverCardTarget>
                    <Button bg={'cyan'} leftSection={<MenuIcon />}>
                        All Categories
                    </Button>
                </HoverCardTarget>
                <HoverCardDropdown>
                    <Flex direction={'column'} align={'flex-start'}>
                        {genres.map((genre, index) => (
                            <Button
                                variant='transparent'
                                leftSection={<ArrowRight fontSize='small' />}
                                key={index}
                            >
                                <Text c={'black'}>{genre}</Text>
                            </Button>
                        ))}
                        <Button variant='transparent' leftSection={<ArrowRight fontSize='small' />}>
                            <Text c={'black'}>All books</Text>
                        </Button>
                    </Flex>
                </HoverCardDropdown>
            </HoverCard>

            <Group ml={12}>
                {genres.slice(0, 5).map((genre, index) => (
                    <UnstyledButton key={index}>
                        <Text>{genre}</Text>
                    </UnstyledButton>
                ))}
            </Group>
        </Flex>
    );
};

export default GenreBar;
