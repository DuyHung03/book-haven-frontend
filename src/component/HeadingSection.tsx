import { Group, Text } from '@mantine/core';

const HeadingSection = ({ title }: { title: string }) => {
    return (
        <Group>
            <Group bg={'cyan'} display={'inline-block'} p={16}>
                <Text w={'100%'} h={'100%'} c={'white'} fw={500} size='lg'>
                    {title}
                </Text>
            </Group>
            <hr style={{ width: '100%', borderTop: '1px solid #ccc' }} />
        </Group>
    );
};

export default HeadingSection;
