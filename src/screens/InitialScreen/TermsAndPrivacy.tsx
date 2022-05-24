import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './InitialScreenStyles';
import { Colors } from 'theme';
import { TermsScreenMode } from 'screens/TermsScreen';
import { navigateTo } from 'navigation/navigation.service';
import Typography from 'components/Typography/Typography';
import localization from 'localization/localization';
import ROUTES from 'navigation/routes';

export type TermsAndPrivacyProps = {
  textColor?: string;
};

const TermsAndPrivacy: React.FC<TermsAndPrivacyProps> = ({
  textColor
}) => {
  
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => navigateTo(ROUTES.TERMS_SCREEN, {mode: TermsScreenMode.TermsAndConditions})}>
        <Typography 
          type={'label'}
          text={localization.initialScreen.terms}
          fontColor={textColor}
        />
      </TouchableOpacity>
      <Typography 
        type={'label'}
        text={'|'}
        fontColor={textColor}
        style={styles.textSpacing}
      />
      <TouchableOpacity onPress={() => navigateTo(ROUTES.TERMS_SCREEN, {mode: TermsScreenMode.PrivacyPolicy})}>
        <Typography 
          type={'label'}
          text={localization.initialScreen.policy}
          fontColor={textColor}
        />
      </TouchableOpacity>
    </View>
  );
};

TermsAndPrivacy.defaultProps={
  textColor: Colors.textGray
}

const MemorizedComponent = memo(TermsAndPrivacy);
export { MemorizedComponent as TermsAndPrivacy };