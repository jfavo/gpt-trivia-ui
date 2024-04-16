import { Avatar, AvatarFallbackText, Pressable, Box, Center } from '@gluestack-ui/themed';
import { DARK_GREEN, MID_GREEN, LIGHT_GREEN } from '../constants/styles.constants';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../state/hooks/app.hooks';
import { getCurrentUser } from '../state/slices/user.slice';
import { User } from '../models/user';
import { Screens } from '../models/screens';
import { useNavigation } from '@react-navigation/native';

export const HEADER_OPTIONS = {
    headerStyle: {
        backgroundColor: DARK_GREEN,
    },
    headerTintColor: MID_GREEN,
    title: '',
    headerTitleAlign: 'center',
    headerTitle: () => HeaderTitle(),
    headerRight: () => HeaderRight()
};

export const HeaderTitle = () => {
    const navigation = useNavigation();
    const userData: object = useAppSelector(getCurrentUser);
    const [hasUserData, setHasUserData] = useState(false);

    /**
     * Handler for when the heading title is pressed by the user
     */
    const handleOnPress = () => {
        navigation.navigate(Screens.Home.toString());
    }

    useEffect(() => {
        if (userData) {
            setHasUserData(true);
        }
    }, []);

    if (hasUserData) {
        return (
            <Center>
                <Pressable onPress={handleOnPress}>
                    <Box bg={LIGHT_GREEN} p="$8"></Box>
                </Pressable>
            </Center>
        )
    } else {
        return <></>
    }
}

export const HeaderRight = () => {
    const navigation = useNavigation();
    const userData = useAppSelector(getCurrentUser) as User;
    const [username, setUsername] = useState(userData?.username);

    useEffect(() => {
        setUsername(userData?.username)
    }, [userData]);

    const handleOnPress = () => {
        if (userData) {
            navigation.navigate(Screens.UserProfile.toString());
        }
    }

    return (
        <Pressable
            borderRadius="$full"
            onPress={handleOnPress}
        >
            <Avatar
                bg={userData ? MID_GREEN : LIGHT_GREEN}
                size="md"
                p="$2"
                marginTop="$2"
                marginBottom="$2"
                borderRadius="$full"
            >
                <AvatarFallbackText>{username}</AvatarFallbackText>
            </Avatar>
        </Pressable>
    )
}