import { useEffect } from 'react';
import { Container, Grid, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import _, { get } from 'lodash';

import {
  geocodeArtistLocation,
  getArtistDetails,
} from '@/store/actions/artistActions';
import {
  ARTIST_GET_DETAILS_IDLE,
  ARTIST_GET_DETAILS_SUCCESS,
  ARTIST_GET_DETAILS_FAIL,
} from '@/constants/artistConstants';
import {
  selectArtistDetails,
  requestStatus,
} from '@/store/reducers/artistReducers';
import LocationSection from './../../components/controls/LocationSection';
import PortfolioSection from './../../components/controls/PortfolioSection';
import ArtistDetailsSection from './../../components/controls/ArtistDetailsSection';
import gtag from 'ga-gtag';
import { titleCase } from '@/utility';
import { cloudflareImage } from '@/utility/images';
import React from 'react';
import { Artist } from '@/types';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

export const PageSkeleton = () => {
  return (
    <Box
      sx={{
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* blur */}
      <Box
        sx={{
          width: '268px',
          height: '268px',
          backgroundColor: '#6AB3DF',
          filter: 'blur(60px) opacity(0.5);',
          position: 'absolute',
          left: 0,
          top: {
            xs: '190px',
            sm: '270px',
          },
          zIndex: -100,
        }}
      />

      {/* blur */}
      <Box
        sx={{
          width: '268px',
          height: '268px',
          backgroundColor: '#B14EFF',
          filter: 'blur(60px) opacity(0.5);',
          position: 'absolute',
          right: 0,
          top: {
            xs: '600px',
            sm: '140px',
          },
          zIndex: -100,
        }}
      />

      {/** skeleton */}
      <Container maxWidth="xl">
        <Box
          sx={{
            height: '100vh',
            paddingTop: '8rem',
            paddingBottom: '8rem',
            paddingLeft: {
              xs: '2rem',
              sm: '4rem',
              md: '8rem',
              lg: '8rem',
              xl: '8rem',
            },
            paddingRight: {
              xs: '2rem',
              sm: '4rem',
              md: '8rem',
              lg: '8rem',
              xl: '8rem',
            },
          }}
        >
          <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="text"
            width={'100wh'}
            height={'20px'}
          />
          <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="text"
            width={'100wh'}
            height={'20px'}
          />
          <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="text"
            width={'100wh'}
            height={'20px'}
          />
        </Box>
      </Container>
    </Box>
  );
};

type ArtistScreenProps = {
  artistDetails: {
    data: Artist;
    slug: string;
    error: string;
  };
};

export const ArtistScreen = (props: ArtistScreenProps) => {
  const { artistDetails } = props;

  useEffect(() => {
    gtag('event', 'artist_view_per_visit', {
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [artistDetails]);

  // TODO check if artist city and state work.

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* blur */}
      <Box
        sx={{
          width: '268px',
          height: '268px',
          backgroundColor: '#6AB3DF',
          filter: 'blur(60px) opacity(0.5);',
          position: 'absolute',
          left: {
            xs: '-240px',
            sm: 0,
          },
          top: {
            xs: '0',
            sm: '270px',
          },
          zIndex: -100,
        }}
      />

      {/* blur */}
      <Box
        sx={{
          width: '268px',
          height: '268px',
          backgroundColor: '#B14EFF',
          filter: 'blur(60px) opacity(0.5);',
          position: 'absolute',
          right: {
            xs: '-240px',
            sm: 0,
          },
          top: {
            xs: '600px',
            sm: '140px',
          },
          zIndex: -100,
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1,
          overflow: { xs: 'hidden', lg: 'visible' },
        }}
      >
        <Grid container spacing={2}>
          {/* Artist Details Section */}
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                marginTop: '4rem',
              }}
            >
              <ArtistDetailsSection artist={artistDetails.data} />
            </Box>
          </Grid>

          {/* Artist Location Section */}
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                marginTop: '2rem',
              }}
            >
              <LocationSection artist={artistDetails.data} />
            </Box>
          </Grid>

          {/* Artist Portfolio Section */}
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <PortfolioSection gallery={artistDetails.data.gallery} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

type WriteParams = {
  slug?: string;
};

const ConnectedArtistScreen = (props: any) => {
  const { artistDetails } = props;

  const dispatch = useDispatch();

  geocodeArtistLocation(artistDetails.data.address)
    .then((result) => {
      const payload = {
        ...artistDetails.data,
        ...{
          address: {
            ...artistDetails.data.address,
            ...{ longAndLat: get(result, 'features[0].center') },
          },
        },
      };

      dispatch({
        type: ARTIST_GET_DETAILS_SUCCESS,
        payload,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return <ArtistScreen artistDetails={artistDetails} />;
};

export default ConnectedArtistScreen;
