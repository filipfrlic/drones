import React from 'react';
import { StyleSheet, TextInput as NativeTextInput } from 'react-native';
import PropTypes from 'prop-types';

export const TextInput = ({ value, onChangeText, placeholder }) => (
  <NativeTextInput
    style={style}
    onChangeText={onChangeText}
    value={value}
    placeholder={placeholder}
  />
);

const style = StyleSheet.create({
  borderColor: 'black',
  borderWidth: 1,
  borderRadius: 8,
  height: 48,
  fontSize: 18,
});

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  placeholder: '',
};
