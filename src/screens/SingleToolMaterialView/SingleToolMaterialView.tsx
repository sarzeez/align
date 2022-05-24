import React, {useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MainFlowContainer} from 'components/MainFlowContainer';
import MenuIcon from 'images/MenuIcon';
import Box from 'components/Box/Box';
import {styles as headerStyles} from 'components/Header/styles';
import {styles} from './style';
import Spacer from 'components/Spacer/Spacer';
import {Colors} from 'theme';
import Typography from 'components/Typography/Typography';
import DeleteIcon from 'images/DeleteIcon';
import colors from 'theme/Colors';
import BlackCheckbox from 'images/BlackCheckbox';
import {DEVICE_WIDTH} from 'helpers/constants';
import shadows from 'theme/Shadows';
import RoomLocation from 'images/RoomLocation';
import {ActionSheetItem} from 'components/ActionSheet/ActionSheet';
import EditIcon from 'images/EditIcon';
import ArchiveIcon from 'images/ArchiveIcon';
import {useActionSheet} from 'components/ActionSheet/ActionSheetProvider';
import {useDispatch, useSelector} from 'react-redux';
import ROUTES from 'navigation/routes';
import {getSingleMaterial, getSingleTool} from 'store/actions/projects.actions';
import {
  getSingleMaterialSelector,
  getSingleToolSelector,
} from 'store/reducers/project.reducer';

const SingleToolMaterialView = () => {
  const {setActions, title, setTitle} = useActionSheet();
  const {navigate} = useNavigation();
  const {params}: any = useRoute();
  const {type} = params;
  const dispatch = useDispatch();
  const currentMaterial = useSelector(getSingleMaterialSelector);
  const currentTool = useSelector(getSingleToolSelector);

  useEffect(() => {
    if (type == 'material') {
      dispatch(
        getSingleMaterial({
          projectId: params?.projectId,
          roomId: params?.room_id,
          id: params?.id,
        }),
      );
    }
    if (type == 'tool') {
      dispatch(
        getSingleTool({
          projectId: params?.projectId,
          roomId: params?.room_id,
          id: params?.id,
        }),
      );
    }
  }, [dispatch, params]);

  const ACTIONS: ActionSheetItem[] = [
    {
      key: 'edit',
      text: 'Edit Task',
      icon: <EditIcon />,
      onPress: () => {
        setActions([]);
        navigate(
          ROUTES.EDIT_ADD_MATERIAL_OR_TOOL as never,
          {
            index: 1,
            id: 2,
            material: {
              material: {
                label: 'Sement',
                value: 1,
              },
              material_note: 'Covered with sement',
              priority: 'low',
              room: '90',
              due_date: '28-04-2022',
              assignee: '177',
              description: 'bla bla bla',
            },
            tool: {
              tool: {
                label: 'Hummer',
                value: 1,
              },
              priority: 'low',
              room: '90',
              due_date: '28-04-2022',
              assignee: '177',
              description: 'bla bla bla',
            },
          } as never,
        );
      },
    },
    {
      key: 'archive',
      text: 'Archive Task',
      icon: <ArchiveIcon />,
      onPress: () => {},
    },
    {
      key: 'delete',
      text: 'Delete Task',
      icon: <DeleteIcon />,
      onPress: () => {},
    },
  ];

  return (
    <MainFlowContainer
      // title={(params as any)?.name}
      withBackButton
      rightComponent={
        <TouchableOpacity
          style={[headerStyles.headBtn, headerStyles.shadowBtn]}
          onPress={() => setActions(ACTIONS)}
        >
          <MenuIcon />
        </TouchableOpacity>
      }
    >
      <View
        style={{
          backgroundColor: Colors.emptyMessageColor,
          flex: 1,
        }}
      >
        <View
          style={{
            paddingLeft: 28,
          }}
        >
          <Spacer height={39} />
          <View style={styles.header}>
            <View>
              <Typography text={type} type="h4" capitalize />
              <Typography
                text={
                  type == 'material'
                    ? currentMaterial?.material?.name
                    : currentTool?.tool?.name
                }
                type="h2"
              />
            </View>
            <TouchableOpacity style={styles.headerIcon}>
              <DeleteIcon />
            </TouchableOpacity>
          </View>
          <Spacer height={7} />
        </View>
        <Spacer height={20} />
        <Box>
          <Spacer height={42} />
          <View style={{paddingHorizontal: 28}}>
            <Typography
              text="Assignee"
              style={{fontSize: 14, fontFamily: 'Inter-Regular'}}
              fontColor={Colors.gray7}
            />
            <Typography
              text={
                type == 'material'
                  ? currentMaterial?.assignee?.full_name
                  : currentTool?.assignee?.full_name
              }
              style={{fontSize: 18, fontFamily: 'Inter-Bold'}}
              type="h2"
            />
          </View>
          <Spacer height={38} />
          <View
            style={{
              width: DEVICE_WIDTH - 15,
              marginLeft: 15,
              backgroundColor: Colors.orange,
              height: 78,
              borderRadius: 17,
              flexDirection: 'row',
              ...shadows.sh3,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.white,
                borderRadius: 16,
                flex: 1,
                borderWidth: 1,
                borderColor: Colors.gray4,
              }}
            >
              <Typography
                text={
                  type == 'material'
                    ? currentMaterial?.due_date
                    : currentTool?.due_date
                }
                type="h4"
                style={{fontSize: 16, fontFamily: 'Inter-Bold'}}
              />
              <Spacer height={5} />
              <Typography
                style={{fontSize: 12, fontFamily: 'Inter-Regular'}}
                text={'Due Date'}
                type="h3"
                fontColor={Colors.gray7}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.orange,
                flex: 1,
              }}
            >
              <TouchableOpacity onPress={() => {}}>
                {true ? (
                  <BlackCheckbox />
                ) : (
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      backgroundColor: Colors.white,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: Colors.gray4,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Spacer height={2} />
              <Typography
                style={{fontSize: 12, fontFamily: 'Inter-Regular'}}
                text={'Task Complete'}
                type="h3"
                fontColor={Colors.white}
              />
            </View>
          </View>
          <Spacer height={31} />
          <View
            style={{
              //   flex: 1,
              //   width: '100%',
              height: 78,
              //   backgroundColor: Colors.emptyMessageColor,
              borderBottomWidth: 1,
              borderBottomColor: Colors.gray4,
              borderRadius: 17,
              marginHorizontal: 15,
              paddingVertical: 13,
              paddingBottom: 30,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <RoomLocation />
              <Spacer height={2} />
              <Typography
                style={{fontSize: 12, fontFamily: 'Inter-Regular'}}
                text={'Room Location'}
                type="h3"
                fontColor={Colors.gray7}
              />
            </View>
            <View
              style={{width: 1, height: 50, backgroundColor: Colors.gray4}}
            />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <Typography
                style={{fontSize: 18, fontFamily: 'Inter-ExtraBold'}}
                text={
                  type == 'material'
                    ? currentMaterial?.room?.name
                    : currentTool?.room?.name
                }
                type="h3"
              />
            </View>
          </View>
          <Spacer height={22} />
          <View style={{paddingHorizontal: 38}}>
            <Typography
              style={{fontSize: 16, fontFamily: 'Inter-ExtraBold'}}
              text={'Project Brief'}
              type="h3"
            />
            <Spacer height={12} />
            <Typography
              style={{fontSize: 14, lineHeight: 21}}
              fontColor={Colors.gray7}
              text={
                type == 'material'
                  ? currentMaterial?.description
                  : currentTool?.description
              }
              //   type="h3"
            />
          </View>
        </Box>
      </View>
    </MainFlowContainer>
  );
};

export default SingleToolMaterialView;
