import React, {useState, useMemo, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Colors} from 'theme';
import {useDispatch, useSelector} from 'react-redux';
import {LoginFlowContainer} from 'components/LoginFlowContainer/LoginFlowContainer';
import {CustomButton} from 'components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CodeEntry} from 'components/CodeEntry';
import {
  setAppLoading,
  setIsAuth,
  iDontHavePin,
} from 'store/actions/auth.actions';
import {
  getAccountType,
  getContinueWithoutPin,
} from 'store/reducers/auth.reducer';

import {
  getSubcontractorCurrentWorkspaceId,
  getWorkspaceById,
  joinWorkspace,
  setSubcontractorWorkspaceId,
} from 'store/actions/workspace.actions';
import {ActionSuffix} from 'store/models';
// import {navigateTo} from 'navigation/navigation.service';
import Spacer from 'components/Spacer/Spacer';
import localization from 'localization/localization';
import ROUTES from 'navigation/routes';
import Typography from 'components/Typography/Typography';
import styles from './styles';
import EventsModal from 'components/EventsModal/EventsModal';
import {usePrevious} from 'helpers/hooks';
import {navigateTo} from 'navigation/navigation.service';

type JoinWorkSpaceProps = {
  route: RouteProp<
    {
      JoinWorkSpaceProps: {
        isNotAuthenticated?: boolean;
      };
    },
    'JoinWorkSpaceProps'
  >;
};

const INITIAL_VALUE = ['', '', '', '', '', ''];
const NUM_DIGITS_CODE = INITIAL_VALUE.length;

const JoinWorkSpace = ({route}: JoinWorkSpaceProps) => {
  const navigation = useNavigation();
  const continueWithoutWorkspace = useSelector(getContinueWithoutPin);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUE);
  const [isModalVisible, setModalVisible] = useState(false);
  const previousValue = usePrevious(isModalVisible);
  const isNotAuthenticated = !route?.params?.isNotAuthenticated;
  const accountType = useSelector(getAccountType);

  const codeValidationOk = useMemo(
    () => values.join('').length === NUM_DIGITS_CODE,
    [values],
  );

  const handleAnimationEnd = () => {
    setError(false);
    setValues(INITIAL_VALUE);
  };

  const handleSubmit = async () => {
    dispatch(setAppLoading(true));
    try {
      const request = await dispatch(
        joinWorkspace(parseInt(values.join(''), 10)),
      );

      if (request.type.includes(ActionSuffix.SUCCESS)) {
        dispatch(setSubcontractorWorkspaceId(request?.payload?.data?.id));

        dispatch(getWorkspaceById(request?.payload?.data?.id, accountType));

        setModalVisible(true);
      } else {
        const serverMessage = request.error.response?.data.detail[0];
        setError(true);
        return showMessage({
          message: 'Oops!',
          description: serverMessage,
          type: 'danger',
          autoHide: true,
          hideOnPress: true,
          position: 'top',
          floating: true,
        });
        // throw new Error(request.type);
      }
    } catch (e) {
      setError(true);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  const handleNoPin = () => {
    setModalVisible(true);
    dispatch(iDontHavePin(true));
  };

  useEffect(() => {
    if (!isModalVisible && previousValue) {
      if (isNotAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{name: ROUTES.SIGN_IN as never}],
        });
      } else {
        navigation.goBack();
      }
    }
  }, [isModalVisible, previousValue]);

  const onCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <LoginFlowContainer>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollview}
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          extraScrollHeight={10}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.illustration}
              source={require('screens/CreateWorkSpace/assets/Illustration.png')}
            />
          </View>
          <Typography
            text={localization.joinWorkSpace.joinWorkspace}
            type="h2"
            fontColor={Colors.textBlack}
            style={styles.headingText}
          />
          <Spacer height={8} />
          <Typography
            text={localization.joinWorkSpace.enterPin}
            type="h4"
            fontColor={Colors.gray7}
            textCenter
          />
          <View style={styles.codeContainer}>
            <CodeEntry
              values={values}
              onChangeInput={newValues => setValues(newValues)}
              showAnimation={error}
              onAnimationEnd={() => handleAnimationEnd()}
              error={error}
              numOfSymbols={NUM_DIGITS_CODE}
            />
          </View>
          <View style={styles.nextButtonStyle}>
            <CustomButton
              title={localization.createWorkSpace.save}
              onPress={() => handleSubmit()}
              borderRadius={20}
              disabled={!codeValidationOk}
              bgColorActive={Colors.orange}
              bgColorUnactive={Colors.gray4}
              titleColor={!codeValidationOk ? Colors.gray5 : Colors.white}
            />
          </View>
          {isNotAuthenticated && (
            <TouchableOpacity onPress={() => handleNoPin()}>
              <Typography
                type={'h3'}
                text={localization.joinWorkSpace.iDontHaveAPin}
                fontColor={Colors.black2}
                underlined
                style={styles.darkText}
              />
            </TouchableOpacity>
          )}
        </KeyboardAwareScrollView>
      </View>
      <EventsModal
        isShow={isModalVisible}
        onCloseModal={onCloseModal}
        onFirstButtonPress={onCloseModal}
        underTitle={
          isNotAuthenticated
            ? localization.startProject.modalTitle
            : localization.joinWorkSpace.modalHeading
        }
        title={
          isNotAuthenticated
            ? localization.startProject.modalHeading
            : localization.joinWorkSpace.modalTitle
        }
        firstButtonTitle={localization.joinWorkSpace.ok}
      />
    </LoginFlowContainer>
  );
};

export default JoinWorkSpace;
