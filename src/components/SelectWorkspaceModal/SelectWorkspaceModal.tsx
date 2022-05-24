import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Text, ViewStyle} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Colors from 'theme/Colors';
import Shadows from 'theme/Shadows';
import {HeaderButton} from 'components/HeaderButton/HeaderButton';
import {WorkspaceItem} from 'components/WorkspaceItem/WorkspaceItem';
import {ScrollView} from 'react-native-gesture-handler';
import {openWorkspaceSheet} from 'store/actions/workspace.actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMyWorkspaceList,
  getIsOpenedWorkspaceSheetSelector,
} from 'store/reducers/workspace.reducer';
import {usePrevious} from 'helpers/hooks';
import {
  setCurrentWorkspaceSubcontractor,
  setSubcontractorWorkspaceId,
} from 'store/actions/workspace.actions';

const SelectWorkspaceModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const snapPoints = useMemo(() => ['96%', '96%'], []);
  const myWorkspaceList = useSelector(getMyWorkspaceList);
  const sheetIsOpened = useSelector(getIsOpenedWorkspaceSheetSelector);
  const previousSheetValue = usePrevious(sheetIsOpened);
  const handlePresentModalHide = useCallback(() => {
    dispatch(openWorkspaceSheet(false));
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleItemPress = async item => {
    dispatch(setCurrentWorkspaceSubcontractor(item.id));
    dispatch(setSubcontractorWorkspaceId(item.id));
    handlePresentModalHide();
  };

  useEffect(() => {
    if (!previousSheetValue && sheetIsOpened) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [previousSheetValue, sheetIsOpened]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef as any}
      index={1}
      snapPoints={snapPoints}
      handleStyle={{paddingTop: 15, backgroundColor: Colors.white}}
      handleIndicatorStyle={{
        backgroundColor: 'white',
        height: 0,
        padding: 0,
        margin: 0,
      }}
      // onChange={handleSheetChanges}
      // style={[{ ...theme.shadows.sh4 }, Platform.OS === 'android' && s?.roflanShadow]}
      backgroundComponent={props => (
        <BottomSheetBackground style={props?.style} />
      )}
    >
      <View style={s?.contentContainer}>
        <View style={s?.header}>
          <Text style={s?.headerText}>Select Work Space</Text>
          <HeaderButton onPress={handlePresentModalHide} />
        </View>
        <ScrollView style={s?.bodyContainer}>
          {!!myWorkspaceList?.length &&
            myWorkspaceList.map((t: any) => (
              <View style={{paddingHorizontal: 15, marginTop: 10}} key={t.id}>
                <WorkspaceItem
                  text={t.name}
                  onPress={() => handleItemPress(t)}
                />
              </View>
            ))}
        </ScrollView>
      </View>
    </BottomSheetModal>
  );
};

const BottomSheetBackground = ({style}: {style?: ViewStyle | undefined}) => {
  return (
    <View
      style={[
        {
          ...Shadows.sh1,
          backgroundColor: Colors.emptyMessageColor,
          borderRadius: 25,
        },
        {...style},
      ]}
    />
  );
};

SelectWorkspaceModal.defaultProps = {};

export const s = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingBottom: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.gray3,
    borderBottomWidth: 1,
  },
  bodyContainer: {
    backgroundColor: Colors.emptyMessageColor,
    flex: 1,
    marginTop: 10,
  },
  headerText: {
    color: Colors.black,
    fontSize: 23,
    fontFamily: 'Inter-ExtraBold',
    textAlign: 'center',
  },
  leftContainer: {
    position: 'absolute',
    left: 0,
  },
});
const MemorizedComponent = memo(SelectWorkspaceModal);
export {MemorizedComponent as SelectWorkspaceModal};
