import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import Typography from 'components/Typography/Typography';
import DropdownSelect from 'components/DropdownSelect/DropdownSelect';
import TaskCard from 'components/TaskCard/TaskCard';

import ArrowDown from 'images/ArrowDown';
import ArrowUp from 'images/ArrowUp';
import LocationIconSmall from 'images/LocationIconSmall';

import {Colors} from 'theme';
import {navigateTo} from 'navigation/navigation.service';
import ROUTES from 'navigation/routes';
import Spacer from 'components/Spacer/Spacer';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

const AccordionView = ({projects, onChangeTrade, select}: any) => {
  const [activeSections, setActiveSections] = useState([0]);
  const navigation = useNavigation();

  const _renderHeader = (section: any, isActive: any) => {
    const isOpen = activeSections.includes(isActive);
    return (
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Typography type="h3" text={section?.name} />
          <Typography
            type="label"
            text={`${section?.address}, ${section?.state} ${section?.zip_code}`}
            numberOfLines={1}
          />
        </View>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </View>
    );
  };

  const _renderContent = (section: any) => {
    return (
      <View style={{padding: 16, paddingTop: 0}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}
        >
          {section?.address && (
            <>
              <TouchableOpacity style={styles.button}>
                <LocationIconSmall style={{marginRight: 10}} />
                <Typography
                  textCenter
                  fontType="Medium"
                  text="Get Directions"
                  style={styles.buttonText}
                />
              </TouchableOpacity>
              <View style={{width: 7}} />
            </>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate(
                ROUTES.PROJECT as never,
                {
                  ...section,
                } as never,
              );
            }}
          >
            <Typography
              textCenter
              fontType="Medium"
              text="View Project"
              style={styles.buttonText}
            />
          </TouchableOpacity>
        </View>

        {section?.rooms?.length > 0 &&
          section?.rooms?.map((room: any, index: number) => {
            return (
              <View key={index} style={[styles.content, {marginBottom: 10}]}>
                <View style={styles.contentHeader}>
                  <View>
                    <Typography type="h3" text={room?.name} />
                    <Text>Total Task(s) - {room?.results?.length}</Text>
                  </View>
                  <View style={{width: 16}} />
                  {room?.trades?.length > 0 && (
                    <DropdownSelect onPress={onChangeTrade} />
                  )}
                </View>
                {room?.results?.map((task: any, index: number) => {
                  return (
                    <TaskCard
                      key={index}
                      onCheck={() => alert('Check')}
                      onPress={() => navigateTo(ROUTES.TODAYS_BRIEF_ITEM)}
                      name={task?.task}
                      date={task.due_date}
                      status={task.label}
                      isDone={task.is_done}
                    />
                  );
                })}
              </View>
            );
          })}
      </View>
    );
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={projects}
      activeSections={activeSections}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      onChange={_updateSections}
      touchableComponent={TouchableOpacity}
      containerStyle={styles.containerStyle}
      sectionContainerStyle={styles.sectionContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRow: {
    flex: 1,
    marginRight: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  buttonText: {
    fontSize: 16,
    color: Colors.black,
  },
  containerStyle: {
    marginVertical: 10,
  },
  sectionContainerStyle: {
    marginBottom: 10,
    backgroundColor: '#F8F7F7',
    borderRadius: 30,
  },
  content: {
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contentBody: {},
});

export {AccordionView};
