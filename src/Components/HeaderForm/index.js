import React from 'react';
import PropTypes from 'prop-types';
import { Text } from './styles';

const HeaderForm = ({ title, size, color, margin }) => (
  <Text color={color} size={size} margin={margin}>
    {title}
  </Text>
);

HeaderForm.propTypes = {
  title: PropTypes.node.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.string,
};

HeaderForm.defaultProps = {
  size: '20px',
  color: '#515151',
  margin: '0 0 15px',
};

export default HeaderForm;
