import React from 'react';
import {Keyboard, View, Image} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {Colors} from 'theme';
import {createWorkspace} from 'store/actions/workspace.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import {CreateWorkSpaceSchema} from 'helpers/validations';
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
import {HaveAnAccount} from 'screens/InitialScreen/HaveAnAccount';

type FormValuesType = {
  workSpace: string;
};

type CreateWorkSpaceProps = {
  route: RouteProp<
    {
      CreateWorkSpaceProps: {
        accountType: string;
      };
    },
    'CreateWorkSpaceProps'
  >;
};

const CreateWorkSpace = ({route}: CreateWorkSpaceProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accountType: string = route.params?.accountType;
  const initialValues: FormValuesType = {
    workSpace: '',
  };

  const handleSubmitRegister = async (values: FormValuesType) => {
    Keyboard.dismiss();
    dispatch(setAppLoading(true));

    try {
      const request = await dispatch(
        createWorkspace({
          name: values.workSpace,
        }),
      );
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        navigation.navigate(
          ROUTES.START_PROJECT as never,
          {
            accountType,
          } as never,
        );
      } else {
        throw new Error(request.type);
      }
    } catch (e) {
      //setError(e?.response?.data?.email);
      //showRequestErrorMessage(e.response?.data?.email);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  return (
    <LoginFlowContainer>
      <View style={styles.container}>
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
          <View>
            <Typography
              text={localization.createWorkSpace.createWorkSpace}
              type="h2"
              fontColor={Colors.textBlack}
              style={styles.headingText}
            />
            <Spacer height={8} />
            <Typography
              text={localization.createWorkSpace.description}
              type="h4"
              fontColor={Colors.gray7}
              textCenter
            />
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={CreateWorkSpaceSchema}
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
            }) => {
              return (
                <>
                  <Spacer height={24} />
                  <Input
                    error={!!errors.workSpace && !!touched.workSpace}
                    isTouched={!!touched.workSpace}
                    placeholder={localization.createWorkSpace.placeholder}
                    onBlur={handleBlur('workSpace')}
                    onChange={handleChange('workSpace')}
                    value={values.workSpace}
                  />
                  <ViewContainer
                    width="100%"
                    height={17.3}
                    style={styles.errorContainer}
                  >
                    <Spacer height={5} />
                    {!!errors.workSpace && !!touched.workSpace && (
                      <Typography
                        text={errors.workSpace as any}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                  <Spacer height={74} />

                  <View style={styles.nextButtonStyle}>
                    <CustomButton
                      title={localization.createWorkSpace.save}
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
          <View style={styles.haveAnAccount}>
            <HaveAnAccount />
          </View>
          <TermsAndPrivacy />
        </KeyboardAwareScrollView>
      </View>
    </LoginFlowContainer>
  );
};

export default CreateWorkSpace;
