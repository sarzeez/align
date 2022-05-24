import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import CheckBox from 'components/CheckBox/CheckBox';
import Typography from 'components/Typography/Typography';
import localization from 'localization/localization';
import styles from './styles';
import {DEVICE_WIDTH, PADDING_HORIZONTAL} from 'helpers/constants';
import {Colors} from 'theme';

type TermsAndConditionsProps = {
  isChecked: boolean;
  onPress: () => void;
};

const TermsAndConditions = ({isChecked, onPress}: TermsAndConditionsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <CheckBox checked={isChecked} onPress={onPress}/>
      </TouchableOpacity>
      <View style={styles.textStyle}>
        <Typography
          text={localization.common.iHaveRead}
          type="label"
          style={styles.blackTextStyle}
        />
        <TouchableOpacity>
          <Typography
            fontColor={Colors.orange}
            text={localization.common.termsAndConditions}
            type="label"
            style={styles.orangeTextStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsAndConditions;
