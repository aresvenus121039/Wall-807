import React, { useEffect } from 'react';
import _ from 'lodash';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LocationMapContainer from './LocationMapContainer';
import { getStateAbbr } from '@/utility/usaStateAbbr';
import { Theme } from '@mui/system';
import { Artist, LocationMarkerData } from '../../types';

interface LocationSectionProps {
  artist: Artist;
}

const useStyles = makeStyles((theme: Theme) => ({
  sectionHeading: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '34px',
      fontWeight: 900,
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      letterSpacing: '-0.05em',
      backgroundImage:
        'linear-gradient(94.83deg, #FFFFFF 26.58%, #A984FF 44.93%, #64E1DC 54.77%, #6FC2FF 64.82%, #FFFFFF 78.91%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: '34px',
      fontWeight: 900,
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      letterSpacing: '-0.05em',
      backgroundImage:
        'linear-gradient(94.83deg, #FFFFFF 26.58%, #A984FF 44.93%, #64E1DC 54.77%, #6FC2FF 64.82%, #FFFFFF 78.91%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    [theme.breakpoints.only('md')]: {
      fontSize: '55px',
      fontWeight: 900,
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      lineHeight: '90px',
      letterSpacing: '-0.05em',
      backgroundImage:
        'linear-gradient(94.83deg, #FFFFFF 26.58%, #A984FF 44.93%, #64E1DC 54.77%, #6FC2FF 64.82%, #FFFFFF 78.91%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    [theme.breakpoints.only('lg')]: {
      fontSize: '55px',
      fontWeight: 900,
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      lineHeight: '90px',
      letterSpacing: '-0.05em',
      backgroundImage:
        'linear-gradient(94.83deg, #FFFFFF 26.58%, #A984FF 44.93%, #64E1DC 54.77%, #6FC2FF 64.82%, #FFFFFF 78.91%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    [theme.breakpoints.only('xl')]: {
      fontSize: '55px',
      fontWeight: 900,
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      lineHeight: '90px',
      letterSpacing: '-0.05em',
      backgroundImage:
        'linear-gradient(94.83deg, #FFFFFF 26.58%, #A984FF 44.93%, #64E1DC 54.77%, #6FC2FF 64.82%, #FFFFFF 78.91%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
  },
  subHeading: {
    [theme.breakpoints.only('xs')]: {
      color: '#5b5e76',
      fontSize: 'var(--font-size-xs)',
      fontStyle: 'normal',
      fontFamily: 'var(--font-family-montserrat)',
      fontWeight: 900,
      whiteSpace: 'normal',
      letterSpacing: 0,
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    [theme.breakpoints.only('sm')]: {
      color: '#5b5e76',
      fontSize: 'var(--font-size-xs)',
      fontStyle: 'normal',
      fontFamily: 'var(--font-family-montserrat)',
      fontWeight: 900,
      whiteSpace: 'normal',
      letterSpacing: 0,
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    [theme.breakpoints.only('md')]: {
      color: '#5b5e76',
      fontSize: 'var(--font-size-l)',
      fontStyle: 'normal',
      fontFamily: 'var(--font-family-montserrat)',
      fontWeight: 900,
      whiteSpace: 'normal',
      letterSpacing: 0,
      textTransform: 'uppercase',
      textAlign: 'center',
      marginTop: '-20px',
    },
    [theme.breakpoints.only('lg')]: {
      color: '#5b5e76',
      fontSize: 'var(--font-size-l)',
      fontStyle: 'normal',
      fontFamily: 'var(--font-family-montserrat)',
      fontWeight: 900,
      whiteSpace: 'normal',
      letterSpacing: 0,
      textTransform: 'uppercase',
      textAlign: 'center',
      marginTop: '-20px',
    },
    [theme.breakpoints.only('xl')]: {
      color: '#5b5e76',
      fontSize: 'var(--font-size-l)',
      fontStyle: 'normal',
      fontFamily: 'var(--font-family-montserrat)',
      fontWeight: 900,
      whiteSpace: 'normal',
      letterSpacing: 0,
      textTransform: 'uppercase',
      textAlign: 'center',
      marginTop: '-20px',
    },
  },
}));

const LocationSection: React.FC<LocationSectionProps> = ({ artist }) => {
  const classes = useStyles();

  const { address = {} } = artist;
  const artistImageCollection = _.get(artist, 'artist_image', []) || [];
  const [artist_image] = artistImageCollection.filter(
    (image) => image.fieldname && image.location
  );
  const artistImageLocation = _.get(artist_image, 'location', '') || '';
  const artistCoordinates = _.get(artist, 'location.coordinates', []) as [
    number,
    number
  ];
  const artistState = _.get(artist, 'address.state', '') || '';
  const artistCity = _.get(artist, 'address.city', null);
  const stateAbbr = getStateAbbr(artistState);

  const locationData: LocationMarkerData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: artistCoordinates,
        },
        properties: {
          title: address.city,
          image: artistImageLocation,
          entity: 'locationNoCity',
        },
      },
    ],
  };

  if (address === undefined) return null;

  return (
    <Box>
      <Box
        sx={{
          marginBottom: '20px',
        }}
      >
        <Typography className={classes.sectionHeading} variant="h2">
          Location
        </Typography>
        <Typography className={classes.subHeading} variant="h4">
          {artistCity
            ? `${artistCity}, ${stateAbbr ? stateAbbr : artistState}`
            : artistState}
        </Typography>
      </Box>

      <Box
        sx={{
          height: {
            xs: '192px',
            sm: '428px',
          },
          width: '100%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '268px',
            height: '268px',
            backgroundColor: '#B14EFF',
            filter: 'blur(60px) opacity(0.5);',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 0,
          }}
        ></Box>

        {/* blur */}
        <Box
          sx={{
            width: '268px',
            height: '268px',
            backgroundColor: '#6AB3DF',
            filter: 'blur(60px) opacity(0.5);',
            position: 'absolute',
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        ></Box>

        <LocationMapContainer
          latitude={artistCoordinates[1]}
          longitude={artistCoordinates[0]}
          width={'100%'}
          height={'100%'}
          markerData={locationData}
          zoom={11}
          pitch={0.0}
          bearing={0.0}
          mapStyle="dark-v10"
        />
      </Box>
    </Box>
  );
};

export default LocationSection;
