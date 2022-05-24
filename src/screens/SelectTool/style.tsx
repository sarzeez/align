import {IS_IPHONE_X} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    indicatorContainer: {
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexGrow: {
        flexGrow: 1,
    },
    addBtn: {
        backgroundColor: Colors.orange,
        borderRadius: 8,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: Colors.emptyMessageColor,
        flex: 1,
        height: '100%',
        marginBottom: IS_IPHONE_X ? -32 : 0,
    },
    modalHeader: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray2,
    },
    modalContent: {
        backgroundColor: Colors.emptyMessageColor,
        flex: 1,
        padding: 20,
        flexDirection: 'column',
    },
    btn: {
        width: '100%'
    },
    btnDefault: {
        width: '100%',
        height: 56,
        borderRadius: 999,
        backgroundColor: '#fff',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 20

    }
});
