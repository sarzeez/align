import React, {FC, memo, ReactNode} from 'react';
import {SectionList, TouchableOpacity, ViewStyle} from 'react-native';
import Typography from 'components/Typography/Typography';
import Divider from 'components/Divider/Divider';
import Spacer from 'components/Spacer/Spacer';
import {styles} from './styles';

type ListItemProps = {
  title: string;
  icon?: ReactNode;
  onPress?: () => void;
};

type ListProps = {
  title?: string;
  scrollEnabled?: boolean;
  data: string[];
  actions?: ListItemProps['onPress'][];
  icons?: ListItemProps['icon'][];
  renderItem?: ({index}: any) => ReactNode;
  style?: ViewStyle;
};

const ListItem: FC<ListItemProps> = memo(({title, icon, onPress}) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    {icon}
    {icon && <Spacer width={16} />}
    <Typography type="body" text={title} style={styles.listItemText} />
  </TouchableOpacity>
));

const List: FC<ListProps> = ({
  title = '',
  data,
  icons,
  actions,
  scrollEnabled = false,
  renderItem,
  style,
}) => {
  return (
    <SectionList
      style={[styles.list, style]}
      sections={[
        {
          title,
          data: data,
        },
      ]}
      keyExtractor={(item, index) => item + index}
      scrollEnabled={scrollEnabled}
      renderItem={({item, index}) =>
        renderItem ? (
          <>{renderItem({index})}</>
        ) : (
          <>
            <ListItem
              title={item}
              icon={icons?.length && icons[index]}
              onPress={actions?.length ? actions[index] : () => null}
            />
            {index < data.length - 1 && <Divider />}
          </>
        )
      }
    />
  );
};

export default memo(List);
