import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Typography from 'components/Typography/Typography';
import dayjs from 'dayjs';

import CheckBox from './CheckBox';
import RightArrow from './assets/rightArrow';
import Label from './Label';
import Spacer from 'components/Spacer/Spacer';

type TaskProps = {
  onCheck: () => void;
  onPress: () => void;
  name: string;
  date?: string;
  assignee?: string;
  status?: string;
  isDone?: boolean;
  checked?: boolean;
  watch?: boolean;
};

const TaskCard = ({
  onCheck,
  onPress,
  name,
  date,
  status,
  checked,
  watch,
  assignee,
}: TaskProps) => {
  return (
    <View style={[styles.wrapper, watch && styles.watchActive]}>
      <View style={styles.container}>
        <CheckBox checked={checked} onPress={onCheck} />
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
          <View style={styles.touchableFlex}>
            <Typography type="labelMedium" text={name} />
            <View style={styles.touchableLabels}>
              <Typography text={date} style={styles.date} />
              {status && <Label text={status} />}
            </View>
            {assignee && (
              <Typography
                text={`Assigned by ${assignee.full_name || assignee}`}
                style={{
                  fontSize: 12,
                  fontFamily: 'Inter-Italic',
                  fontStyle: 'italic',
                }}
              />
            )}
          </View>
          <RightArrow />
        </TouchableOpacity>
      </View>
      {watch && (
        <>
          <Spacer height={4} />
          <View style={{paddingHorizontal: 18}}>
            <Typography
              text={'Watch for beams'}
              fontColor={'white'}
              type={'error'}
            />
          </View>
          <Spacer height={4} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    marginBottom: 5,
  },
  watchActive: {
    backgroundColor: '#BF2409',
    borderColor: '#BF2409',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 16,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 20,
  },
  touchableFlex: {
    flex: 1,
  },
  touchableLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#737373',
    lineHeight: 12,
    marginRight: 4,
  },
});

export default TaskCard;
