import React, {ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import styles from './styles';

type SettingsButtonProps = {
  title: string;
  image: ReactNode;
  onPress: () => void;
  borderTop?: boolean;
};

const SettingsButton = ({
  title,
  image,
  onPress,
  borderTop = false,
}: SettingsButtonProps) => {
  return (
    <TouchableOpacity style={styles.wrapperStyle} onPress={onPress}>
      <View
        style={[styles.containerStyle, borderTop && styles.borderTop]}
      >
        {image}
        <ViewContainer style={styles.textStyle}>
          <Typography text={title} type="h3" />
        </ViewContainer>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsButton;
