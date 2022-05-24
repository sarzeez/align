import {ChoiceModal} from 'components/ChoiceModal/ChoiceModal';
import React, {memo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {s} from './WorkspaceSettingsStyles';

export type WorkspaceSettingsProps = {};

const WorkspaceSettings: React.FC<WorkspaceSettingsProps> = ({}) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={s.globalContainer}>
      <ChoiceModal onCancel={setModalVisible} modalVisible={modalVisible} />
    </View>
  );
};

WorkspaceSettings.defaultProps = {};

const MemorizedComponent = memo(WorkspaceSettings);
export {MemorizedComponent as WorkspaceSettings};
