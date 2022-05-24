import {View, ImageBackground, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import localization from 'localization/localization';
import ROUTES from 'navigation/routes';
import {MainFlowContainer} from 'components/MainFlowContainer';
import Typography from 'components/Typography/Typography';
import Button from 'components/Button/Button';
import {Colors, Shadows} from 'theme';

const NoWorkspace = () => {
  const navigation = useNavigation();

  return (
    <MainFlowContainer scrollEnabled={false}>
      <ImageBackground
        source={require('../../images/BlackBackground.png')}
        resizeMode="cover"
        style={styles.bg}
      >
        <Typography
          style={styles.welcome}
          text={localization.noWorkSpace.welcome}
        />
        <Typography style={styles.to} text={localization.noWorkSpace.to} />
      </ImageBackground>
      <View style={styles.wrapper}>
        <Typography
          style={styles.heading}
          type="h2"
          text={localization.noWorkSpace.name}
        />
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../images/IlustrationJoinWorkspace.jpg')}
        />
        <Typography
          fontColor="#0000008E"
          textCenter
          style={styles.description}
          text={localization.noWorkSpace.desc}
        />
        <Button
          borderRadius={20}
          style={styles.submitButton}
          btnText={localization.noWorkSpace.button}
          onPress={() =>
            navigation.navigate(
              ROUTES.JOIN_A_WORKSPACE as never,
              {isNotAuthenticated: true} as never,
            )
          }
        />
      </View>
    </MainFlowContainer>
  );
};

const styles = StyleSheet.create({
  bg: {padding: 30, paddingBottom: 60},
  welcome: {
    fontSize: 42,
    lineHeight: 42,
    color: Colors.white,
    fontFamily: 'Inter-Regular',
  },
  to: {
    fontSize: 42,
    lineHeight: 42,
    color: Colors.orange,
    fontFamily: 'Inter-ExtraBold',
  },
  wrapper: {
    flex: 1,
    padding: 35,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#0000004D',
  },
  heading: {
    marginBottom: 20,
  },
  image: {flex: 1, height: undefined, alignSelf: 'center'},
  description: {
    marginVertical: 20,
  },
  submitButton: {
    height: 55,
    width: 220,
    borderRadius: 20,
    backgroundColor: Colors.orange,
    ...Shadows.sh3,
  },
});

export default NoWorkspace;
