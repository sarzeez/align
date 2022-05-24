import React, { memo, useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput as RNITextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Colors } from 'theme';
import Typography from 'components/Typography/Typography';
import styles from './CodeEntryStyles';
import * as Animatable from 'react-native-animatable';

export type CodeEntryProps = {
  values: string[];
  bgColorUnactive?: string;
  bgColorActive?: string;
  bgColorError?: string;
  error?: boolean;
  showAnimation?: boolean;
  borderColorUnactive?: string;
  borderColorActive?: string;
  borderColorError?: string;
  numOfSymbols?: number;
  onChangeInput(digits: string[]): void;
  onAnimationEnd: () => void;
};

const CodeEntry: React.FC<CodeEntryProps> = ({
  values,
  bgColorUnactive,
  bgColorError,
  borderColorError,
  error,
  showAnimation,
  borderColorActive,
  borderColorUnactive,
  bgColorActive,
  onChangeInput,
  onAnimationEnd,
  numOfSymbols
}) => {

  const inputRef = useRef(null);
  const [internalValue, setInternalValue] = useState('');

  const maxLength = numOfSymbols as number;

  const validateInput = (text: string) => (text.match(/^\d+$/) || text === '');

  const onChangeText = (text: string) => {
    if (validateInput(text)) {
      setInternalValue(text);

      let newValues = text.split('');

      while (newValues.length < maxLength)
        newValues.push("");

      onChangeInput(newValues);
    }

    if (text.length === maxLength)
      Keyboard.dismiss();
  }

  const renderInputs = () => {
    let layout: Element[] = [];
    values.map((item, index) => {
      layout.push(
        <View
          style={[
            styles.digitInputContainer,
            {
              backgroundColor: !!item ? error ? bgColorError : bgColorActive : bgColorUnactive,
              borderColor: !!item ? error ? borderColorError : borderColorActive : borderColorUnactive
            }
          ]}
          key={index}
        >
          <Typography
            text={item}
            type="h2"
            fontColor={Colors.textBlack}
            style={styles.valueText}
          />
        </View>
      )
    })
    return layout;
  }

  // ComponentDidMount
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <Animatable.View style={[styles.container, { width: '100%' }]}
        animation={!showAnimation ? undefined : 'pulse'}
        onAnimationEnd={() => {
          setInternalValue('');
          onAnimationEnd();
        }}
      >
        <View style={styles.inputCont}>
          <RNITextInput
            style={[styles.hiddenInput]}
            onChangeText={text => onChangeText(text)}
            value={internalValue} 
            maxLength={maxLength} 
            keyboardType={'numeric'}
            ref={inputRef}
          />
        </View>
        {renderInputs()}
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

CodeEntry.defaultProps = {
  bgColorActive: Colors.white,
  bgColorUnactive: Colors.white,
  borderColorActive: 'rgba(18, 18, 29, 0.1)',
  borderColorUnactive: 'rgba(18, 18, 29, 0.1)',
  error: false,
  showAnimation: false,
  borderColorError: Colors.red,
  bgColorError: Colors.white,
  numOfSymbols: 6
}

const CodeEntryM = memo(CodeEntry);
export { CodeEntryM as CodeEntry };