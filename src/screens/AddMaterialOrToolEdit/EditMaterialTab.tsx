import {View, Keyboard, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {useFormik} from 'formik';
import Typography from 'components/Typography/Typography';
import DropDown from 'components/DropDown/DropDown';
import Spacer from 'components/Spacer/Spacer';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Input from 'components/Input/Input';
import {CustomButton} from 'components/CustomButton';
import localization from 'localization/localization';
import {AddMaterialSchema} from 'helpers/validations';
import {Colors} from 'theme';

import {styles} from './style';
import SelectTool from 'screens/SelectTool/SelectTool';
import SelectOptionModal from 'components/SelectOptionModal/SelectOptionModal';
import CalendarModal from 'components/CalendarModal/CalendarModal';
import appConfig from 'config/appConfig';
import {getTemporaryToken, getToken} from 'store/reducers/auth.reducer';
import {useDispatch, useSelector} from 'react-redux';
import {getSelectedProject} from 'store/reducers/project.reducer';
import {getTools} from 'store/reducers/material.tool.reducer';
import {useNavigation} from '@react-navigation/native';
import {loadMaterialTypes} from 'store/actions/material.tool.actions';
import {getCurrentWorkspace} from 'store/reducers/workspace.reducer';
import EventModal from 'components/EventsModal/EventsModal';

const PRIORITY_TYPES = [
  {label: 'Low', value: 'low'},
  {label: 'Medium', value: 'medium'},
  {label: 'High', value: 'high'},
];

type FormikMateriallType = {
  label: string;
  value: number | undefined;
};

type FormValuesType = {
  material: FormikMateriallType;
  material_note: string;
  priority: string;
  assignee: string;
  room: string;
  due_date: string;
  description: string;
};

const EditMaterialTab = (route: any) => {
  const paramData = route?.params?.material;
  const materialId = route?.params?.id;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [newToolModalVisible, setNewToolModalVisible] = useState(false);
  const [selectNewToolModalVisible, setSelectNewToolModalVisible] =
    useState(false);
  const [calendaModalVisible, setCalenadarModalVisible] = useState(false);
  const [newMaterialState, setNewMaterialState] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const token = useSelector(getToken);
  const temporaryToken = useSelector(getTemporaryToken);
  const selectedProject = useSelector(getSelectedProject);
  const myWorkspace = useSelector(getCurrentWorkspace);
  const materialTool = useSelector(getTools);

  let initData = {
    material: paramData.material,
    material_note: paramData.material_note,
    priority: paramData.priority,
    room: paramData.room,
    due_date: paramData.due_date.split('-').join('/'),
    assignee: paramData.assignee,
    description: paramData.description,
  };

  const formik = useFormik({
    initialValues: initData,
    validationSchema: AddMaterialSchema,
    onSubmit: async (values: FormValuesType) => {
      Keyboard.dismiss();

      const newValues = {
        ...values,
        material: values.material.value,
        due_date: values.due_date.split('/').reverse().join('-'),
      };
      const formData = new FormData();
      Object.keys(newValues).forEach(i => formData.append(i, newValues[i]));

      let isError = false;
      try {
        let response = await fetch(
          `${appConfig.baseUrl}/projects/${selectedProject.id}/rooms/${values.room}/materials/${materialId}/`,
          {
            method: 'PUT',
            headers: {
              Authorization: `JWT ${temporaryToken || token}`,
            },
            body: formData,
          },
        )
          .then(response => {
            if (response.status !== 200) isError = true;
            return response;
          })
          .then(response => response.json());

        if (!isError) {
          setSuccessModalVisible(true);
        } else {
          setErrorMsg(JSON.stringify(response));
          setErrorModalVisible(true);
        }
      } catch (error) {
        // console.log(error);
      }
    },
  });

  const handleAddNewTool = () => {
    setSelectNewToolModalVisible(false);
    setNewToolModalVisible(true);
  };

  const handleSetItemToolType = (item: any) => {
    formik.setFieldValue('material', item);
    setSelectNewToolModalVisible(false);
  };

  const handleSetCalendar = (item: any) => {
    formik.setFieldValue('due_date', item);
  };

  const handleAddNewMaterialModal = async () => {
    const values = {
      name: newMaterialState,
      workspace: myWorkspace?.id,
    };
    const formData = new FormData();
    Object.keys(values).forEach(i => formData.append(i, values[i]));
    try {
      await fetch(`${appConfig.baseUrl}/projects/materials_choice/`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${temporaryToken || token}`,
        },
        body: formData,
      });
      setNewToolModalVisible(false);
      // navigation.goBack();
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <View style={{flex: 1}}>
      <EventModal
        isShow={successModalVisible}
        onCloseModal={() => {
          setSuccessModalVisible(false);
        }}
        type={'success'}
        title={'Success'}
        underTitle={'New tool successfull added!'}
        onFirstButtonPress={() => {
          setSuccessModalVisible(false);
          setTimeout(() => {
            navigation.goBack();
          }, 0);
        }}
      />
      <EventModal
        isShow={errorModalVisible}
        onCloseModal={() => {
          setErrorModalVisible(false);
        }}
        type={'error'}
        title={'Error'}
        underTitle={errorMsg}
        onFirstButtonPress={() => {
          setErrorModalVisible(false);
        }}
      />
      <SelectOptionModal
        isShow={newToolModalVisible}
        title={'New Material'}
        label={'Material Type'}
        firstState={newMaterialState}
        firstOnchange={(text: any) => {
          setNewMaterialState(text);
        }}
        onCloseModal={() => setNewToolModalVisible(false)}
        onFirstButtonPress={handleAddNewMaterialModal}
      />
      <SelectTool
        modalVisible={selectNewToolModalVisible}
        setModalVisible={setSelectNewToolModalVisible}
        handleAddNewTool={handleAddNewTool}
        onPress={handleSetItemToolType}
        list={materialTool.material}
      />
      <CalendarModal
        isVisible={calendaModalVisible}
        onClose={() => {
          setCalenadarModalVisible(false);
        }}
        onSetDate={handleSetCalendar}
      />
      <Spacer height={24} />
      <ViewContainer style={{...styles.container, zIndex: 5}}>
        <ViewContainer flex={1} height={80}>
          <Typography
            text={'Material'}
            fontColor={Colors.bodyBase}
            type="label"
          />
          <Spacer height={8} />
          <TouchableOpacity
            style={styles.selectToolDropdown}
            onPress={() => {
              setSelectNewToolModalVisible(true);
              dispatch(loadMaterialTypes());
            }}
          >
            <Typography
              text={formik.values.material.label || 'Select Material'}
              style={styles.selectToolDropdownText}
              fontColor={
                formik.values.material.label
                  ? Colors.darkBlue
                  : Colors.placeholderColor
              }
            />
            {/* <RightArrowIcon /> */}
          </TouchableOpacity>
        </ViewContainer>
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={styles.container}>
        <Input
          label={'Material Notes'}
          placeholder={'Type material notes here...'}
          error={
            !!formik.errors.material_note && !!formik.touched.material_note
          }
          isTouched={!!formik.touched.material_note}
          onChange={value => formik.setFieldValue('material_note', value)}
          value={formik.values.material_note}
          multiline={true}
          numberOfLines={10}
          inputStyle={{height: 150}}
          containerStyle={{height: 150}}
        />
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={{...styles.container, zIndex: 4}}>
        <ViewContainer flex={1} height={80}>
          <DropDown
            options={PRIORITY_TYPES}
            value={formik.values.priority}
            label={'Priority'}
            placeholder={'Priority'}
            onSetItem={({value}) => formik.setFieldValue('priority', value)}
          />
          <ViewContainer
            width="100%"
            height={17.3}
            style={styles.errorContainer}
          >
            <Spacer height={5} />
            {!!formik.errors.priority && !!formik.touched.priority && (
              <Typography
                text={formik.errors.priority}
                fontColor={Colors.red}
                type="error"
              />
            )}
          </ViewContainer>
        </ViewContainer>
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={{...styles.container, zIndex: 3}}>
        <ViewContainer flex={1} height={80}>
          <DropDown
            options={materialTool.assignee}
            value={formik.values.assignee}
            label={'Assignee'}
            placeholderStyle={
              paramData.assignee ? {color: Colors.darkBlue} : {}
            }
            placeholder={
              paramData.assignee
                ? materialTool.assignee.find(
                    item => item.value == paramData.assignee,
                  )?.label
                : 'Assignee'
            }
            onSetItem={({value}) => formik.setFieldValue('assignee', value)}
          />
          <ViewContainer
            width="100%"
            height={17.3}
            style={styles.errorContainer}
          >
            <Spacer height={5} />
            {!!formik.errors.assignee && !!formik.touched.assignee && (
              <Typography
                text={formik.errors.assignee}
                fontColor={Colors.red}
                type="error"
              />
            )}
          </ViewContainer>
        </ViewContainer>
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={{...styles.container, zIndex: 2}}>
        <ViewContainer flex={1} height={80}>
          <DropDown
            placeholderStyle={paramData.room ? {color: Colors.darkBlue} : {}}
            placeholder={
              paramData.room
                ? materialTool.room.find(item => item.value == paramData.room)
                    ?.label
                : 'Room'
            }
            options={materialTool.room}
            value={formik.values.room}
            label={localization.addPunchList.form.room}
            onSetItem={({value}) => formik.setFieldValue('room', value)}
          />
          <ViewContainer
            width="100%"
            height={17.3}
            style={styles.errorContainer}
          >
            <Spacer height={5} />
            {!!formik.errors.room && !!formik.touched.room && (
              <Typography
                text={formik.errors.room}
                fontColor={Colors.red}
                type="error"
              />
            )}
          </ViewContainer>
        </ViewContainer>
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={{...styles.container, zIndex: 1}}>
        <ViewContainer flex={1} height={80}>
          <Typography
            text={'Due Date'}
            fontColor={Colors.bodyBase}
            type="label"
          />
          <Spacer height={8} />
          <TouchableOpacity
            style={styles.selectToolDropdown}
            onPress={() => {
              setCalenadarModalVisible(true);
            }}
          >
            <Typography
              text={formik.values.due_date || 'Select Date'}
              style={styles.selectToolDropdownText}
              fontColor={
                formik.values.due_date
                  ? Colors.darkBlue
                  : Colors.placeholderColor
              }
            />
            {/* <RightArrowIcon /> */}
          </TouchableOpacity>
        </ViewContainer>
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={styles.container}>
        <Input
          label={localization.addPunchList.form.description}
          error={!!formik.errors.description && !!formik.touched.description}
          isTouched={!!formik.touched.description}
          onChange={value => formik.setFieldValue('description', value)}
          value={formik.values.description}
          multiline={true}
          numberOfLines={10}
          inputStyle={{height: 150}}
          containerStyle={{height: 150}}
        />
      </ViewContainer>
      <Spacer height={12} />
      <View>
        <Spacer height={10} />
        <View style={styles.buttonContainer}>
          <CustomButton
            title={localization.room.saveRoom}
            disabled={
              !formik.isValid
              // !formik.isValid || !formik.dirty
              // !photos[tabIndex === 0 ? '360' : 'static'].length
            }
            onPress={formik.handleSubmit}
            bgColorActive={Colors.orange}
            bgColorUnactive={Colors.gray4}
          />
        </View>
        <Spacer height={30} />
      </View>
    </View>
  );
};

export default EditMaterialTab;
