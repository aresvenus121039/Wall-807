import React from 'react';
import { useMediaQuery } from '@mui/material';

const AboutUsLogo = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <svg
      width={isMobile ? '100' : '156'}
      height="156"
      viewBox="0 0 156 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="156" height="156" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image_about_us_logo_1"
            transform="scale(0.00641026)"
          />
        </pattern>
        <image
          id="image_about_us_logo_1"
          width="156"
          height="156"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default AboutUsLogo;