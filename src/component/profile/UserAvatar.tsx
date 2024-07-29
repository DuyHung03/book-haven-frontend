import { Avatar, Button, FileButton, Flex, Loader, Skeleton } from '@mantine/core';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { memo, useState } from 'react';
import axiosInstance from '../../network/httpRequest';
import useUserStore from '../../store/useUserStore';
import { storage } from '../../util/firebase';

export default memo(function UserAvatar() {
    const { user, setAvatar } = useUserStore();
    const [loading, setLoading] = useState(false);

    const handleChangeAvatar = (file: File | null) => {
        if (file) {
            const storageRef = ref(storage, `avatars/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setLoading(true);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error('Upload failed', error);
                    setLoading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        saveAvatarToServer(downloadURL);
                        setAvatar(downloadURL);
                        setLoading(false);
                    });
                }
            );
        }
    };

    const saveAvatarToServer = async (url: string) => {
        await axiosInstance.put(
            'user/uploadAvatar',
            {},
            {
                withCredentials: true,
                params: {
                    userId: user.userId,
                    url: url,
                },
            }
        );
    };
    return (
        <Flex direction='column' align={'center'} gap={16} wrap={'wrap'}>
            {loading ? (
                <>
                    <Skeleton height={120} circle />
                    <Loader />
                </>
            ) : (
                <>
                    <Avatar size={180} src={user.photoUrl || undefined} />
                    <FileButton
                        onChange={handleChangeAvatar}
                        accept='image/png,image/jpg,image/jpeg'
                    >
                        {(props) => (
                            <Button variant='light' color='cyan' {...props}>
                                Upload image
                            </Button>
                        )}
                    </FileButton>
                </>
            )}
        </Flex>
    );
});
