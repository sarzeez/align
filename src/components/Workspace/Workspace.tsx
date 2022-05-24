import React, { memo } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from 'theme';
import Arrow from './assets/arrow';
import Pin from './assets/pin';

export type WorkspaceProps = {
    text?: string | undefined;
    onPress?: any;
};

const Workspace = ({
    text,
    onPress
}: WorkspaceProps) => {


    return (
        <TouchableOpacity onPress={onPress} style={s?.globalContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={s?.image}>
                    <Pin />
                </View>
                <Text style={s?.text}>{text}</Text>
            </View>
            <View style={{ marginRight: 20 }}>
                <Arrow />
            </View>
        </TouchableOpacity>
    );
};

Workspace.defaultProps = {
    text: "test"
}

export const s = StyleSheet.create({
    globalContainer: {
        backgroundColor: Colors.wildSand,
        paddingHorizontal: 9,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 16,
        width: "100%"
    },
    text: {
        color: Colors.black,
        marginLeft: 9,
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    image: {
        backgroundColor: Colors.white,
        width: 47,
        height: 47,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center"
    }
});



const MemorizedComponent = memo(Workspace);
export { MemorizedComponent as Workspace };