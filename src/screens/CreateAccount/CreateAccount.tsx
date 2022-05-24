import React, {useState} from 'react';
import {View, Keyboard} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {typesOfAccount} from 'typings/types.common';
import {TermsAndPrivacy} from 'screens/InitialScreen/TermsAndPrivacy';
import {LoginFlowContainer} from 'components/LoginFlowContainer/LoginFlowContainer';
import {HaveAnAccount} from 'screens/InitialScreen/HaveAnAccount';
import {Colors} from 'theme';
import {
  CreateAccountSchema,
  CreateAccountSubContactorSchema,
} from 'helpers/validations';
import {fetchLogin, setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import {CustomButton} from 'components/CustomButton';
import {PasswordProtected} from './PasswordProtected';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EventsModal from 'components/EventsModal/EventsModal';
import {registration, contractorRegister} from 'store/actions/auth.actions';
import Spacer from 'components/Spacer/Spacer';
import styles from './styles';
import TermsAndConditions from 'components/TermsAndConditions/TermsAndConditions';
import localization from 'localization/localization';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import ROUTES from 'navigation/routes';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import {navigateTo} from 'navigation/navigation.service';

type FormValuesType = {
  password: string;
  confirmPassword: string;
  email: string;
  userName: string;
  companyName?: string | undefined;
  termsAndConditions: boolean;
};

type CreateAccountProps = {
  route: RouteProp<
    {
      CreateAccountProps: {
        accountType: string;
      };
    },
    'CreateAccountProps'
  >;
};

// Global constants
const INITIAL_VALUES: FormValuesType = {
  userName: '',
  companyName: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAndConditions: false,
};

const CreateAccount = ({route}: CreateAccountProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | unknown>('');
  const [modalVisible, setModalVisible] = useState(false);
  const accountType: string = route.params?.accountType;

  const handleSubmitRegister = async (values: FormValuesType) => {
    Keyboard.dismiss();
    setError('');
    dispatch(setAppLoading(true));
    try {
      const request = await dispatch(
        registration(
          {
            password1: values.password,
            password2: values.confirmPassword,
            email: values.email,
            full_name: values.userName,
            company: values.companyName,
          },
          accountType === typesOfAccount.contractor
            ? 'contractor'
            : 'subcontractor',
        ),
      );
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        const resp = await dispatch(
          contractorRegister({
            email: values.email,
            password: values.password,
          }),
        );
        if (resp.type.includes(ActionSuffix.SUCCESS)) {
          navigateTo(
            (accountType === typesOfAccount.contractor
              ? ROUTES.CREATE_A_WORKSPACE
              : ROUTES.JOIN_A_WORKSPACE) as never,
            {
              accountType,
            },
          );
        } else {
          throw new Error(resp.type);
        }
      } else {
        const errorArray = Object.values(request?.error?.response?.data || {});
        const errorText = errorArray.length ? errorArray[0] : '';
        setError(errorText);
        throw new Error(request.error);
      }
    } catch (e) {
      console.log('register error', e);
      // setError(e);
      setModalVisible(true);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  return (
    <LoginFlowContainer>
      <EventsModal
        isShow={modalVisible}
        onCloseModal={() => setModalVisible(false)}
        type={'error'}
        onFirstButtonPress={() => setModalVisible(false)}
        title={localization.createAccount.registerError}
        underTitle={String(error)}
        firstButtonTitle={localization.joinWorkSpace.ok}
      />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <Spacer height={43} />
          <Typography
            text={localization.createAccount.createAnAccount}
            type="h2"
            style={styles.headingText}
          />
          <Spacer height={28} />
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={
              accountType === typesOfAccount.contractor
                ? CreateAccountSchema
                : CreateAccountSubContactorSchema
            }
            onSubmit={handleSubmitRegister}
          >
            {({
              dirty,
              values,
              errors,
              isValid,
              handleBlur,
              handleSubmit,
              handleChange,
              touched,
              setFieldValue,
            }) => {
              const onPress = () => {
                setFieldValue('termsAndConditions', !values.termsAndConditions);
              };
              return (
                <View style={styles.main}>
                  <Input
                    error={!!errors.userName && !!touched.userName}
                    isTouched={!!touched.userName}
                    placeholder={localization.createAccount.namePlaceHolder}
                    onBlur={handleBlur('userName')}
                    onChange={handleChange('userName')}
                    value={values.userName}
                  />
                  <ViewContainer height={17.3} style={styles.errorContainer}>
                    <Spacer height={5} />
                    {!!errors.userName && !!touched.userName && (
                      <Typography
                        text={errors.userName as any}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                  {accountType === typesOfAccount.contractor && (
                    <>
                      <Input
                        error={!!errors.companyName && !!touched.companyName}
                        isTouched={!!touched.companyName}
                        placeholder={
                          localization.createAccount.companyPlaceHolder
                        }
                        onBlur={handleBlur('companyName')}
                        onChange={handleChange('companyName')}
                        value={values.companyName}
                      />
                      <ViewContainer
                        style={styles.errorContainer}
                        height={17.3}
                      >
                        <Spacer height={5} />
                        {!!errors.companyName && !!touched.companyName && (
                          <Typography
                            text={errors.companyName as any}
                            fontColor={Colors.red}
                            type="error"
                          />
                        )}
                      </ViewContainer>
                    </>
                  )}
                  <Input
                    error={(!!errors.email && !!touched.email) || !!error}
                    isTouched={!!touched.email}
                    placeholder={localization.createAccount.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    value={values.email}
                    keyBoardType="email-address"
                    isEmail
                    autoCapitalize="none"
                  />
                  <ViewContainer style={styles.errorContainer}>
                    <Spacer height={17} />
                    {(error || (!!errors.email && !!touched.email)) && (
                      <Typography
                        text={error || (errors.email as any)}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                  <Input
                    error={!!errors.password && touched.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    placeholder={localization.createAccount.password}
                    value={values.password}
                    secureTextEntry
                    isPassword
                  />
                  <ViewContainer style={styles.errorContainer}>
                    {!!errors.password && touched.password && (
                      <Typography
                        text={errors.password as any}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                  <PasswordProtected />
                  <Input
                    error={!!errors.confirmPassword && touched.confirmPassword}
                    placeholder={localization.createAccount.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    onChange={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                    isPassword
                  />
                  <ViewContainer style={styles.errorContainer} height={17.3}>
                    <Spacer height={3} />
                    {!!errors.confirmPassword && touched.confirmPassword && (
                      <Typography
                        text={errors.confirmPassword as any}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                  <TermsAndConditions
                    isChecked={values.termsAndConditions}
                    onPress={onPress}
                  />
                  <ViewContainer style={styles.errorContainer} height={17.3}>
                    <Spacer height={3} />
                    {!!errors.termsAndConditions &&
                      touched.termsAndConditions && (
                        <Typography
                          text={errors.termsAndConditions as any}
                          fontColor={Colors.red}
                          type="error"
                        />
                      )}
                  </ViewContainer>
                  <View style={styles.block}>
                    <Spacer height={32} />
                    <View style={styles.nextButtonStyle}>
                      <CustomButton
                        title={localization.createAccount.createAccount}
                        onPress={() => handleSubmit()}
                        borderRadius={20}
                        disabled={!isValid || !dirty}
                        bgColorActive={Colors.orange}
                        bgColorUnactive={Colors.gray4}
                        titleColor={
                          !isValid || !dirty ? Colors.gray5 : Colors.white
                        }
                      />
                    </View>
                  </View>
                  <Spacer height={24} />
                  <HaveAnAccount />
                  <Spacer height={24} />
                  <TermsAndPrivacy />
                </View>
              );
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </LoginFlowContainer>
  );
};

export default CreateAccount;
