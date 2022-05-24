import React, {useMemo} from 'react';
import {StyleProp, StyleSheetProperties, View} from 'react-native';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import PaginationTransparentDot from 'images/PafginationTransparentDot';
// import Line from 'images/Line';

const Pagination = ({
  style,
  activeIndex,
  totalDots = 3,
}: {
  style?: StyleProp;
  activeIndex: number;
  totalDots: number;
}) => {
  const renderDots = useMemo(() => {
    const layout = [];

    for (let i = 0; i < totalDots; i++)
      layout.push(
        <View style={{marginHorizontal: 5}} key={i}>
          <PaginationTransparentDot isActive={activeIndex === i} />
        </View>,
      );

    return layout;
  }, [activeIndex, totalDots]);

  return (
    <ViewContainer style={style}>
      <ViewContainer
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        {renderDots}
      </ViewContainer>
    </ViewContainer>
  );
};

export default Pagination;
