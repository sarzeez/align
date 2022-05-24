import React from 'react';
import * as Progress from 'react-native-progress';

import {Colors} from 'theme';
import { DEVICE_WIDTH, PADDING_HORIZONTAL } from 'helpers/constants'

type ProgressBarProps = {
  width?: number;
  height?: number;
  progress?: number;
  borderRadius?: number;
  unfilledColor?: string;
  color?: string;
  borderColor?: string;
};

const ProgressBar = ({
  progress = 0.6,
  width = DEVICE_WIDTH - PADDING_HORIZONTAL,
  height = 10,
  borderRadius = 10,
  unfilledColor = Colors.lightBlueGray,
  color = Colors.blue,
  borderColor = Colors.transparent,
}: ProgressBarProps) => (
  <Progress.Bar
    progress={progress}
    width={width}
    height={height}
    borderRadius={borderRadius}
    unfilledColor={unfilledColor}
    color={color}
    borderColor={borderColor}
  />
);

export default ProgressBar;
