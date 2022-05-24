import React, {useState} from 'react';
import {View, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
// import {fetchForgotPassword} from 'store/actions/auth.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import {Colors} from 'theme';
import {EmailSchema} from 'helpers/validations';
import {LoginFlowContainer} from 'components/LoginFlowContainer/LoginFlowContainer';
import {CustomButton} from 'components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InviteMemberImage from 'images/InviteMemberImage';
import SettingsHeader from 'components/Header/SettingsHeader';
import localization from 'localization/localization';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import ROUTES from 'navigation/routes';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import styles from './styles';
import {inviteMembers} from 'store/actions/workspace.actions';
import {getMyWorkspaceSelector} from 'store/reducers/workspace.reducer';

type FormValuesType = {
  email: string;
};

// Global constants
const INITIAL_VALUES: FormValuesType = {
  email: '',
};

const InviteMember = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myWorkspace = useSelector(getMyWorkspaceSelector);
  const [error, setError] = useState<string | unknown>('');
  const id = myWorkspace?.id;

  const handleSubmitForgotPassword = async (values: FormValuesType) => {
    Keyboard.dismiss();
    setError('');
    dispatch(setAppLoading(true));
    try {
      const request = await dispatch(inviteMembers(values.email, id));

      if (request.type.includes(ActionSuffix.SUCCESS)) {
        dispatch(setAppLoading(false));
        navigation.navigate(ROUTES.MY_WORKSPACE as never);
      } else {
        dispatch(setAppLoading(false));
        setError(request.error.response?.data.email[0]);
        // throw new Error(request.type);
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
        <SettingsHeader />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centered}>
            <InviteMemberImage />
          </View>
          <Typography
            text={localization.inviteMembers.header}
            type="h2"
            fontColor={Colors.textBlack}
            style={styles.headingText}
            textCenter
          />
          <Typography
            text={localization.inviteMembers.title}
            type="label"
            fontColor={Colors.gray7}
            style={styles.descriptionText}
            textCenter
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
                      keyBoardType="email-address"
                      value={values.email}
                      isEmail
                      autoCapitalize="none"
                      withShadow
                      bgColor={Colors.white}
                    />

                    {(!!error || (!!errors.email && !!touched.email)) && (
                      <ViewContainer style={styles.errorContainer}>
                        <Typography
                          text={(errors.email as any) || error}
                          fontColor={Colors.red}
                          type="error"
                          textCenter
                        />
                      </ViewContainer>
                    )}
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
        </KeyboardAwareScrollView>
      </View>
    </LoginFlowContainer>
  );
};

export default InviteMember;
