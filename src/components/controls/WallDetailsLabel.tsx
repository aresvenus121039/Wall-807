import React, { FC } from 'react';
import { Box,Button, Chip, Typography, TypographyProps } from '@mui/material';

interface WallDetailsLabelProps {
  styleWrap: React.CSSProperties;
  text: string;
}

const WallDetailsLabel: FC<WallDetailsLabelProps> = (props) => {
  const { styleWrap, text } = props;

  return (
    <>
      {
        text == "" || text == null ? (<></>) : (
          <Button
            sx={{
              ...styleWrap,
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.30)',
              background: 'rgba(255, 255, 255, 0.15)',
            }}
          ><span style={{transform: 'translateY(-1.5px)'}}>{text}</span></Button>
        )
      }
    </>
  );
};

export default WallDetailsLabel;
