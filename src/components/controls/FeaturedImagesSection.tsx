import React, { useState } from 'react';
import { Box, Container, Grid, Modal, formLabelClasses } from '@mui/material';
import _ from 'lodash';

import FeaturedSliderCard from './FeaturedSliderCard';
import StreetViewContainer from './StreetViewContainer';

const FeaturedImagesSection = ({
  featureImage,
  createdAt,
  coordinates = [],
}: {
  featureImage: { location: string }[];
  createdAt?: string;
  coordinates: Array<number>;
}) => {
  const longitude = _.get(coordinates, [0], 0) || 0;
  const latitude = _.get(coordinates, [1], 0) || 0;
  return (
    <Container maxWidth={false}>
      <Grid container spacing={{ xs: 10, sm: 3, md: 4, lg: 4, xl: 4 }}>
        <Grid item xs={12} sm={12} md={8}>
          <FeaturedSliderCard image={featureImage} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{
            margin: { xs: '-60px auto auto auto', sm: '0px auto auto auto' },
          }}
        >
          <Grid container>
            <StreetViewContainer
              lat={latitude}
              long={longitude}
              styleWrap={{
                width: '100%',
                height: {
                  xs: '277px',
                  sm: '453px',
                  md: '462px',
                  xl: '600px',
                },
                borderRadius: {
                  lg: '16px',
                  xs: '8px',
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturedImagesSection;
