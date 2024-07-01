import {
    Box,
    Flex,
    Grid,
    GridCol,
    Group,
    Image,
    Text,
    TextInput,
    UnstyledButton,
} from '@mantine/core';
import { ArrowRight, Send } from '@mui/icons-material';
import logo from '../assets/book_haven_logo.png';
const items = [
    {
        icon: 'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/policy1.png?1719328894255',
        title: 'Free Shipping',
        desc: 'Orders from 500,000 VND',
    },
    {
        icon: 'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/policy2.png?1719328894255',
        title: 'Easy and convenient',
        desc: 'Book on demand',
    },
    {
        icon: 'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/policy3.png?1719328894255',
        title: 'Accumulate points',
        desc: 'Get more offers',
    },
    {
        icon: 'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/policy4.png?1719328894255',
        title: '5 star service',
        desc: '150+ ratings from Facebook',
    },
];

const Footer = () => {
    return (
        <Group>
            <Flex
                justify={'space-between'}
                align={'center'}
                w={'100%'}
                pr={86}
                pl={86}
                pt={24}
                pb={24}
                bg={'cyan'}
            >
                {items.map((item, index) => (
                    <Flex direction={'row'} key={index}>
                        <Image src={item.icon} w={60} />
                        <Box ml={16}>
                            <Text c={'white'} fw={500} size='xl'>
                                {item.title}
                            </Text>
                            <Text c={'white'}>{item.desc}</Text>
                        </Box>
                    </Flex>
                ))}
            </Flex>
            <Grid overflow='hidden' w={'100%'} mr={86} ml={86}>
                <GridCol span={4} p={50}>
                    <Flex align={'center'} direction={'column'}>
                        <Image src={logo} alt='logo' w={200} mb={'lg'} />
                        <Group gap={'xs'}>
                            <Text size='sm'>
                                An online foreign-language bookshop based in Hanoi, with a focus on
                                English-language used books at affordable price. We offer
                                nation-wide delivery.
                            </Text>
                            <Text size='sm' w={'100%'} fw={500}>
                                Email: duyhung@gmail.com
                            </Text>
                            <Text size='sm' w={'100%'} fw={500}>
                                Phone: 0392115222
                            </Text>
                            <Text size='sm' w={'100%'} fw={500}>
                                Address: Hanoi, Vietnam
                            </Text>
                        </Group>
                    </Flex>
                </GridCol>
                <GridCol span={4} p={50}>
                    <Text fw={600} c={'cyan'} size={'xl'} mb={'md'}>
                        Details:
                    </Text>
                    <Group>
                        <UnstyledButton w={'100%'}>
                            <Flex align={'center'}>
                                <ArrowRight fontSize={'medium'} />
                                <Text>About us</Text>
                            </Flex>
                        </UnstyledButton>
                        <UnstyledButton w={'100%'}>
                            <Flex align={'center'}>
                                <ArrowRight fontSize={'medium'} />
                                <Text>Book Buying Guide</Text>
                            </Flex>
                        </UnstyledButton>
                        <UnstyledButton w={'100%'}>
                            <Flex align={'center'}>
                                <ArrowRight fontSize={'medium'} />
                                <Text>FAQ</Text>
                            </Flex>
                        </UnstyledButton>
                        <UnstyledButton w={'100%'}>
                            <Flex align={'center'}>
                                <ArrowRight fontSize={'medium'} />
                                <Text>Contact</Text>
                            </Flex>
                        </UnstyledButton>
                    </Group>

                    <Group mt={24}>
                        <Text size='md' mb={0}>
                            To get more details:
                        </Text>
                        <TextInput
                            w={250}
                            radius={'xl'}
                            size='md'
                            placeholder='Enter your email here'
                            rightSectionPointerEvents='all'
                            rightSection={
                                <UnstyledButton>
                                    <Send color='primary' />
                                </UnstyledButton>
                            }
                        />
                    </Group>
                </GridCol>
                <GridCol span={4} p={50}>
                    <Text fw={600} c={'cyan'} size={'xl'} mb={'md'}>
                        Location:
                    </Text>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.97840468764!2d105.79576375389507!3d21.02273463974373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1719731772915!5m2!1sen!2s'
                        width='400'
                        height='300'
                        style={{ border: '0' }}
                    ></iframe>
                </GridCol>
            </Grid>
            <Flex w={'100%'} p={24} bg={'dark'} align={'center'} justify={'center'}>
                <Text c={'white'}>Copyright belongs to Haven Bookstore | Provided by DuyHung</Text>
            </Flex>
        </Group>
    );
};

export default Footer;
