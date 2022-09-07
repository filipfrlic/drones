import React, { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from 'features/theme';

const BaseButton = ({ title, onPress, disabled }) => (
  <Pressable
    style={[styles.button, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

BaseButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

BaseButton.defaultProps = {
  disabled: false,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 8,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  disabled: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
});

const Button = memo(BaseButton);

export { Button };
