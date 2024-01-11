import React, { FC } from 'react';
import { Box, Chip, Typography, TypographyProps } from '@mui/material';

interface WallDetailsLabelProps {
  styleWrap: React.CSSProperties;
  text: string;
}

const WallDetailsLabel: FC<WallDetailsLabelProps> = (props) => {
  const { styleWrap, text } = props;

  return (
    <Chip
      sx={{
        ...styleWrap,
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.30)',
        background: 'rgba(255, 255, 255, 0.15)',
      }}
      label={text}
    />
  );
};

export default WallDetailsLabel;
