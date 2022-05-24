import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './TitledListStyles';
import {Colors} from 'theme';
import {CustomButton} from 'components/CustomButton';
import Typography from 'components/Typography/Typography';
import PlusIcon from 'images/PlusIcon';

export type TitledListProps = {
  children?: Element;
  contentLength: number;
  title: string;
  emptyText?: string;
  onEmptyBlockPress?: () => void;
  onPlusPress?: () => void;
};

const TitledList: React.FC<TitledListProps> = ({
  children,
  contentLength,
  title,
  emptyText,
  onEmptyBlockPress,
  onPlusPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Typography text={title} type={'h2'} />
        {onPlusPress && (
          <View style={styles.plusButton}>
            <CustomButton
              onPress={() => onPlusPress()}
              borderRadius={8}
              bgColorActive={Colors.orange}
              icon={<PlusIcon />}
            />
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        {contentLength > 0 ? (
          children
        ) : (
          <TouchableOpacity
            style={styles.empty}
            disabled={!onEmptyBlockPress}
            onPress={() => onEmptyBlockPress()}
          >
            <Typography
              text={emptyText}
              type={'label'}
              textCenter
              fontColor={Colors.gray9}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

TitledList.defaultProps = {
  emptyText: 'No items',
};

const MemorizedComponent = memo(TitledList);
export {MemorizedComponent as TitledList};
