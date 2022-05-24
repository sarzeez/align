import React, {memo} from 'react';
import {View} from 'react-native';
import {Colors} from 'theme';
import localization from 'localization/localization';
import Typography from 'components/Typography/Typography';
import styles from './styles';
import LockIcon from './assets/lock';

export type PasswordProtectedProps = {};

const PasswordProtected: React.FC<PasswordProtectedProps> = ({}) => {
  return (
    <View style={styles.row}>
      <View style={styles.lockIcon}>
        <LockIcon color={Colors.orange} />
      </View>
      <Typography
        text={localization.common.securePassword}
        fontColor={Colors.gray6}
        type={'label'}
        style={styles.fontStyle}
      />
    </View>
  );
};

PasswordProtected.defaultProps = {};

const MemorizedComponent = memo(PasswordProtected);
export {MemorizedComponent as PasswordProtected};
