import React, { memo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Colors } from 'theme';

export type InfoItemProps = {
    infoText: string;
    image: any;
    dataText: string;
};

const InfoItem = ({
    infoText,
    dataText,
    image
}: InfoItemProps) => {

    return (
        <View style={s.globalContainer}>
            <View style={s.container}>
                <View style={s.block}>
                    <Image style={s.image} source={image} />
                    <Text style={s.textSmall}>{infoText}</Text>
                </View>
                <View style={s.line}>
                </View>
                <View style={s.block}>
                    <Text style={s.textLarge}>{dataText}</Text>
                </View>
            </View>
        </View>
    );
};

InfoItem.defaultProps = {}

export const s = StyleSheet.create({
    globalContainer: {
        backgroundColor: Colors.emptyMessageColor,
        paddingVertical: 16.7,
        paddingHorizontal: 6,
        width: "100%",
        borderRadius: 17
    },
    textSmall: {
        color: Colors.gray7,
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        marginHorizontal: 10,
        textAlign: "center"
    },
    textLarge: {
        color: Colors.black,
        fontSize: 18,
        fontFamily: 'Inter-ExtraBold',
        textAlign: "center"
    },
    line: {
        backgroundColor: Colors.dividerColor,
        width: 1,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    image: {
        width: 26,
        height: 26,
        marginBottom: 8
    },
    block: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flex: 1
    }
});
const MemorizedComponent = memo(InfoItem);
export { MemorizedComponent as InfoItem };