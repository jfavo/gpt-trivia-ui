import { 
    Center,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    AlertCircleIcon,
    Text,
    Button,
    ButtonText
} from "@gluestack-ui/themed";
import { LogoPlaceholder } from '../../components/svgs/logo-placeholder';
import { Background } from "../../components/background";
import { LIGHT_NAVY_BLUE, GRAY, DARK_GREEN, XTRA_LIGHT_GRAY, LIGHT_GREEN } from "../../constants/styles.constants";
import { useEffect, useState } from "react";
import { Screens } from "../../models/screens";
import { useAppSelector, useAppDispatch } from "../../state/hooks/app.hooks";
import { getCurrentUser, setCurrentUser } from "../../state/slices/user.slice";
import { User } from "../../models/user";
import { signUserIn, userIsStoredLocally } from "../../common/users.utils";

export type Props = {
    navigation: any
}

export const LandingPage: React.FC<Props> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getCurrentUser) as User;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [checkingUserData, setCheckingUserData] = useState(true);

    /**
     * Handler that checks the users credentials and logs them in
     */
    const handleLoggingIn = async () => {
        setLoggingIn(true);

        await setTimeout(() => setLoggingIn(false), 1000);
    }

    /**
     * Checks if there is a user session stored locally.
     * If there is, logs in user and navigates to home page
     */
    const getStoredUser = async () => {
        setLoggingIn(true);
        userIsStoredLocally(true, dispatch, setCurrentUser)
            .then((user) => {
                if (!user) {
                    setCheckingUserData(false);
                    setLoggingIn(false);
                } else {
                    navigation.navigate(Screens.Home.toString());
                }
            })
    }

    /**
     * Hook that fires initially to check if user 
     */
    useEffect(() => {
        getStoredUser();
    }, [])

    if (checkingUserData) {

        return <></>

    } else {
        return (
            <Background color={XTRA_LIGHT_GRAY}>
                <Center h="33%" w="100%">
                    <LogoPlaceholder />
                    <Text size="lg" bold={true}>Test your knowledge!</Text>
                </Center>
                <Center h="66%" w="100%" marginTop={"$5"}>

                    <FormControl
                        size="lg"
                        isInvalid={false}
                        isDisabled={loggingIn}
                        minWidth="$80"
                        >
                            <FormControlLabel mb="$2">
                                <FormControlLabelText>Username</FormControlLabelText>
                            </FormControlLabel>
                            <Input>
                                <InputField
                                    type="text"
                                    placeholder="username"
                                    onChangeText={(text) => setUsername(text)} 
                                />
                            </Input>
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} />
                                <FormControlErrorText>
                                    At least 6 characters are required.
                                </FormControlErrorText>
                            </FormControlError>
                    </FormControl>

                    <FormControl
                        size="lg"
                        isInvalid={false}
                        isDisabled={loggingIn}
                        marginTop={"$5"}
                        minWidth="$80"
                    >
                        <FormControlLabel mb="$1">
                            <FormControlLabelText>Password</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField
                                type="password"
                                onChangeText={(text) => setPassword(text)} 
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                                At least 6 characters are required.
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <Button
                        size="lg"
                        variant="solid"
                        bg={DARK_GREEN}
                        rounded="$lg"
                        marginTop={"$5"}
                        minWidth="$80"
                        onPress={handleLoggingIn}
                        isDisabled={loggingIn}
                    >
                        <ButtonText>Login</ButtonText>
                    </Button>

                    <Button
                        size="lg"
                        variant="solid"
                        bg={LIGHT_NAVY_BLUE}
                        rounded="$lg"
                        marginTop={"$5"}
                        action={"secondary"}
                        minWidth="$80"
                        onPress={() => navigation?.navigate(Screens.Signup.toString())}
                        isDisabled={loggingIn}
                    >
                        <ButtonText color={XTRA_LIGHT_GRAY}>Sign Up</ButtonText>
                    </Button>
                    <Text size="sm">Don't have an account? Sign up above!</Text>

                    <Button
                        size="lg"
                        variant="solid"
                        bg={XTRA_LIGHT_GRAY}
                        rounded="$lg"
                        marginTop={"$5"}
                        borderWidth="$1"
                        borderColor={GRAY}
                        action={"secondary"}
                        minWidth="$80"
                        onPress={() => navigation?.navigate(Screens.GuestSignin.toString())}
                        isDisabled={loggingIn || userData !== undefined}
                    >
                        <ButtonText color={GRAY}>Continue as Guest</ButtonText>
                    </Button>
                    <Text size="sm">Or you can just play the game in offline mode</Text>

                </Center>
            </Background>
        )
    }
}