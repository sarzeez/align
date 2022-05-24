import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import Typography from 'components/Typography/Typography';
import RoomContent from 'screens/Projects/RoomContent';

import ArrowDown from 'images/ArrowDown';
import ArrowUp from 'images/ArrowUp';
import LocationIconSmall from 'images/LocationIconSmall';

import {Colors} from 'theme';
import {navigateTo} from 'navigation/navigation.service';
import ROUTES from 'navigation/routes';

type Project = {
  id: number;
  is_active: boolean;
  name: string;
};

const AccordionView = ({
  projects,
  onChangeTrade,
  select,
  projectId,
  onCheck,
  checkedTasks,
  withoutViewRoom,
  type,
}: any) => {
  const [activeSections, setActiveSections] = useState([0]);
  const _renderHeader = (section: any, isActive: any) => {
    const isOpen = activeSections.includes(isActive);
    return (
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Typography type="h3" text={section?.name} capitalize />
          <Typography
            type="label"
            text={`${type ? section?.name : 'Tasks'} - ${
              section.task_count || section.count || 0
            }`}
            numberOfLines={1}
            capitalize
          />
        </View>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </View>
    );
  };
  const _renderContent = (section: Project) => {
    return (
      <View style={{paddingHorizontal: 7, paddingBottom: 16, paddingTop: 0}}>
        <RoomContent
          checkedTasks={checkedTasks}
          onCheck={onCheck}
          roomId={section?.id}
          projectId={projectId}
          tasks={type ? section?.materials_tools : section?.tasks}
          withoutViewRoom={withoutViewRoom}
          type={type}
        />
      </View>
    );
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={projects || []}
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
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRow: {
    flex: 1,
    marginRight: 15,
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
