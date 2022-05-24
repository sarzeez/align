import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from 'theme/Colors';
import Shadows from 'theme/Shadows';

export type HeaderButtonProps = {
    onPress: any;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ onPress }) => {


    return (
        <TouchableOpacity onPress={onPress} style={s.globlaContainer}>
            <Image style={s.image} source={require("./assets/cross.png")} />
        </TouchableOpacity>
    );
};

HeaderButton.defaultProps = {}

export const s = StyleSheet.create({
    globlaContainer: {
        ...Shadows.sh1,
        width: 49,
        height: 49,
        borderRadius: 14,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 20,
        height: 20
    }
});
const MemorizedComponent = memo(HeaderButton);
export { MemorizedComponent as HeaderButton };