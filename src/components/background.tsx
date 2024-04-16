import { View } from '@gluestack-ui/themed';
import { XTRA_LIGHT_GRAY } from '../constants/styles.constants';
import { ReactNode } from 'react';

export type Props = {
    color: string | undefined,
    children: ReactNode[] | undefined
}

export const Background: React.FC<Props> = ({
    color,
    children
}) => {

    return (
        <View bg={color || XTRA_LIGHT_GRAY}>{children}</View>
    )
}