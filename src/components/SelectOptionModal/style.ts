import {StyleSheet} from 'react-native';
import {Colors, Shadows} from 'theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    withTwoButtons: {
        flex: 1,
        width: 'auto',
        height: 44,
    },
    modalContent: {
        flexDirection: 'row',
    },
    modalInnerContainer: {
        width: '90%',
        backgroundColor: Colors.white,
        borderRadius: 40,
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 24,
        marginHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Shadows.sh2,
    },
    iconContainer: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigBtn: {
        height: 56,
        width: '65%',
    },
    headBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 14,
    },
    shadowBtn: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    backBtn: {
        width: '100%',
        marginBottom: -20

    }
});

export default styles;
