import { Center, Heading } from "@gluestack-ui/themed"
import { Background } from "../../components/background"

export type Props = {

}

export const CustomCategories: React.FC<Props> = () => {

    return (
        <Background>
            <Center>
                <Heading>Custom Categories</Heading>
            </Center>
        </Background>
    )
}