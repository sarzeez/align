import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {Colors} from 'theme';
import {ForgotPasswordSchema} from 'helpers/validations';
import {LoginFlowContainer} from 'components/LoginFlowContainer/LoginFlowContainer';
import {PasswordProtected} from 'screens/CreateAccount/PasswordProtected';
import {HaveAnAccount} from 'screens/InitialScreen/HaveAnAccount';
import {CustomButton} from 'components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {forgotPasswordValidateCode} from 'store/actions/auth.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import Header from 'components/Header/Header';
import Spacer from 'components/Spacer/Spacer';
import localization from 'localization/localization';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import ROUTES from 'navigation/routes';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import styles from './styles';
import EventsModal from 'components/EventsModal/EventsModal';
import {usePrevious} from 'helpers/hooks';

type FormValuesType = {
  code: string;
  password: string;
  confirmPassword: string;
};

// Global constants
const INITIAL_VALUES: FormValuesType = {
  code: '',
  password: '',
  confirmPassword: '',
};

const ForgotPasswordSecondStep = () => {
  const navigation = useNavigation();
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const previousValue = usePrevious(modalIsOpen);

  const handleSubmitForgotPassword = async (values: FormValuesType) => {
    Keyboard.dismiss();
    setError('');
    dispatch(setAppLoading(true));
    try {
      const request = await dispatch(
        forgotPasswordValidateCode({
          password1: values.password,
          password2: values.confirmPassword,
          pin: values.code,
        }),
      );
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        setModalOpen(true);
      } else {
        setError(request?.error?.response?.data?.pin[0]);
        throw new Error(request.type);
      }
    } catch (e) {
      //showRequestErrorMessage(e.response?.data?.email);
      // Alert.alert(e as string);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  useEffect(() => {
    if (!modalIsOpen && previousValue) {
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.SIGN_IN as never}],
      });
    }
  }, [modalIsOpen, previousValue]);

  return (
    <LoginFlowContainer>
      <View style={styles.container}>
        <Header bgColor={Colors.transparent} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.main}>
            <View style={styles.stepTwoRow}>
              <Typography text={'—  '} type="h3" fontColor={Colors.gray4} />
              <Typography
                text={localization.signIn.forgotPassword}
                type="h4"
                fontColor={Colors.gray7}
              />
              <Typography text={'  /  '} type="h3" fontColor={Colors.gray4} />
              <Typography
                text={localization.forgotPassword.step2}
                type="h4"
                fontColor={Colors.orange}
              />
            </View>
            <View style={styles.headingContainer}>
              <Typography
                text={localization.forgotPassword.changePassword}
                type="h2"
                fontColor={Colors.textBlack}
                style={styles.headingText}
              />
            </View>
            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={ForgotPasswordSchema}
              onSubmit={handleSubmitForgotPassword}
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
              }) => {
                return (
                  <>
                    <Input
                      error={(!!errors.code && !!touched.code) || !!error}
                      isTouched={!!touched.code}
                      placeholder={localization.createAccount.code}
                      onBlur={handleBlur('code')}
                      onChange={handleChange('code')}
                      value={values.code}
                    />
                    <ViewContainer height={17.3}>
                      <Spacer height={5} />
                      {((!!errors.code && !!touched.code) || !!error) && (
                        <Typography
                          text={(errors.code as any) || error}
                          fontColor={Colors.red}
                          type="error"
                          textCenter
                        />
                      )}
                    </ViewContainer>
                    <Spacer height={5} />
                    <Input
                      error={!!errors.password && touched.password}
                      onBlur={handleBlur('password')}
                      onChange={handleChange('password')}
                      placeholder={localization.forgotPassword.newPassword}
                      value={values.password}
                      secureTextEntry
                      isPassword
                    />
                    {!!errors.password && touched.password && (
                      <ViewContainer>
                        <Spacer height={3} />
                        <Typography
                          text={errors.password as any}
                          fontColor={Colors.red}
                          type="error"
                          textCenter
                        />
                      </ViewContainer>
                    )}
                    <View style={styles.centered}>
                      <PasswordProtected />
                    </View>
                    <Input
                      error={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                      placeholder={localization.forgotPassword.reEnterPassword}
                      onBlur={handleBlur('confirmPassword')}
                      onChange={handleChange('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry
                      isPassword
                    />
                    <ViewContainer>
                      <Spacer height={3} />
                      {!!errors.confirmPassword && touched.confirmPassword && (
                        <Typography
                          text={errors.confirmPassword as any}
                          fontColor={Colors.red}
                          type="error"
                          textCenter
                        />
                      )}
                    </ViewContainer>
                    <View style={styles.nextButtonStyle}>
                      <CustomButton
                        title={localization.forgotPassword.confirm}
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
                  </>
                );
              }}
            </Formik>
            <View style={styles.centered}>
              <HaveAnAccount />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <EventsModal
          isShow={modalIsOpen}
          onCloseModal={() => {
            setModalOpen(false);
          }}
          onFirstButtonPress={() => {
            setModalOpen(false);
          }}
          title={localization.forgotPassword.actionPerformed}
          underTitle={localization.forgotPassword.modalDescription2}
          firstButtonTitle={localization.joinWorkSpace.ok}
        />
      </View>
    </LoginFlowContainer>
  );
};

export default ForgotPasswordSecondStep;
