import React from 'react';
import {View, Image, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Typography from 'components/Typography/Typography';

import CaretLeft from 'images/CaretLeft';

import {Colors} from 'theme';
import shadows from 'theme/Shadows';

const HEADER_HEIGHT = 100;

type Props = {
  heading?: string;
  logo?: boolean;
};

const SettingsHeader = ({heading, logo}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Pressable
            hitSlop={20}
            onPress={() => {
              navigation.goBack();
            }}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
              styles.headBtn,
            ]}
          >
            <CaretLeft />
          </Pressable>
        </View>
        <View style={styles.center}>
          {heading ? (
            <Typography text={heading} type="heading" />
          ) : logo ? (
            <Image
              source={require('./assets/header.png')}
              style={styles.logo}
            />
          ) : null}
        </View>
        <View style={styles.cell} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
    height: HEADER_HEIGHT,
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dividerColor,
    borderTopRightRadius: 42,
    borderTopLeftRadius: 42,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cell: {
    width: 60,
  },
  center: {flex: 1, alignItems: 'center'},
  headBtn: {
    width: 49,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    ...shadows.sh3,
  },
  logo: {
    height: 23,
    width: 110,
    resizeMode: 'contain',
  },
});

export default SettingsHeader;
