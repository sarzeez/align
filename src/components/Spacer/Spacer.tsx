import React, {memo} from 'react';
import {View} from 'react-native';

type SpacerTypes = {
  width?: number;
  height?: number;
};

const Spacer = ({height, width}: SpacerTypes) => (
  <View style={{height, width}} />
);

export default memo(Spacer);
