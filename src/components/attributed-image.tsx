import { Box, Image } from "@gluestack-ui/themed"
import { ReactNode } from "react"

export type Props = {
    source: string,
    attribution?: ReactNode
}

export const AttributedImage: React.FC<Props> = ({
    source,
    attribution
}) => {

    return (
        <Box>
            <Image source={source} alt="" />
            {attribution}
        </Box>
    )
}