import React, { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface InputLabelProps {
  styleWrap?: React.CSSProperties;
  text?: string;
  children?: ReactNode;
}

const InputLabel: React.FC<InputLabelProps & TypographyProps> = (
  props: any
) => {
  const { styleWrap, text, children, ...typographyProps } = props;

  return (
    <Typography
      component="span"
      sx={{
        color: '#FFFFFF',
        fontFamily: 'var(--font-family-formulacondensed)',
        fontSize: '22px',
        fontWeight: '700',
        fontStyle: 'normal',
        letterSpacing: '0.88px',
        display: 'block',
        marginBottom: '8px',
        lineHeight: '26px',
        ...styleWrap,
      }}
      {...typographyProps}
    >
      {text || children}
    </Typography>
  );
};

export default InputLabel;
