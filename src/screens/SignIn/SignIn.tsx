import React, {useState} from 'react';
import {Alert, Keyboard, View, Image, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLogin,
  logout,
  deleteTemporaryTokens,
} from 'store/actions/auth.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import {Colors} from 'theme';
import {SignInSchema} from 'helpers/validations';
import {TermsAndPrivacy} from 'screens/InitialScreen/TermsAndPrivacy';
import {LoginFlowContainer} from 'components/LoginFlowContainer/LoginFlowContainer';
import {CustomButton} from 'components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spacer from 'components/Spacer/Spacer';
import localization from 'localization/localization';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import ROUTES from 'navigation/routes';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import styles from './styles';
import {
  getTemporaryToken,
  getTemporaryRefresh,
} from 'store/reducers/auth.reducer';
import LoginScreenImage from 'images/LoginScreenImage';

type FormValuesType = {
  password: string;
  email: string;
};

const SignIn = () => {
  const navigation = useNavigation();
  const access = useSelector(getTemporaryToken);
  const refresh = useSelector(getTemporaryRefresh);
  const [error, setError] = useState<string | unknown>('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const initialValues: FormValuesType = {
    email: '',
    password: '',
  };

  const onForgotPasswordHandle = () => {
    navigation.navigate(ROUTES.FORGOT_PASSWORD as never);
  };

  const killTokens = async () => {
    try {
      const request = await dispatch(
        logout({
          refresh,
          access,
        }),
      );
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        dispatch(deleteTemporaryTokens());
      } else {
        // setError(request.error.response?.data?.detail);
        //showRequestErrorMessage(request.error.response?.data?.email);
      }
    } catch (e) {
      //showRequestErrorMessage(e.response?.data?.email);
      Alert.alert(e as string);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  useFocusEffect(() => {
    if (access && refresh && isFocused) {
      killTokens();
    }
  });

  const handleSubmitSignIn = async (values: FormValuesType) => {
    Keyboard.dismiss();
    setError('');
    dispatch(setAppLoading(true));
    try {
      const request = await dispatch(
        fetchLogin({
          password: values.password,
          email: values.email,
        }),
      );
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        return;
      } else {
        setError(request.error.response?.data?.detail);
        //showRequestErrorMessage(request.error.response?.data?.email);
      }
    } catch (e) {
      //showRequestErrorMessage(e.response?.data?.email);
      Alert.alert(e as string);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  return (
    <LoginFlowContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.backgroundContainer}>
          <LoginScreenImage />
        </View>
        <View style={styles.main}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require('components/InitialScreenCarousel/assets/Slide1Bottom.png')}
            />
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={handleSubmitSignIn}
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
                    error={(!!errors.email && !!touched.email) || !!error}
                    isTouched={!!touched.email}
                    placeholder={localization.createAccount.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    value={values.email}
                    keyBoardType="email-address"
                    isEmail
                    bgColor={Colors.white}
                    autoCapitalize="none"
                  />
                  <ViewContainer height={17.3} style={styles.errorContainer}>
                    <Spacer height={5} />
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
                    bgColor={Colors.white}
                    secureTextEntry
                    isPassword
                  />
                  <ViewContainer style={styles.errorContainer} height={17.3}>
                    {!!errors.password && touched.password && (
                      <Typography
                        text={errors.password as any}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                  <View style={styles.bottomRow}>
                    <View style={styles.smallBtn}>
                      <CustomButton
                        title={localization.signIn.login}
                        onPress={() => handleSubmit()}
                        borderRadius={20}
                        bgColorActive={Colors.orange}
                        bgColorUnactive={Colors.gray4}
                        titleColor={Colors.white}
                        activeOpacity={0.7}
                      />
                    </View>
                    <View style={styles.smallBtn}>
                      <CustomButton
                        title={localization.signIn.newAccount}
                        onPress={() =>
                          navigation.navigate('GetStarted' as never)
                        }
                        borderRadius={20}
                        bgColorActive={Colors.white}
                        bgColorUnactive={Colors.gray4}
                        titleColor={Colors.black2}
                        activeOpacity={0.7}
                      />
                    </View>
                  </View>
                </>
              );
            }}
          </Formik>
          <TouchableOpacity onPress={() => onForgotPasswordHandle()}>
            <Typography
              text={localization.signIn.forgotPassword as any}
              fontColor={Colors.white1}
              type={'button'}
              style={styles.forgotPasswordText}
            />
          </TouchableOpacity>
          <TermsAndPrivacy textColor={Colors.white1} />
        </View>
      </KeyboardAwareScrollView>
    </LoginFlowContainer>
  );
};

export default SignIn;
