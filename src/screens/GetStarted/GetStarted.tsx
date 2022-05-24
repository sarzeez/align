import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'theme';
import { typesOfAccount } from 'typings/types.common';
import { TermsAndPrivacy } from 'screens/InitialScreen/TermsAndPrivacy';
import { LoginFlowContainer } from 'components/LoginFlowContainer/LoginFlowContainer';
import { HaveAnAccount } from 'screens/InitialScreen/HaveAnAccount';
import { CustomButton } from 'components/CustomButton';
import Typography from 'components/Typography/Typography';
import Spacer from 'components/Spacer/Spacer';
import localization from 'localization/localization';
import ROUTES from 'navigation/routes';
import CheckBoxButton from 'components/CheckBoxButton/CheckBoxButton';
import styles from './styles';

const GetStarted = () => {
  const navigation = useNavigation();
  const [accountType, setAccountType] = useState<string>('');

  const onNext = () => {
    navigation.navigate(
      ROUTES.CREATE_ACCOUNT as never,
      {accountType} as never,
    );
  };

  const ckeckBoxButtonList = [
    {
      id: 0,
      title: typesOfAccount.contractor,
    },
    {
      id: 1,
      title: typesOfAccount.subContractor,
    },
    {
      id: 2,
      title: typesOfAccount.employee,
    },
  ];

  const selectAccountType = (account: string) => {
    setAccountType(account);
  };

  const renderCheckButtons = () => {
    return ckeckBoxButtonList.map(item => (
      <View style={styles.block} key={item.id}>
        <CheckBoxButton
          key={item.id}
          checkedValue={accountType}
          onPress={() => selectAccountType(item.title)}
          title={item.title}
        />
        <Spacer height={12}/>
      </View>
    ));
  };

  return (
    <LoginFlowContainer>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.headingContainer}>
            <Typography text={localization.getStarted.heading} type="h2" style={styles.headingText}/>
          </View>
          <Spacer height={32} />
          <View style={[styles.block, styles.checkboxesContainer]}>
            <View style={styles.decorLine}/>
            <Spacer height={12}/>
            {renderCheckButtons()}
          </View>
          <View style={styles.block}>
            <Spacer height={32}/>
            <View style={styles.nextButtonStyle}>
              <CustomButton 
                title={localization.getStarted.next}
                onPress={() => onNext()}
                borderRadius={20}
                disabled={!accountType}
                bgColorActive={Colors.orange}
                bgColorUnactive={Colors.gray4}
                titleColor={!accountType? Colors.gray5: Colors.white}
              />
            </View>
          </View>
          <Spacer height={24}/>
          <HaveAnAccount />
          <Spacer height={24}/>
          <TermsAndPrivacy />
        </View>
      </View>
    </LoginFlowContainer>
  );
};

export default GetStarted;