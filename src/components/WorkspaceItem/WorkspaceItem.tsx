import React, {memo} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Colors} from 'theme';
import Arrow from './assets/arrow';

export type WorkspaceItemProps = {
  text?: string | undefined;
  onPress?: any;
};

const WorkspaceItem = ({text, onPress}: WorkspaceItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={s?.globalContainer}>
      <Text style={s?.text}>{text}</Text>
      <Arrow />
    </TouchableOpacity>
  );
};

WorkspaceItem.defaultProps = {
  text: 'test',
};

export const s = StyleSheet.create({
  globalContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 17,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 18,
    width: '100%',
  },
  text: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
});

const MemorizedComponent = memo(WorkspaceItem);
export {MemorizedComponent as WorkspaceItem};
