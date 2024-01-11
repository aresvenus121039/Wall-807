import React from 'react';
import { Box } from '@mui/system';

interface Props {
  text?: string;
}

const FeaturedImagesLabel = (props: Props) => {
  const { text } = props;
  return (
    <Box
      sx={{
        height: '40px',
        display: 'flex',
        flexDirection: 'column',
        padding: {
          xs: '10px 24px',
          sm: '10px 24px',
        },
        alignItems: 'center',
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.30)',
        background: 'rgba(255, 255, 255, 0.20)',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          fontFamily: 'Roboto',
          fontWeight: '900',
          color: 'var(--white)',
          fontSize: '16px',
          textAlign: 'center',
          lineHeight: '22px',
          whiteSpace: 'nowrap',
          fontStyle: 'normal',
          fontVariant: 'all-small-caps',
          letterSpacing: '2.56px',
        }}
      >
        {text}
      </Box>
    </Box>
  );
};

export default FeaturedImagesLabel;
