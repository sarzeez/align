import React from 'react';
import {View} from 'react-native';

type ViewContainerProps = {
  flex?: number;
  flexDirection?: 'column' | 'row';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  flexWrap?: 'wrap';
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  style?: object;
};

const ViewContainer = ({
  flex,
  width,
  height,
  style,
  children,
  flexWrap,
  alignItems,
  flexDirection,
  justifyContent,
}: ViewContainerProps) => (
  <View
    style={{
      flex,
      width,
      height,
      flexWrap,
      alignItems,
      flexDirection,
      justifyContent,
      ...style,
    }}
  >
    {children}
  </View>
);
export default ViewContainer;
