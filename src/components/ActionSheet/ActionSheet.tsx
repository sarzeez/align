import React, {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {View, TouchableOpacity, Animated, Text} from 'react-native';
import Typography from 'components/Typography/Typography';
import Spacer from 'components/Spacer/Spacer';
import Divider from 'components/Divider/Divider';
import {useActionSheet} from './ActionSheetProvider';

import {styles} from './styles';

export type ActionSheetItem = {
  key?: string;
  text: string;
  color?: string;
  icon?: ReactElement;
  onPress: (props: any) => void;
};

const Item: FC<ActionSheetItem> = ({icon, text, color, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    {icon}

    {icon && <Spacer width={10} />}

    <Typography style={styles.itemText} fontColor={color} text={text} />
  </TouchableOpacity>
);

const ActionSheet: FC = () => {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const {actions, setActions, title, setTitle} = useActionSheet();

  const handleShow = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [opacity, translateY]);

  const handleHide = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 150,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    if (actions.length) {
      setTimeout(() => {
        setActions([]);
        setTitle(null);
      }, 100);
    }
  }, [actions.length, opacity, setActions, setTitle, translateY]);

  useEffect(() => {
    if (actions?.length) {
      handleShow();
    } else {
      handleHide();
    }
  }, [actions, handleHide, handleShow, opacity]);

  return (
    <View
      pointerEvents={actions?.length ? 'auto' : 'none'}
      style={styles.container}
    >
      <Animated.View
        style={[styles.content, {opacity, transform: [{translateY}]}]}
      >
        {title && (
          <>
            <Typography
              textCenter
              type="h3"
              text={title}
              style={styles.title}
            />
            <Divider />
          </>
        )}
        {actions?.map((item, i) => (
          <Fragment key={item.key}>
            <Item {...item} />
            {i < actions.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Animated.View>
      <Spacer height={8} />
      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{translateY}],
          },
        ]}
      >
        <TouchableOpacity onPress={handleHide}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[styles.backdrop, {opacity}]}
        onTouchEnd={handleHide}
      />
      <Spacer height={18} />
    </View>
  );
};

export default ActionSheet;
