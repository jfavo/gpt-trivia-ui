import { Center, Heading } from "@gluestack-ui/themed"
import { Background } from "../../components/background"

export type Props = {

}

export const MatchHistory: React.FC<Props> = () => {

    return (
        <Background>
            <Center>
                <Heading>Match History</Heading>
            </Center>
        </Background>
    )
}