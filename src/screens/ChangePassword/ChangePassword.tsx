import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {Colors} from 'theme';
import {ChangePasswordSchema} from 'helpers/validations';
import WithBackgroundImageWrapper from 'components/WithBackgroundImageWrapper/WithBackgroundImageWrapper';
import {PasswordProtected} from 'screens/CreateAccount/PasswordProtected';
import {CustomButton} from 'components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {changePassword} from 'store/actions/auth.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import SettingsHeader from 'components/Header/SettingsHeader';
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
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

// Global constants
const INITIAL_VALUES: FormValuesType = {
  oldPassword: '',
  password: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const navigation = useNavigation();
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const previousValue = usePrevious(modalIsOpen);
  const handleSubmitChangePassword = async (values: FormValuesType) => {
    Keyboard.dismiss();
    dispatch(setAppLoading(true));

    const formValues = {
      password1: values.password,
      password2: values.confirmPassword,
      old_password: values.oldPassword,
    };
    try {
      const request = await dispatch(changePassword(formValues));
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        setModalOpen(true);
      } else {
        const serverMessage = request.error.response?.data;

        if (serverMessage.non_field_errors) {
          setError(serverMessage.non_field_errors[0]);
        } else if (serverMessage.old_password) {
          setError(serverMessage.old_password[0]);
        }

        // throw new Error(request.type);
      }
    } catch (e) {
      console.log('err', e);
      // setError(e.response?.data);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  useEffect(() => {
    if (!modalIsOpen && previousValue) {
      navigation.navigate(ROUTES.SETTINGS_NAV as never);
    }
  }, [modalIsOpen, previousValue]);

  return (
    <WithBackgroundImageWrapper>
      <SettingsHeader heading={localization.forgotPassword.changePassword} />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.main}>
            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={ChangePasswordSchema}
              onSubmit={handleSubmitChangePassword}
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
                    <ViewContainer flex={1}>
                      <Spacer height={43.5} />
                      <Input
                        bgColor={Colors.white}
                        error={!!errors.oldPassword && !!touched.oldPassword}
                        isTouched={!!touched.oldPassword}
                        placeholder={localization.changePassword.oldPassword}
                        onBlur={handleBlur('oldPassword')}
                        onChange={handleChange('oldPassword')}
                        value={values.oldPassword}
                        withShadow
                        autoCapitalize="none"
                      />
                      {((!!errors.oldPassword && !!touched.oldPassword) ||
                        !!error) && (
                        <Typography
                          text={(errors.oldPassword as any) || error}
                          fontColor={Colors.red}
                          type="error"
                          textCenter
                        />
                      )}
                      <Spacer height={12} />
                      <Input
                        bgColor={Colors.white}
                        error={!!errors.password && touched.password}
                        onBlur={handleBlur('password')}
                        onChange={handleChange('password')}
                        placeholder={localization.forgotPassword.newPassword}
                        value={values.password}
                        secureTextEntry
                        withShadow
                        autoCapitalize="none"
                      />
                      {!!errors.password && touched.password && (
                        <ViewContainer>
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
                        bgColor={Colors.white}
                        error={
                          !!errors.confirmPassword && touched.confirmPassword
                        }
                        placeholder={
                          localization.changePassword.reEnterNewPassword
                        }
                        onBlur={handleBlur('confirmPassword')}
                        onChange={handleChange('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry
                        withShadow
                        autoCapitalize="none"
                      />
                      <ViewContainer>
                        {!!errors.confirmPassword &&
                          touched.confirmPassword && (
                            <Typography
                              text={errors.confirmPassword as any}
                              fontColor={Colors.red}
                              type="error"
                              textCenter
                            />
                          )}
                      </ViewContainer>
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
          title={localization.changePassword.success}
          underTitle={localization.changePassword.description}
          firstButtonTitle={localization.joinWorkSpace.ok}
        />
      </View>
    </WithBackgroundImageWrapper>
  );
};

export default ChangePassword;
