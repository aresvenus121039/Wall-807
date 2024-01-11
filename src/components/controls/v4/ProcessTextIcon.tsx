import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import { cloudflareImage } from '@/utility/images';

interface ProcessTextIconProps {
  iconImageSrc: string;
  title: string;
  description: string;
}

const ProcessTextIcon: React.FC<ProcessTextIconProps> = ({
  iconImageSrc,
  title,
  description,
}) => {
  return (
    <Box
      sx={{
        padding: '48px',
        borderRadius: '24px',
        border: '1px solid var(--opacity-white-white-35)',
        background: 'var(--opacity-white-white-10)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardMedia
        loading="lazy"
        component="img"
        src={iconImageSrc}
        sx={{
          height: {
            xs: '24px',
            sm: '40px',
          },
          width: {
            xs: '24px',
            sm: '40px',
          },
          marginBottom: {
            xs: '24px',
            sm: '48px',
          },
        }}
      />

      <Typography
        component="h4"
        sx={{
          color: 'var(--white)',
          fontFamily: 'var(--font-family-formulacondesned)',
          fontSize: {
            xs: '14px',
            sm: '22px',
          },
          fontWeight: '700',
          letterSpacing: '0.88px',
          marginBottom: '8px',
        }}
      >
        {title}
      </Typography>

      <Typography
        component="p"
        sx={{
          color: 'var(--white)',
          fontFamily: 'var(--font-family-montserrat)',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ProcessTextIcon;