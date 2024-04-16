import { SetStateAction, useEffect, useState } from "react"
import {
    Center,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    FormControlHelper,
    FormControlHelperText,
    FormControlError,
    FormControlErrorIcon,
    AlertCircleIcon,
    FormControlErrorText,
    Button,
    ButtonText,
    VStack,
    Text
} from "@gluestack-ui/themed";
import { Background } from "../../components/background";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { XTRA_LIGHT_GRAY, DARK_GREEN } from "../../constants/styles.constants";
import { LogoPlaceholder } from '../../components/svgs/logo-placeholder';
import { Keyboard } from "react-native";
import { useAppDispatch } from "../../state/hooks/app.hooks";
import { setCurrentUser } from "../../state/slices/user.slice";
import { Screens } from "../../models/screens";
import { signUserIn } from "../../common/users.utils";

export const SignupPage = ({navigation}) => {
    const [creatingUser, setCreatingUser] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [selectingDate, setSelectingDate] = useState(false);
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [birthDateErrorMsg, setBirthDateErrorMsg] = useState('');
    const [keyboardVisable, setKeyboardVisable] = useState(false);

    const [inputSelected, setInputSelected] = useState('');

    const dispatch = useAppDispatch();
    
    /**
     * Handler to read in date object from date picker
     * @param datetime Date object returned from the date picker
     */
    const handleDateConfirm = (datetime: Date) => {
        setBirthDate(datetime.toDateString());
        setSelectingDate(false);
    }

    /**
     * Handler that will validate the user input
     */
    const handleValidation = (): boolean => {
        let valid = true;

        if (username.length < 2) {
            setUsernameErrorMsg('Username needs to be greater than 2 characters');
            valid = false;
        } else if (username.length > 12) {
            setUsernameErrorMsg('Username needs to be less than 12 characters');
            valid = false;
        } else if (usernameErrorMsg !== '') {
            setUsernameErrorMsg('')
        }

        if (password.length < 6) {
            setPasswordErrorMsg('Password needs to be longer then 6 characters');
        } else if (password !== confirmPassword) {
            setPasswordErrorMsg('Passwords do not match');
            valid = false;
        } else if (passwordErrorMsg !== '') {
            setPasswordErrorMsg('')
        }

        const validEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
        if (!validEmail || validEmail.length === 0) {
            setEmailErrorMsg('Email is not valid. Example: your@email.com');
            valid = false;
        } else if (emailErrorMsg !== '') {
            setEmailErrorMsg('');
        }

        if (isNaN(Date.parse(birthDate))) {
            setBirthDateErrorMsg('Birthdate is required or is invalid')
            valid = false;
        } else if (birthDateErrorMsg !== '') {
            setBirthDateErrorMsg('');
        }

        return valid;
    }

    const handleCreateUser = async () => {
        if (handleValidation()) {
            const user = {
                username,
                password,
                email,
                birthDate,
                role: 'standard'
            }

            setCreatingUser(true);
            // Mock api call latency
            setTimeout(() => {
                console.log(user);

                signUserIn(user, dispatch, setCurrentUser);
                navigation.navigate(Screens.Home.toString());

                setCreatingUser(false);
            }, 1000);
            
        }
    }

    /**
     * Hook to fire initially to add event listeners to watch for the keyboard being active.
     */
    useEffect(() => {
        const keyboardShownListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisable(true);
            }
        );

        const keyboardHiddenListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisable(false);
                setInputSelected('');
            }
        )

        // Ensure we remove the listener once we leave the page
        // so we don't break stuff.
        return () => {
            keyboardShownListener.remove();
            keyboardHiddenListener.remove();
        }
    }, []);

    return (
        <Background color={XTRA_LIGHT_GRAY}>
            <DateTimePickerModal 
                isVisible={selectingDate}
                mode="datetime"
                display="spinner"
                onConfirm={handleDateConfirm}
                onCancel={() => setSelectingDate(false)}
            />
            <VStack>
                { 
                    !keyboardVisable
                    ?   <Center h="20%" w="100%">
                            <LogoPlaceholder />
                            <Text size="lg" bold={true}>Sign up below to play!</Text>
                        </Center>
                    : <></>
                }

                <Center h={inputSelected === '' ? "80%" : "100%"} w="100%">
                    {
                        !keyboardVisable || inputSelected === '' || inputSelected === 'username'
                        ?   <FormControl
                            size="md"
                            isInvalid={usernameErrorMsg !== ''}
                            isDisabled={creatingUser}
                            width="$80"
                            >
                                <FormControlLabel mb="$2">
                                    <FormControlLabelText>Username</FormControlLabelText>
                                </FormControlLabel>
                                <Input>
                                    <InputField
                                        type="text"
                                        value={username}
                                        placeholder="username"
                                        onPressOut={() => setInputSelected('username')}
                                        onBlur={() => setInputSelected('')}
                                        onChangeText={(text) => setUsername(text)} 
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>
                                        {usernameErrorMsg}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                        : <></>
                    }

                    {
                        inputSelected === '' || inputSelected === 'password'
                        ?   <FormControl
                            size="md"
                            isInvalid={passwordErrorMsg !== ''}
                            isDisabled={creatingUser}
                            width="$80"
                            >
                                <FormControlLabel mb="$2">
                                    <FormControlLabelText>Password</FormControlLabelText>
                                </FormControlLabel>
                                <Input>
                                    <InputField
                                        type="password"
                                        value={password}
                                        onPressOut={() => setInputSelected('password')}
                                        onBlur={() => setInputSelected('')}
                                        onChangeText={(text) => setPassword(text)}
                                    />
                                </Input>
                            </FormControl>
                        : <></>
                    }

                    {
                        inputSelected === '' || inputSelected === 'confirmPassword'
                        ?   <FormControl
                            size="md"
                            isInvalid={passwordErrorMsg !== ''}
                            isDisabled={creatingUser}
                            width="$80"
                            >
                                <FormControlLabel mb="$2">
                                    <FormControlLabelText>Confirm Password</FormControlLabelText>
                                </FormControlLabel>
                                <Input>
                                    <InputField
                                        type="password"
                                        value={confirmPassword}
                                        onPressOut={() => setInputSelected('confirmPassword')}
                                        onBlur={() => setInputSelected('')}
                                        onChangeText={(text) => setConfirmPassword(text)} 
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>
                                        {passwordErrorMsg}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                        :   <></>
                    }
                    
                    {
                        inputSelected === '' || inputSelected === 'email'
                        ?   <FormControl
                            size="md"
                            isInvalid={emailErrorMsg !== ''}
                            isDisabled={creatingUser}
                            width="$80"
                            >
                                <FormControlLabel mb="$2">
                                    <FormControlLabelText>Email</FormControlLabelText>
                                </FormControlLabel>
                                <Input>
                                    <InputField
                                        type="text"
                                        value={email}
                                        placeholder="your@email.com"
                                        onPressOut={() => setInputSelected('email')}
                                        onBlur={() => setInputSelected('')}
                                        onChangeText={(text) => setEmail(text)} 
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>
                                        {emailErrorMsg}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                        :   <></>
                    }

                    {
                        inputSelected === '' || inputSelected === 'birthDate'
                        ?   <FormControl
                            size="lg"
                            isInvalid={birthDateErrorMsg !== ''}
                            isDisabled={creatingUser}
                            width="$80"
                            >
                                <FormControlLabel mb="$2">
                                    <FormControlLabelText>Birthdate</FormControlLabelText>
                                </FormControlLabel>
                                <Input>
                                    <InputField
                                        type="text"
                                        value={birthDate}
                                        onPressOut={() => setSelectingDate(true)}
                                        onFocus={() => setInputSelected('birthDate')}
                                        onBlur={() => setInputSelected('')}
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>
                                        {birthDateErrorMsg}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                        :   <></>
                    }
                    
                    {
                        inputSelected === ''
                        ?   <Button
                                size="lg"
                                variant="solid"
                                bg={DARK_GREEN}
                                rounded="$lg"
                                marginTop={"$5"}
                                minWidth="$80"
                                onPress={handleCreateUser}
                                isDisabled={creatingUser}
                            >
                                <ButtonText>Login</ButtonText>
                            </Button>
                        :   <></>
                    }
                </Center>
            </VStack>
        </Background>
    )
}