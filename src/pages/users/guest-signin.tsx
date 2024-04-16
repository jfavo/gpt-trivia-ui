import { Background } from "../../components/background"
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
    ButtonText
} from "@gluestack-ui/themed"
import { useAppDispatch, useAppSelector } from "../../state/hooks/app.hooks";
import { getCurrentUser, setCurrentUser } from "../../state/slices/user.slice";
import { useEffect, useState } from "react";
import { DARK_GREEN, XTRA_LIGHT_GRAY } from "../../constants/styles.constants";
import { User, UserRole } from "../../models/user";
import { Screens } from "../../models/screens";
import { storeLocalData } from "../../common/utils";

export const GuestSigninPage = ({navigation}) => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        validateInput();
    }, [username]);

    /**
     * Event handler for the submit
     */
    const handleSubmit = () => {
        setSubmitted(true);

        const guestUser = {
            username,
            role: UserRole[UserRole.guest]
        };

        dispatch(setCurrentUser(guestUser));
        storeLocalData('user', guestUser);

        navigation?.navigate(Screens.Home.toString());
    }

    /**
     * Validates the guest user name and creates
     * a validation message for the user
     */
    const validateInput = () => {
        let error = '';

        if (username.length < 2) {
            error = 'Username should be at least 2 characters';
        }
        
        if (username.length > 12) {
            error = 'Username should be less then 13 characters';
        }
        
        if (error !== validationMsg) {
            setValidationMsg(error);
        }
    }

    return (
        <Background color={XTRA_LIGHT_GRAY}>
            <Center h="100%" w="100%">
                <FormControl
                    size="md"
                    isDisabled={submitted}
                    isInvalid={validationMsg !== ''}
                >
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>Guest username</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField 
                            type="type" 
                            placeholder="username"
                            onChangeText={(text) => setUsername(text)}
                        />
                    </Input>
                    <FormControlHelper>
                        <FormControlHelperText>
                            What name do you want to be referred as?
                        </FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                            {validationMsg}
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
                    onPress={handleSubmit}
                    isDisabled={submitted || validationMsg !== ''}
                >
                    <ButtonText>Let's play!</ButtonText>
                </Button>
            </Center>               
        </Background>
    )
}