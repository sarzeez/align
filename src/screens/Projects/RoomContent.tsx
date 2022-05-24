import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {CustomButton} from 'components/CustomButton';
import {Colors} from 'theme';
import TaskCard from 'components/TaskCard/TaskCard';
import ROUTES from 'navigation/routes';
import Spacer from 'components/Spacer/Spacer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Typography from 'components/Typography/Typography';

const RoomContent = ({
  roomId,
  tasks,
  projectId,
  onCheck,
  checkedTasks,
  withoutViewRoom,
  type,
}: {
  roomId: number;
  projectId: number;
  withoutViewRoom: boolean;
  type: string;
}) => {
  const navigation = useNavigation();
  const [viewMore, setViewMore] = useState(false);

  const handlePressViewMore = () => {
    setViewMore(true);
  };

  const goToTask = (item: any) => {
    if (item.type == 'material' || item.type == 'tool') {
      navigation.navigate(
        ROUTES.SINGLE_MATERIAL_TOOL_VIEW as never,
        {type: item.type, projectId, ...item} as never,
      );
    } else {
      navigation.navigate(
        ROUTES.SINGLE_TASK_VIEW as never,
        {
          id: item.id,
          roomId,
          projectId,
        } as never,
      );
    }
  };

  return (
    <View>
      {!withoutViewRoom && (
        <View style={{width: 309, height: 45, alignSelf: 'center'}}>
          <CustomButton
            title="View Room"
            bgColorActive={Colors.black}
            titleColor={Colors.white}
            titleType="h4"
            onPress={() =>
              navigation.navigate(ROUTES.ROOM as never, {id: roomId, projectId})
            }
          />
        </View>
      )}
      {!!tasks?.length && (
        <>
          <Spacer height={17} />
          <View
            style={{
              backgroundColor: Colors.white,
              borderWidth: 1,
              borderColor: Colors.emptyMessageColor,
              borderRadius: 26,
              paddingVertical: 20,
              paddingHorizontal: 18,
            }}
          >
            {(viewMore ? tasks : tasks.slice(0, 2))?.map((item: any) => {
              return (
                <TaskCard
                  onCheck={() => onCheck(item.id)}
                  onPress={() => goToTask(item)}
                  name={item.name}
                  date={moment(item.due_date).format('MMMM D')}
                  key={item.id}
                  checked={item.is_done || checkedTasks.includes(item.id)}
                  assignee={item.assignee}
                />
              );
            })}
          </View>
        </>
      )}
      <Spacer height={15} />
      {tasks?.length >= 3 && !viewMore && (
        <TouchableOpacity onPress={handlePressViewMore}>
          <Typography text={'View more'} textCenter type="h3" underlined />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RoomContent;
