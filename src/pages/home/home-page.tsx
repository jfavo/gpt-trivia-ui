import { Center, HStack, Text, VStack } from "@gluestack-ui/themed"
import { Background } from "../../components/background"
import LogoPlaceholder from "../../components/svgs/logo-placeholder"
import { StyledCard } from "../../components/styled-card"
import { AttributedImage } from "../../components/attributed-image"
import { Screens } from "../../models/screens"
import { useEffect } from "react"
import { BackHandler } from "react-native"

export const HomePage = ({navigation}) => {

    /**
     * Image component for the match card
     * @returns Attributed image component
     */
    const matchImage = () => (
        <AttributedImage 
            source={require('../../public/images/quiz_10292284.png')}
            attribution=""
        />
    )

    /**
     * Image component for the match history card
     * @returns Attributed image component
     */
    const matchHistoryImage = () => (
        <AttributedImage 
            source={require('../../public/images/history_3079185.png')}
            attribution=""
        />
    )

    /**
     * Image component for the custom categories card
     * @returns Attributed image component
     */
    const customCategoriesImage = () => (
        <AttributedImage 
            source={require('../../public/images/question_8586926.png')}
            attribution=""
        />
    )

    useEffect(() => {
        /**
         * Handler to disable the hardwares back functionality
         * @returns true
         */
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

        // Make sure we remove the listener when we navigate away from this page
        return () => {
            backHandler.remove();
        }
    }, []);

    return (
        <Background>
            <VStack>
                <Center h="30%" w="100%" marginTop="20px">
                    <LogoPlaceholder />
                    <Text size="lg" bold={true}>Time to play!</Text>
                </Center>
                <Center h="70%">
                    <HStack>
                        <StyledCard
                            image={matchImage()}
                            heading="Play Match"
                            subtext="Play a new round of trivia!"
                            onClick={() => navigation.navigate(Screens.MatchLanding.toString())}
                        />
                        <StyledCard
                            image={matchHistoryImage()}
                            heading="Match History"
                            subtext="Check out your previous games"
                            onClick={() => navigation.navigate(Screens.MatchHistories.toString())}
                        />
                    </HStack>
                    <HStack>
                        <StyledCard
                            image={matchImage()}
                            heading="User Profile"
                            subtext="Check yourself out"
                            onClick={() => navigation.navigate(Screens.UserProfile.toString())}
                        />
                        <StyledCard
                            image={customCategoriesImage()}
                            heading="Custom Trivia"
                            subtext="Create your own categories"
                            onClick={() => navigation.navigate(Screens.CustomCategories.toString())}
                        />
                    </HStack>
                </Center>
            </VStack>
        </Background>
    )
}
