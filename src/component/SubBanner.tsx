import { BackgroundImage, Box, Flex, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const SubBanner = ({ direction, title }: { title: string; direction: string }) => {
    return (
        <Box w={'100%'}>
            <BackgroundImage src='https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/bg_breadcrumb.jpg?1719328879911'>
                <Flex direction={'column'} p={90} justify={'center'} align={'center'}>
                    <Text c='white' size='36px' fw={500} mb={12}>
                        {title}
                    </Text>
                    <Group>
                        <Link to={'/'}>
                            <Text c={'white'} td={'underline'}>
                                Home
                            </Text>
                        </Link>
                        <Text c={'white'}>{'>'}</Text>
                        <Text c={'white'}>{direction}</Text>
                    </Group>
                </Flex>
            </BackgroundImage>
        </Box>
    );
};

export default SubBanner;
