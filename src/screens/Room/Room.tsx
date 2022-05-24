import React, {
  FC,
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {MainFlowContainer} from 'components/MainFlowContainer';
import Box from 'components/Box/Box';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useNavigation,
  useRoute,
  StackActions,
  useFocusEffect,
} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import Spacer from 'components/Spacer/Spacer';
import localization from 'localization/localization';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import Placeholder from 'components/Placeholder/Placeholder';
import Pagination from 'components/InitialScreenCarousel/Pagination';
import {CustomButton} from 'components/CustomButton';
import PlusIcon from 'images/PlusIcon';
import {Colors} from 'theme';
import {addRoomPhoto, getRoom, setTabIndex} from 'store/actions/room.actions';
import {
  getCurrentRoomSelector,
  // getRoomIsLoadingSelector,
} from 'store/reducers/room.reducer';
import {DEVICE_WIDTH} from 'helpers/constants';
import Carousel from 'react-native-snap-carousel';
import {styles} from './styles';
import {styles as headerStyles} from 'components/Header/styles';
import MenuIcon from 'images/MenuIcon';
import {useActionSheet} from 'components/ActionSheet/ActionSheetProvider';
import {ActionSheetItem} from 'components/ActionSheet/ActionSheet';
import EditIcon from 'images/EditIcon';
import ArchiveIcon from 'images/ArchiveIcon';
import DeleteIcon from 'images/DeleteIcon';
import ROUTES from 'navigation/routes';
import {File} from 'typings/types.common';

type RoomProps = {
  onImageChanged: (id: number) => void;
};

const Room = ({onImageChanged}: RoomProps) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const currentRoom = useSelector(getCurrentRoomSelector);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  useEffect(() => {
    if (currentRoom && currentRoom.images.length > 0) {
      onImageChanged(currentRoom.images[0].id);
    }
  }, [currentRoom]);

  const renderCarouselItem = ({
    item,
  }: {
    item: {image: string; id: number; is_360: boolean};
  }) => (
    <TouchableOpacity style={styles.image} onPress={() => setShowPreview(true)}>
      <Image
        source={{uri: item.image}}
        onLoadEnd={() => setIsLoadingImg(false)}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <ViewContainer
        style={styles.container}
        flexDirection="row"
        justifyContent="space-between"
      >
        <View style={styles.carousel}>
          <Carousel
            data={currentRoom?.images || []}
            renderItem={renderCarouselItem}
            sliderWidth={DEVICE_WIDTH - 16}
            itemWidth={DEVICE_WIDTH - 16}
            onSnapToItem={slideIndex => {
              setActiveIndex(slideIndex);
              onImageChanged(currentRoom?.images[slideIndex].id || -1);
            }}
            loop
          />
          <Pagination
            style={styles.pagination}
            activeIndex={activeIndex}
            totalDots={currentRoom?.images.length || 0}
          />
        </View>

        {isLoadingImg && (
          <ActivityIndicator
            size="small"
            style={styles.indicatorContainerAbsolute}
          />
        )}
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={styles.container}>{}</ViewContainer>
      <ImageView
        images={
          currentRoom?.images.length
            ? [{uri: currentRoom?.images[activeIndex].image}]
            : []
        }
        imageIndex={0}
        visible={showPreview}
        onRequestClose={() => setShowPreview(false)}
      />
    </>
  );
};

const Materials = () => (
  <>
    <ViewContainer
      style={styles.container}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Typography type="h2" text={localization.project.materials.title} />
      <TouchableOpacity style={styles.addBtn} onPress={() => {}}>
        <PlusIcon color={Colors.white} />
      </TouchableOpacity>
    </ViewContainer>
    <Spacer height={12} />
    <ViewContainer style={styles.container}>
      <Placeholder
        backgroundColor={Colors.emptyMessageColor}
        title={localization.project.materials.placeholder.title}
        titleSize={18}
        titleColor={Colors.gray10}
        text={localization.project.materials.placeholder.text}
        textSize={14}
        textColor={Colors.gray10}
      />
    </ViewContainer>
  </>
);

const Trade = () => (
  <>
    <ViewContainer
      style={styles.container}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Typography type="h2" text={localization.project.trade.title} />
      <TouchableOpacity style={styles.addBtn} onPress={() => {}}>
        <PlusIcon color={Colors.white} />
      </TouchableOpacity>
    </ViewContainer>
    <Spacer height={12} />
    <ViewContainer style={styles.container}>
      <Placeholder
        backgroundColor={Colors.emptyMessageColor}
        title={localization.project.trade.placeholder.title}
        titleSize={18}
        titleColor={Colors.gray10}
        text={localization.project.trade.placeholder.text}
        textSize={14}
        textColor={Colors.gray10}
      />
    </ViewContainer>
  </>
);

const RoomScreen: FC = () => {
  const {params}: any = useRoute();
  const {navigate, dispatch: navDispatch} = useNavigation();
  const dispatch = useDispatch();
  const {setActions, title, setTitle} = useActionSheet();
  const currentRoom = useSelector(getCurrentRoomSelector);
  const withBackPress = params?.withBackPress;
  const selectedImageId = useRef<number>(-1);

  const ACTIONS: ActionSheetItem[] = [
    {
      key: 'edit',
      text: localization.room.actionSheet.edit,
      icon: <EditIcon />,
      onPress: () => {
        setActions([]);
        if (currentRoom) {
          const currentRoomType = currentRoom?.images.find(item => item.is_360)
            ? '360'
            : 'static';

          dispatch(
            addRoomPhoto({
              type: currentRoomType,
              replace: true,
              data: currentRoom?.images.map(item => ({
                uri: item.image,
              })) as File[],
            }),
          );

          if (currentRoom?.images.find(item => item.is_360)) {
            dispatch(setTabIndex(0));
          } else {
            dispatch(setTabIndex(1));
          }
        }
        setTimeout(() => {
          navigate(
            ROUTES.ADD_ROOM as never,
            {projectId: params.projectId} as never,
          );
        }, 200);
      },
    },
    {
      key: 'archive',
      text: localization.room.actionSheet.archive,
      icon: <ArchiveIcon />,
      onPress: () => {},
    },
    {
      key: 'delete',
      text: localization.room.actionSheet.delete,
      icon: <DeleteIcon />,
      onPress: () => {},
    },
  ];

  useEffect(() => {
    dispatch(
      getRoom({
        projectId: params?.projectId,
        roomId: params?.id,
      }),
    );
  }, [dispatch, params]);

  useEffect(() => {
    setTitle(params.name);
  }, [params, setTitle, title]);

  const onImageChanged = useCallback((id: number) => {
    selectedImageId.current = id;
  }, []);

  return (
    <MainFlowContainer
      title={(params as any)?.name}
      titleLabel={localization.room.title}
      boxBackgroundColor={Colors.transparent}
      titleButton={
        <TouchableOpacity
          style={[styles.addBtn, {marginTop: 8}]}
          onPress={() => {
            navigate(
              ROUTES.IMAGE_VIEWER_SCREEN as never,
              {imageId: selectedImageId.current} as never,
            );
          }}
        >
          <PlusIcon color={Colors.white} />
          <Typography
            style={styles.addBtnText}
            text={localization.room.addMarker}
          />
        </TouchableOpacity>
      }
      withBackButton
      backPress={withBackPress ? () => navDispatch(StackActions.pop(2)) : null}
      rightComponent={
        <TouchableOpacity
          style={[headerStyles.headBtn, headerStyles.shadowBtn]}
          onPress={() => setActions(ACTIONS)}
        >
          <MenuIcon />
        </TouchableOpacity>
      }
    >
      <Box>
        <Spacer height={24} />
        <Room onImageChanged={onImageChanged} />
        <Spacer height={24} />
        <Trade />
        <Spacer height={24} />
        <Materials />
        <Spacer height={36} />
      </Box>
    </MainFlowContainer>
  );
};

export default RoomScreen;
