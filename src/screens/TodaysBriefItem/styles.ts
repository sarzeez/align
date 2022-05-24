import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F7F7',
    },
    progressHolder: {
        padding: 30,
        paddingBottom: 20,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    progress: {
        flex: 1,
        height: 23,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#DBDBDB',
    },
    loadingHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabs: {
        backgroundColor: Colors.emptyMessageColor,
    },
    tabContainer: {},
    tabContent: {},
    sceneContainerStyle: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    tabBar: {
        backgroundColor: Colors.white,
        color: Colors.black,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    tabBarText: {
        fontWeight: '700',
        color: Colors.black,
    },
    tabBarIndicator: {
        backgroundColor: Colors.orange,
        height: 4,
    },
});
