import { Card, Heading, Text, Image } from "@gluestack-ui/themed"
import { ReactNode } from "react"
import { Pressable } from "react-native"

export type Props = {
    image?: ReactNode,
    heading: string,
    subtext: string,
    onClick?: () => void,
}

export const StyledCard: React.FC<Props> = ({
    image,
    heading,
    subtext,
    onClick
}) => {

    return (
        <Pressable onPress={onClick}>
            <Card 
                minWidth="$40"
                maxWidth="$40"
                minHeight="$40"
                maxHeight="$40"
                justifyContent="center"
                alignItems="center"
                m="$1"
            >
                {image}
                <Heading textAlign="center" size="sm">{heading}</Heading>
                <Text textAlign="center">{subtext}</Text>
            </Card>
        </Pressable>
    )
}
