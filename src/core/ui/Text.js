import React from 'react';
import { Text as NativeText } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from 'features/theme';

export const Text = ({ children, size, bold, color }) => {
  const style = {
    fontSize: size,
    fontWeight: bold ? 'bold' : 'normal',
    color,
  };

  return <NativeText style={style}>{children}</NativeText>;
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  bold: PropTypes.bool,
  color: PropTypes.string,
};

Text.defaultProps = {
  size: 16,
  bold: false,
  color: colors.black,
};
