import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {fetchForgotPassword} from 'store/actions/auth.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import {Colors} from 'theme';
import {EmailSchema} from 'helpers/validations';
import {LoginFlowContainer} from 'components/LoginFlowContainer/LoginFlowContainer';
import {HaveAnAccount} from 'screens/InitialScreen/HaveAnAccount';
import {CustomButton} from 'components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MailIcon from './assets/mail';
import Header from 'components/Header/Header';
import localization from 'localization/localization';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import ROUTES from 'navigation/routes';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import styles from './styles';
import EventsModal from 'components/EventsModal/EventsModal';

type FormValuesType = {
  email: string;
};

// Global constants
const INITIAL_VALUES: FormValuesType = {
  email: '',
};

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmitForgotPassword = async (values: FormValuesType) => {
    dispatch(setAppLoading(true));
    try {
      const request = await dispatch(fetchForgotPassword(values.email));

      if (request.type.includes(ActionSuffix.SUCCESS)) {
        setModalOpen(true);
      } else {
        throw new Error(request.type);
      }
    } catch (e) {
      console.log('Forgot password error', e);
      // showRequestErrorMessage(e.response?.data?.email);
      // Alert.alert(e as string);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  return (
    <LoginFlowContainer>
      <View style={styles.container}>
        <Header bgColor={Colors.transparent} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centered}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.illustration}
                source={require('./assets/Illustration.png')}
              />
            </View>
          </View>
          <Typography
            text={localization.forgotPassword.forgotPassword}
            type="h2"
            fontColor={Colors.textBlack}
            style={styles.headingText}
          />
          <Typography
            text={localization.forgotPassword.firstDescription}
            type="label"
            fontColor={Colors.gray7}
          />
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={EmailSchema}
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
                  <View style={styles.inputBlock}>
                    <Input
                      error={!!errors.email && !!touched.email}
                      isTouched={!!touched.email}
                      placeholder={localization.createAccount.email}
                      onBlur={handleBlur('email')}
                      onChange={handleChange('email')}
                      value={values.email}
                      keyBoardType="email-address"
                      isEmail
                      autoCapitalize="none"
                    />
                    <ViewContainer
                      width="100%"
                      height={17.3}
                      style={styles.errorContainer}
                    >
                      {!!errors.email && !!touched.email && (
                        <Typography
                          text={errors.email as any}
                          fontColor={Colors.red}
                          type="error"
                        />
                      )}
                    </ViewContainer>
                  </View>
                  <View style={styles.nextButtonStyle}>
                    <CustomButton
                      title={localization.forgotPassword.send}
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
        </KeyboardAwareScrollView>
        <EventsModal
          isShow={modalIsOpen}
          onCloseModal={() => setModalOpen(false)}
          icon={<MailIcon />}
          onFirstButtonPress={() => {
            setModalOpen(false);
            navigation.navigate(ROUTES.FORGOT_PASSWORD_SECOND_STEP as never);
          }}
          title={localization.forgotPassword.emailSent}
          underTitle={localization.forgotPassword.modalDescription}
          firstButtonTitle={localization.joinWorkSpace.ok}
        />
      </View>
    </LoginFlowContainer>
  );
};

export default ForgotPassword;
