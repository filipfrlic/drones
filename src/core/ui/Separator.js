import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from 'features/theme';

export const Separator = ({ style }) => <View style={[styles.separator, style]} />;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    marginHorizontal: 4,
    backgroundColor: colors.lightGray,
  },
});

Separator.propTypes = {
  style: PropTypes.shape({}),
};

Separator.defaultProps = {
  style: {},
};
