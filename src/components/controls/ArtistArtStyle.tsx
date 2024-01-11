import { Chip } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Root = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 270px;
  margin-top: 16px;
  gap: 10px;
  flex-wrap: wrap;
`;

interface ArtistArtStyleProps {
  artStyles?: string[];
}

const ArtistArtStyle: FC<ArtistArtStyleProps> = ({ artStyles = [] }) => {
  return (
    <Root>
      {artStyles.map((styleName, index) => (
        <Chip
          label={styleName}
          key={index}
          sx={{
            borderRadius: '100px',
            backgroundColor: 'rgba(220, 220, 220, 0.06)',
            backdropFilter: 'blur(60px) brightness(100%)',
            WebkitBackdropFilter: 'blur(60px) brightness(100%)',
          }}
        />
      ))}
    </Root>
  );
};

export default ArtistArtStyle;
