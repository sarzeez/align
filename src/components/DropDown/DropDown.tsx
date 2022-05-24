import React, {FC, memo, useEffect, useState} from 'react';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import {View, ViewStyle, TextStyle} from 'react-native';
import Typography from 'components/Typography/Typography';
import {Colors} from 'theme';
import Spacer from 'components/Spacer/Spacer';
import styles from './styles';
type DropDownProps = {
  label: string;
  value: ValueType;
  options: {value: string; label: string}[];
  placeholder?: string;
  onSetItem: (val: ItemType) => void;
  onClose: () => void;
  onOpen: () => void;
  error?: string;
  containerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
};

const DropDown: FC<DropDownProps> = ({
  label,
  options,
  placeholder,
  onSetItem,
  onClose,
  onOpen,
  error,
  containerStyle,
  placeholderStyle,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(rest.value);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(options as any);
  }, [options]);

  return (
    <>
      {label && (
        <View>
          <Typography text={label} fontColor={Colors.bodyBase} type="label" />
          <Spacer height={8} />
        </View>
      )}
      <DropDownPicker
        style={[
          styles.inputStyle,
          (open || !!value) && styles.activeStyle,
          !!error && styles.errorStyle,
        ]}
        dropDownContainerStyle={[styles.containerStyle, containerStyle]}
        placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
        textStyle={styles.textStyle}
        showTickIcon={true}
        zIndex={99999}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue as any}
        setItems={setItems}
        placeholder={placeholder}
        onSelectItem={onSetItem}
        onClose={onClose}
        onOpen={onOpen}
        dropDownDirection="BOTTOM"
      />
    </>
  );
};

export default memo(DropDown);
