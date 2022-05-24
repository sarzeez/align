import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Colors from 'theme/Colors';
import Shadows from 'theme/Shadows';
import FilterIcon from 'images/FilterIcon';

export type HeaderButtonProps = {
  onPress: any;
};

const FilterButton: React.FC<HeaderButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={s.globlaContainer}>
      <FilterIcon />
    </TouchableOpacity>
  );
};

FilterButton.defaultProps = {};

export const s = StyleSheet.create({
  globlaContainer: {
    ...Shadows.sh1,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
});
const MemorizedComponent = memo(FilterButton);
export {MemorizedComponent as FilterButton};
