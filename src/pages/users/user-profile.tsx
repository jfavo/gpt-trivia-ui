import { Avatar, AvatarFallbackText, Button, ButtonText, Center, Heading, VStack } from "@gluestack-ui/themed";
import { Background } from "../../components/background"
import { User } from "../../models/user";
import { useAppDispatch, useAppSelector } from "../../state/hooks/app.hooks";
import { getCurrentUser, setCurrentUser } from "../../state/slices/user.slice";
import { LIGHT_NAVY_BLUE, NAVY_BLUE, XTRA_LIGHT_GRAY } from "../../constants/styles.constants";
import { useState } from "react";
import { signUserOut } from "../../common/users.utils";
import { Screens } from "../../models/screens";

export const UserProfilePage = ({navigation}) => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getCurrentUser) as User;
    const [signingOut, setSigningOut] = useState(false);

    const handleSignout = async () => {
        setSigningOut(true);
        await signUserOut(dispatch, setCurrentUser);
        navigation.navigate(Screens.Landing.toString());
    }

    return (
        <Background color={XTRA_LIGHT_GRAY}>
            { 
                userData
                ?   <Center h="100%" w="100%">
                        <VStack
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Avatar
                                size="2xl"
                                m="$5"
                            >
                                <AvatarFallbackText>{userData?.username}</AvatarFallbackText>
                            </Avatar>
                            <Heading size="3xl" textAlign="center">{userData?.username}</Heading>
                            { 
                                userData?.role === 'guest'
                                ?   <Heading 
                                        size="md" 
                                        p="$2" 
                                        textAlign="center"
                                        color="orange"
                                    >
                                        Guest
                                    </Heading>
                                :   <></>
                            }
                            <Button 
                                bg={LIGHT_NAVY_BLUE}
                                onPress={handleSignout}
                                isDisabled={signingOut}
                                m="$5"
                            >
                                <ButtonText>Sign out</ButtonText>
                            </Button>
                        </VStack>
                    </Center>
                : <></>
        }

        </Background>
    )
}