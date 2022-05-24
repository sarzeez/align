import React, {useState} from 'react';
import {TouchableOpacity, View, Keyboard, Alert, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

import SettingsHeader from 'components/Header/SettingsHeader';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import styles from './styles';
import localization from 'localization/localization';
import {getProfile} from 'store/reducers/profile.reducer';
import Spacer from 'components/Spacer/Spacer';
import {Colors} from 'theme';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import {setAppLoading} from 'store/actions/auth.actions';
import {getUser} from 'store/actions/user.actions';
import Button from 'components/Button/Button';
import {ActionSuffix} from 'store/models';
import {
  EditContractorSchema,
  EditSubContractorSchema,
} from 'helpers/validations';
import WithBackgroundImageWrapper from 'components/WithBackgroundImageWrapper/WithBackgroundImageWrapper';
import AvatarPlaceHolder from 'images/AvatarPlaceholder';
import {File, Pickers} from 'typings/types.common';
import CameraIconFilled from 'images/CameraIconFilled';
import ImagePicker from 'components/ImagePicker/ImagePicker';
import {getAccountType, getToken} from 'store/reducers/auth.reducer';
import appConfig from 'config/appConfig';
import {typesOfAccount} from 'typings/types.common';

type FormValuesType = {
  email: string;
  userName: string;
  companyName?: string | undefined;
};

const EditMyAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userProfile = useSelector(getProfile);
  const accountType = useSelector(getAccountType);
  const isContractor = !!userProfile?.contractor;
  const token = useSelector(getToken);
  // const isSubContractor = !!userProfile?.subcontractor;
  const [error, setError] = useState<string | unknown>('');
  const [showAccessModal, setToShowAccessModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const initialValues: FormValuesType = {
    userName: userProfile.full_name,
    companyName: userProfile?.contractor?.company,
    email: userProfile.email,
    // position: userProfile?.position,
    // phoneNumber: userProfile?.phoneNumber,
  };

  const typeOfUser =
    accountType === typesOfAccount.contractor ? 'contractor' : 'subcontractor';

  const handleSubmitRegister = async (values: FormValuesType) => {
    Keyboard.dismiss();
    setError('');
    dispatch(setAppLoading(true));
    const formData = new FormData();
    formData.append('full_name', values.userName);
    formData.append('email', values.email);
    formData.append('company', values.companyName);
    if (userAvatar?.uri) {
      formData.append('avatar', userAvatar);
    }
    try {
      const request = await fetch(`${appConfig.baseUrl}/users/${typeOfUser}/`, {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          Authorization: `JWT ${token}`,
        },
        body: formData,
      });
      console.log(request);
      if (`${request?.status}`.includes('20')) {
        const resp = await dispatch(getUser());
        if (resp?.type?.includes(ActionSuffix.SUCCESS)) {
          dispatch(setAppLoading(false));
          navigation.goBack();
        } else {
          dispatch(setAppLoading(false));
        }
      } else {
        setError(request?.error?.response?.data?.email);
        dispatch(setAppLoading(false));
        //showRequestErrorMessage(request.error.response?.data?.email);
      }
    } catch (e) {
      //setError(e?.response?.data?.email);
      //showRequestErrorMessage(e.response?.data?.email);
      dispatch(setAppLoading(false));
      Alert.alert(e as string);
    }
  };

  const handleAddAvatar = (file: File) => {
    setUserAvatar(file);
  };

  return (
    <WithBackgroundImageWrapper>
      <SettingsHeader heading={localization.myAccount.heading} />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Spacer height={20} />
        <ViewContainer
          width="100%"
          alignItems="center"
          style={styles.container}
        >
          <View style={styles.imageContainer}>
            {userAvatar || userProfile?.avatar ? (
              <Image
                source={{uri: userAvatar?.uri || (userProfile?.avatar as any)}}
                style={styles.imageContainer}
              />
            ) : (
              <AvatarPlaceHolder />
            )}
            <ViewContainer
              alignItems="flex-end"
              width={'100%'}
              style={styles.imagePicker}
            >
              <ImagePicker
                cameraType="single"
                actions={[Pickers.Photos, Pickers.Camera]}
                icon={<CameraIconFilled />}
                onSelectFile={handleAddAvatar}
              />
            </ViewContainer>
          </View>
        </ViewContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={
            isContractor ? EditContractorSchema : EditSubContractorSchema
          }
          onSubmit={handleSubmitRegister}
        >
          {({
            // dirty,
            values,
            errors,
            // isValid,
            // handleBlur,
            handleSubmit,
            handleChange,
            touched,
          }) => {
            return (
              <View style={styles.main}>
                <Input
                  bgColor={Colors.white}
                  label="Full Name"
                  error={!!errors.userName && !!touched.userName}
                  isTouched={!!touched.userName}
                  placeholder={localization.createAccount.namePlaceHolder}
                  onChange={handleChange('userName')}
                  value={values.userName}
                  withShadow
                />
                <ViewContainer height={17.3}>
                  <Spacer height={5} />
                  {!!errors.userName && !!touched.userName && (
                    <Typography
                      text={errors.userName as any}
                      fontColor={Colors.red}
                      type="error"
                    />
                  )}
                </ViewContainer>
                {isContractor && (
                  <>
                    <Input
                      bgColor={Colors.white}
                      label="Company Name"
                      error={!!errors.companyName && !!touched.companyName}
                      isTouched={!!touched.companyName}
                      placeholder={
                        localization.createAccount.companyPlaceHolder
                      }
                      onChange={handleChange('companyName')}
                      value={values.companyName}
                      withShadow
                    />
                    <ViewContainer height={17.3}>
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

                {/* {isSubContractor && (
                  <>
                    <Input
                      bgColor={Colors.white}
                      label="Position"
                      error={!!errors.position && !!touched.position}
                      isTouched={!!touched.position}
                      placeholder={localization.createAccount.position}
                      onChange={handleChange('position')}
                      value={values.companyName}
                      withShadow
                    />
                    <ViewContainer height={17.3}>
                      <Spacer height={5} />
                      {!!errors.position && !!touched.position && (
                        <Typography
                          text={errors.position as any}
                          fontColor={Colors.red}
                          type="error"
                        />
                      )}
                    </ViewContainer>
                  </>
                )} */}
                <Input
                  bgColor={Colors.white}
                  label="Email"
                  error={(!!errors.email && !!touched.email) || !!error}
                  isTouched={!!touched.email}
                  placeholder={localization.createAccount.email}
                  onChange={handleChange('email')}
                  keyBoardType="email-address"
                  value={values.email}
                  isEmail
                  withShadow
                  autoCapitalize="none"
                />
                <ViewContainer height={17.3}>
                  <Spacer height={5} />
                  {(error || (!!errors.email && !!touched.email)) && (
                    <Typography
                      text={error || (errors.email as any)}
                      fontColor={Colors.red}
                      type="error"
                    />
                  )}
                </ViewContainer>
                {/* {isSubContractor && (
                  <>
                    <Input
                      bgColor={Colors.white}
                      label="Phone Number"
                      error={!!errors.phoneNumber && !!touched.phoneNumber}
                      isTouched={!!touched.phoneNumber}
                      placeholder={localization.createAccount.phoneNumber}
                      onChange={handleChange('phoneNumber')}
                      value={values.phoneNumber}
                      withShadow
                    />
                    <ViewContainer height={17.3}>
                      <Spacer height={5} />
                      {!!errors.phoneNumber && !!touched.phoneNumber && (
                        <Typography
                          text={errors.phoneNumber as any}
                          fontColor={Colors.red}
                          type="error"
                        />
                      )}
                    </ViewContainer>
                  </>
                )} */}
                <View style={styles.block}>
                  <View style={styles.nextButtonStyle}>
                    <Button
                      style={styles.submitButton}
                      btnText={localization.myAccount.update}
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </WithBackgroundImageWrapper>
  );
};

export default EditMyAccount;
