import React from 'react';
import PropTypes from 'prop-types';
import { styled, Button } from '@mui/material';

export const SignupButton = (props: any) => {
  return <MuiButton onClick={props.onClick}>sign up</MuiButton>;
};

SignupButton.defaultProps = {
  backgroundColor: null,
  onClick: undefined,
};

SignupButton.propTypes = {
  backgroundColor: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

function MuiButton(props: any) {
  const { children } = props;

  return <MuiBtn>{children}</MuiBtn>;
}

const MuiBtn = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  minWidth: '97px',
  height: '42px',
  color: theme.palette.common.white,
  fontSize: theme.typography.pxToRem(12),
  fontWeight: 700,
  fontStyle: 'normal',
  textAlign: 'center',
  padding: '12.9px 23.1px',
  border: 'none',
  borderRadius: '8px',
  lineHeight: '75px',
  background: 'linear-gradient(74.3deg, #5700ff 2.8%, #00c8c8 133.27%)',
  fontFamily: theme.typography.fontFamily,
  '&:hover': {
    background: 'linear-gradient(74.3deg, #5700ff 2.8%, #00c8c8 133.27%)',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    background: 'linear-gradient(74.3deg, #5700ff 2.8%, #00c8c8 133.27%)',
  },
  '&:focus': {
    boxShadow: `0 0 0 0.2rem ${theme.palette.primary.main}80`,
  },
}));
