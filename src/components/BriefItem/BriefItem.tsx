import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './BriefItemStyles';
import {Colors} from 'theme';
import Typography from 'components/Typography/Typography';
import localization from 'localization/localization';

import ToDoIcon from './assets/toDo';
import MaterialsIcon from './assets/materials';
import ToolsIcon from './assets/tools';

export type BriefItemProps = {
  name: string;
  amount: number;

  totalItems: number;
  totalItemsLabel: string;
  new: number;
  outstanding: number;
  onPress: () => void;
};

const BriefItem: React.FC<BriefItemProps> = ({
  name,
  amount,
  new: newItems,
  outstanding,
  onPress,
}) => {
  let icon;
  let title;
  switch (name) {
    case 'punch_list':
      icon = <ToDoIcon />;
      title = localization.homeScreen.toDo;
      break;
    case 'materials':
      icon = <MaterialsIcon />;
      title = localization.homeScreen.materials;
      break;
    case 'tools':
      icon = <ToolsIcon />;
      title = localization.homeScreen.tools;
      break;
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {icon}
      <View style={styles.textBlock}>
        <Typography text={title} type={'h3'} style={{fontSize: 16}} />
        <Typography
          text={`${amount} ${localization.homeScreen.counterLabel}`}
          type={'label'}
          style={{fontSize: 12}}
        />
      </View>
      <View style={styles.bottomRow}>
        <View style={[styles.col, {backgroundColor: Colors.green2}]}>
          <Typography
            text={newItems}
            type={'h3'}
            fontColor={Colors.white}
            style={{fontSize: 16}}
          />
          <Typography
            text={localization.common.new}
            type={'label'}
            fontColor={Colors.white}
            style={{fontSize: 10}}
          />
        </View>
        <View style={[styles.col, {backgroundColor: Colors.purple}]}>
          <Typography
            text={outstanding}
            type={'h3'}
            fontColor={Colors.white}
            style={{fontSize: 16}}
          />
          <Typography
            text={localization.common.outstanding}
            type={'label'}
            fontColor={Colors.white}
            numberOfLines={1}
            style={{fontSize: 10}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

BriefItem.defaultProps = {};

const MemorizedComponent = memo(BriefItem);
export {MemorizedComponent as BriefItem};
