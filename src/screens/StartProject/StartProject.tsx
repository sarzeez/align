import React, {FC, useEffect, useState} from 'react';
import {Keyboard, ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {ItemType} from 'react-native-dropdown-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from 'theme';
import {CreatProjectSchema} from 'helpers/validations';
import {MainFlowContainer} from 'components/MainFlowContainer';
import {CustomButton} from 'components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setAppLoading} from 'store/actions/auth.actions';
import {getWorkspacesList} from 'store/actions/workspace.actions';
import Spacer from 'components/Spacer/Spacer';
import localization from 'localization/localization';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import ROUTES from 'navigation/routes';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import styles from './styles';
import DropDown from 'components/DropDown/DropDown';
import appConfig from 'config/appConfig';
import {getAccountType} from 'store/reducers/auth.reducer';
import {
  getCurrentWorkspace,
  getMyWorkspaceSelector,
  getSubcontractorWorkspaceIdSelector,
} from 'store/reducers/workspace.reducer';
import EventsModal from 'components/EventsModal/EventsModal';
import {usePrevious} from 'helpers/hooks';
import {createProject, updateProject} from 'store/actions/projects.actions';
import {Project} from 'store/reducers/types';
import {showRequestErrorMessage} from 'helpers/functions';
import {usaStatesList} from 'helpers/usaStatesList';
import {typesOfAccount} from '../../typings/types.common';

type FormValuesType = {
  name: string;
  address: string;
  state: string;
  zip_code: string;
};

const GooglePlacesInput = ({
  label,
  onSetAddress,
  onChange,
  address,
}: {
  label: string;
  address: string;
  onSetAddress: (value: string) => void;
  onChange: (value: string) => void;
}) => {
  return (
    <>
      <View>
        <Typography text={label} fontColor={Colors.bodyBase} type="label" />
        <Spacer height={8} />
      </View>
      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps="handled"
        styles={{
          container: styles.googlePlaceContainer,
          textInput: styles.googlePlaceInput,
          textInputContainer: styles.googlePlaceInputContainer,
          poweredContainer: styles.poweredContainer,
        }}
        textInputProps={{
          value: address,
          placeholderTextColor: Colors.placeholderColor,
          onChange,
          renderRightButton: () => <View />,
        }}
        placeholder="Street address"
        onPress={data => {
          onSetAddress(data.description);
        }}
        query={{
          key: appConfig.googleApiKey,
          language: 'en',
        }}
        onFail={error => showRequestErrorMessage(error)}
      />
    </>
  );
};

const StartProject: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const accountType = useSelector(getAccountType);
  const workspaceId = useSelector(getSubcontractorWorkspaceIdSelector);
  const myWorkspace = useSelector(getMyWorkspaceSelector);
  const currentWorkspace = useSelector(getCurrentWorkspace);
  const [isModalVisible, setModalVisible] = useState(false);
  const previousValue = usePrevious(isModalVisible);

  const workspace_id =
    accountType === typesOfAccount.subContractor
      ? workspaceId
      : currentWorkspace?.id || myWorkspace?.id;

  const {params} = route as {params: Project};

  const INITIAL_VALUES: FormValuesType = {
    name: params?.name || '',
    address: params?.address || '',
    state: params?.state || '',
    zip_code: params?.zip_code || '',
  };

  const handleSubmitRegister = async (values: FormValuesType) => {
    Keyboard.dismiss();
    dispatch(setAppLoading(true));
    Promise.all([
      dispatch(
        params?.id
          ? updateProject({
              id: params.id,
              ...values,
            })
          : createProject({
              workspace: Number(workspace_id),
              ...values,
            }),
      ),
    ])
      .then(res => {
        if (params?.id && res[0].payload.data) {
          navigation.navigate(
            ROUTES.PROJECT as never,
            res[0].payload.data as never,
          );
        } else if ((route.params as Record<string, string>)?.withSkip) {
          navigation.navigate(
            ROUTES.ADD_ROOM as never,
            {
              projectId: res[0].payload.data.id,
            } as never,
          );
        } else {
          navigation.goBack();
        }
      })
      .catch(error => {
        if (error) {
          showRequestErrorMessage(JSON.stringify(error));
        }
      })
      .finally(() => {
        dispatch(setAppLoading(false));
      });
  };

  const handleSkip = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (accountType) {
      dispatch(getWorkspacesList(accountType));
    }
  }, [accountType, dispatch]);

  useEffect(() => {
    if (!isModalVisible && previousValue) {
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.SIGN_IN as never}],
      });
    }
  }, [isModalVisible, navigation, previousValue]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardView}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <MainFlowContainer
          title={localization.startProject.project}
          titleLabel={localization.startProject.create}
          withBackButton={
            (route.params as Record<string, boolean>)?.withBackButton
          }
          scrollEnabled
        >
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={styles.scrollViewStyle}
            keyboardShouldPersistTaps="handled"
            horizontal
          >
            <View style={styles.mainContainer}>
              {/* <KeyboardAwareScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false} di> */}
              <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={CreatProjectSchema}
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
                  const onSetState = (item: ItemType) => {
                    setFieldValue('state', item.value);
                  };
                  const onSetAddress = (address: string) => {
                    setFieldValue('address', address);
                  };

                  return (
                    <>
                      <Input
                        label={localization.startProject.name}
                        error={!!errors.name && !!touched.name}
                        isTouched={!!touched.name}
                        placeholder={localization.startProject.name}
                        onBlur={handleBlur('name')}
                        onChange={handleChange('name')}
                        value={values.name}
                      />
                      <ViewContainer
                        width="100%"
                        height={17.3}
                        style={styles.errorContainer}
                      >
                        <Spacer height={5} />
                        {!!errors.name && !!touched.name && (
                          <Typography
                            text={errors.name as any}
                            fontColor={Colors.red}
                            type="error"
                          />
                        )}
                      </ViewContainer>
                      <Spacer height={11.7} />
                      <GooglePlacesInput
                        address={values.address}
                        onChange={handleChange('address')}
                        onSetAddress={onSetAddress}
                        label={localization.startProject.address}
                      />
                      <ViewContainer
                        style={styles.errorContainer}
                        width="100%"
                        height={17.3}
                      >
                        <Spacer height={5} />
                        {!!errors.address && !!touched.address && (
                          <Typography
                            text={errors.address as any}
                            fontColor={Colors.red}
                            type="error"
                          />
                        )}
                      </ViewContainer>
                      <Spacer height={11.7} />
                      <ViewContainer flexDirection="row" style={{zIndex: 1000}}>
                        <ViewContainer flex={1} height={80}>
                          <DropDown
                            options={usaStatesList}
                            value={values.state}
                            label={localization.startProject.state}
                            placeholder={localization.startProject.state}
                            onSetItem={onSetState}
                          />
                          <ViewContainer
                            width="100%"
                            height={17.3}
                            style={styles.errorContainer}
                          >
                            <Spacer height={5} />
                            {!!errors.state && !!touched.state && (
                              <Typography
                                text={errors.state as any}
                                fontColor={Colors.red}
                                type="error"
                              />
                            )}
                          </ViewContainer>
                        </ViewContainer>
                        <Spacer width={15} />
                        <ViewContainer flex={1} height={102}>
                          <Input
                            containerStyle={styles.inputContainerStyle}
                            label={localization.startProject.zip_code}
                            error={!!errors.zip_code && touched.zip_code}
                            onBlur={handleBlur('zip_code')}
                            onChange={handleChange('zip_code')}
                            placeholder={localization.startProject.zip_code}
                            value={values.zip_code}
                          />
                          <ViewContainer
                            width="100%"
                            height={17.3}
                            style={styles.errorContainer}
                          >
                            <Spacer height={5} />
                            {!!errors.zip_code && !!touched.zip_code && (
                              <Typography
                                text={errors.zip_code as any}
                                fontColor={Colors.red}
                                type="error"
                              />
                            )}
                          </ViewContainer>
                        </ViewContainer>
                      </ViewContainer>
                      <Spacer height={12} />
                      <View style={styles.buttonContainer}>
                        <CustomButton
                          title={localization.createWorkSpace.save}
                          onPress={() => handleSubmit()}
                          disabled={!isValid || !dirty}
                          bgColorActive={Colors.orange}
                          bgColorUnactive={Colors.gray4}
                        />
                      </View>
                      {(route.params as Record<string, boolean>)?.withSkip && (
                        <View style={styles.bottomRow}>
                          <Typography
                            type={'h3'}
                            text={localization.startProject.later + ' '}
                            fontColor={Colors.textGray}
                          />
                          <TouchableOpacity onPress={handleSkip}>
                            <Typography
                              type={'h3'}
                              text={localization.startProject.skip}
                              fontColor={Colors.orange}
                              underlined
                              style={styles.orangeText}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  );
                }}
              </Formik>
              {/* </KeyboardAwareScrollView> */}
            </View>
            <EventsModal
              isShow={isModalVisible}
              onCloseModal={handleCloseModal}
              onFirstButtonPress={handleCloseModal}
              underTitle={localization.startProject.modalTitle}
              title={localization.startProject.modalHeading}
              firstButtonTitle={localization.joinWorkSpace.ok}
            />
          </ScrollView>
        </MainFlowContainer>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default StartProject;
