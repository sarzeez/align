import React, {memo} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from 'theme/Colors';
import Delete from './assets/delete';
import Edit from './assets/edit';
import Profile from './assets/profile';
import Comp from './assets/comp';
import Arrow from './assets/arrow';

export type ChoiceModalProps = {
  modalVisible: boolean;
  onCancel: any;
};

const ChoiceModal: React.FC<ChoiceModalProps> = ({modalVisible, onCancel}) => {
  const options = [
    {
      text: 'Edit Task',
      icon: <Edit />,
    },
    {
      text: 'Change Assignment',
      icon: <Profile />,
    },
    {
      text: 'Archive Task',
      icon: <Comp />,
    },
    {
      text: 'Delete Task',
      icon: <Delete />,
    },
  ];

  return (
    <View style={s.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={s.centeredView}>
          <View style={s.modalBody}>
            <View style={s.item}>
              <Text style={s.headerText}>Repair Pipe</Text>
            </View>
            <View style={s.line}></View>

            {options.map((item: any, index: number) => {
              return (
                <View style={{width: '100%'}}>
                  <TouchableOpacity style={s.item}>
                    {item.icon}
                    <Text style={s.text}>{item.text}</Text>
                  </TouchableOpacity>
                  <View style={s.line}></View>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => onCancel(false)}
            style={s.modalCancel}
          >
            <Text style={s.textCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

ChoiceModal.defaultProps = {};

export const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCancel: {
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 14,
    paddingVertical: 18,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBody: {
    marginBottom: 8,
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 62,
    // backgroundColor: "red",
    borderRadius: 14,
    justifyContent: 'center',
  },
  line: {
    height: 0.3,
    backgroundColor: Colors.gray3,
    width: '100%',
  },
  text: {
    color: Colors.black,
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    marginLeft: 3,
  },
  headerText: {
    color: Colors.black2,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  textCancel: {
    color: Colors.orange,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
});
const MemorizedComponent = memo(ChoiceModal);
export {MemorizedComponent as ChoiceModal};
