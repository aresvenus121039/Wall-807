import React, { useState } from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import { makeStyles } from '@mui/styles';
import { Box, CardMedia, Typography } from '@mui/material';
import { cloudflareImage } from '@/utility/images';

import { ArtistVerifiedName } from './ArtistVerifiedName';
import { ArtistProfileMenu } from './ArtistProfileMenu';
import { ArtistProfileStatus } from './ArtistProfileStatus';
import ArtistBio from './ArtistBio';
import ArtistArtStyle from './ArtistArtStyle';
import { ArtistExhibition } from './ArtistExhibition';
import ArtistClientLogo from './ArtistClientLogo';
import { CryptoIcon } from '@/components/icons';
import useWindowSize from '@/utility/useWindowSize';
import OptimizedImage from '@/components/OptimizedImage';

export const ValignTextMiddle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MontserratBoldWhite16px = css`
  color: var(--white);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-l);
  font-weight: 700;
  font-style: normal;
`;

const ArtStyle = styled.h3`
  ${ValignTextMiddle}
  ${MontserratBoldWhite16px}
  width: 89px;
  letter-spacing: 0;
  white-space: nowrap;
  font-size: 18.72px;
`;

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    position: 'relative',
  },
  contentWrapper: {
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.only('md')]: {
      marginTop: 50,
      gap: 40,
    },
    [theme.breakpoints.only('lg')]: {
      marginTop: 50,
      gap: 40,
    },
    [theme.breakpoints.only('xl')]: {
      marginTop: 50,
      gap: 40,
    },
  },
  profileImage: {
    objectFit: 'cover',
    borderRadius: '24px',
    [theme.breakpoints.only('xl')]: {
      width: '306px',
      height: '541.36px',
    },
    [theme.breakpoints.only('lg')]: {
      width: '306px',
      height: '541.36px',
    },
    [theme.breakpoints.only('md')]: {
      width: '306px',
      height: '541.36px',
    },
    [theme.breakpoints.only('sm')]: {
      width: '500px',
      height: '450px',
      marginBottom: '20px',
      margin: 'auto',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      height: '450px',
      objectFit: 'cover',
      objectPosition: 'center',
      marginBottom: '20px',
    },
  },
  details: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    [theme.breakpoints.only('xs')]: {
      gap: 0,
    },
    [theme.breakpoints.only('sm')]: {
      gap: 20,
    },
    [theme.breakpoints.only('md')]: {
      gap: 20,
    },
  },
  bio: {
    display: 'flex',
    gap: 10,
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.only('md')]: {
      flexDirection: 'column',
    },
  },
  artStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    [theme.breakpoints.only('lg')]: {
      maxWidth: '360px',
    },
    [theme.breakpoints.only('xl')]: {
      maxWidth: '360px',
    },
  },
  menu: {
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('md')]: {
      display: 'none',
    },
    [theme.breakpoints.only('lg')]: {
      display: 'none',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    [theme.breakpoints.only('xl')]: {
      display: 'none',
      position: 'absolute',
      right: 0,
      top: 0,
    },
  },
  cryptoIcon: {
    [theme.breakpoints.down('lg')]: {
      width: 30,
    },
  },
  name: {
    [theme.breakpoints.only('xl')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      backgroundImage:
        'linear-gradient(90deg, rgba(169,132,255,1) 0%, rgba(100,225,220,1) 49%, rgba(111,194,255,1) 100%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textTransform: 'capitalize',
      fontSize: '100px',
      fontWeight: 900,
      lineHeight: '1.75',
      letterSpacing: '-0.02em',
    },
    [theme.breakpoints.only('lg')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      backgroundImage:
        'linear-gradient(90deg, rgba(169,132,255,1) 0%, rgba(100,225,220,1) 49%, rgba(111,194,255,1) 100%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textTransform: 'capitalize',
      fontSize: '60px',
      fontWeight: 900,
      lineHeight: '1.75',
      letterSpacing: '-0.02em',
    },
    [theme.breakpoints.only('md')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      backgroundImage:
        'linear-gradient(90deg, rgba(169,132,255,1) 0%, rgba(100,225,220,1) 49%, rgba(111,194,255,1) 100%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textTransform: 'capitalize',
      fontSize: '34px',
      fontWeight: 900,
      lineHeight: '1.5',
      letterSpacing: '-0.02em',
      textAlign: 'left',
    },
    [theme.breakpoints.only('sm')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      backgroundImage:
        'linear-gradient(90deg, rgba(169,132,255,1) 0%, rgba(100,225,220,1) 49%, rgba(111,194,255,1) 100%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textTransform: 'capitalize',
      fontSize: '34px',
      fontWeight: 900,
      lineHeight: '1.5',
      letterSpacing: '-0.02em',
      textAlign: 'left',
    },
    [theme.breakpoints.only('xs')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      backgroundImage:
        'linear-gradient(90deg, rgba(169,132,255,1) 0%, rgba(100,225,220,1) 49%, rgba(111,194,255,1) 100%) !important',
      backgroundSize: '100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textTransform: 'capitalize',
      fontSize: '34px',
      fontWeight: 900,
      lineHeight: '1.3',
      letterSpacing: '-0.02em',
      textAlign: 'left',
    },
  },
}));

interface ArtistDetailsSectionProps {
  artist: any; // Update the type of artist as per your requirements
}

const ArtistDetailsSection: React.FC<ArtistDetailsSectionProps> = (props) => {
  const classes = useStyles();
  const size = useWindowSize();

  const { artist } = props;

  const artistImageCollection = _.get(artist, 'artist_image', []) || [];
  const [artist_image] = artistImageCollection.filter(
    (image: { fieldname: any; location: any }) =>
      image.fieldname && image.location
  );
  const artistImageLocation = _.get(artist_image, 'location', '') || '';

  const [isOpen, setIsOpen] = useState(false);

  const handlePopoverOpen = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
  };

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  const width = size?.width || 0;

  return (
    <Box
      className={classes.root}
      sx={
        {
          //overflowX: 'hidden', // hide overflowX to fix V3-356
        }
      }
    >
      <Box className={classes.contentWrapper}>
        {/* artist photo */}
        <Box
          sx={{
            position: 'relative',
          }}
        >
          {/* verified icon */}
          <Box
            sx={{
              position: 'absolute',
              top: '18px',
              right: '20px',
              display: {
                xs: 'block',
                sm: 'none', // hide on dekstop, move it to right
              },
            }}
          >
            <ArtistVerifiedName
              verified={width < 600 ? artist.is_verified : false}
            >
              {artist.name}
            </ArtistVerifiedName>
          </Box>

          <OptimizedImage
            alt={`${artist.name}`}
            title={`${artist.name}`}
            fill
            className={classes.profileImage}
            src={
              artistImageLocation ||
              'https://wxllspace-app.s3.us-east-2.amazonaws.com/assets/404/Astro.png'
            }
          />
        </Box>

        <Box className={classes.details}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              className={classes.name}
              sx={{
                display: {
                  xs: 'block',
                  sm: 'none',
                },
                paddingRight: '15px',
              }}
            >
              <h1> {artist.artist_name || artist.name} </h1>
            </Box>

            <Box
              sx={{
                position: 'relative',
                flex: '0 1 auto',
                marginRight: '12px',
                display: {
                  xs: 'none',
                  sm: 'block', // hide on mobile, move it to photo
                },
              }}
            >
              <ArtistVerifiedName
                verified={width >= 600 ? artist.is_verified : false}
              >
                <h1>{artist.artist_name || artist.name}</h1>
              </ArtistVerifiedName>
            </Box>

            {/* crypto icon */}
            <Box
              sx={{
                position: 'relative',
                flex: '0 1 auto',
              }}
            >
              {/* popover */}
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  left: {
                    xs: '-68px',
                    sm: '-68px',
                    md: '-68px',
                    lg: '-68px',
                  },
                  right: {
                    xs: '-68px',
                    sm: '-68px',
                    md: '-68px',
                    lg: '-68px',
                  },
                  top: {
                    xs: '-43px',
                    sm: '-50px',
                  },
                  opacity: isOpen ? 1 : 0,
                  transition: '0.4s',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#FFF',
                    p: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#000',
                      fontFamily: 'var(--font-family-montserrat)',
                      lineHeight: 1.5,
                      fontSize: {
                        xs: '8px',
                        sm: '12px',
                      },
                      fontWeight: '600',
                      fontStyle: 'normal',
                      textAlign: 'center',
                    }}
                  >
                    This artist accepts crypto
                  </Typography>
                </Box>
                {/* arrow */}
                <Box
                  sx={{
                    width: 0,
                    height: 0,
                    borderLeft: '15px solid transparent',
                    borderRight: '15px solid transparent',
                    borderTop: '15px solid #fff',
                    marginTop: {
                      xs: '-6px',
                      sm: '-4px',
                    },
                    borderRadius: '6px',
                    marginLeft: {
                      xs: '50%',
                    },
                    transform: 'translateX(-50%)',
                  }}
                />
              </Box>

              {artist.accept_crypto_payment && (
                <Box
                  sx={{
                    cursor: 'pointer',
                    mb: {
                      xs: '0',
                      md: '4px',
                    },
                    position: 'relative',
                    zIndex: 7,
                  }}
                  onClick={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <CryptoIcon
                    height={width > 900 ? 45 : 30}
                    width={width > 900 ? 45 : 30}
                  />
                </Box>
              )}
            </Box>
          </Box>

          <ArtistProfileStatus artist={artist} />

          <Box
            sx={{
              border: '1px solid rgba(255, 255, 255, 0.15)',
              my: '30px',
              display: 'none',
            }}
          ></Box>

          <Box className={classes.bio}>
            {/* description */}
            <Box
              sx={{
                flex: '1 1 auto',
              }}
            >
              <ArtistBio>{artist.about}</ArtistBio>
            </Box>

            <Box
              className={classes.artStyle}
              sx={{
                flex: '0 1 auto',
              }}
            >
              {artist.art_types && (
                <Box>
                  <ArtStyle>Art Style</ArtStyle>
                  <ArtistArtStyle artStyles={artist.art_types} />
                </Box>
              )}

              {artist.exhibitions && (
                <ArtistExhibition exhibitions={artist.exhibitions} />
              )}
            </Box>
          </Box>

          {artist.clients && <ArtistClientLogo clients={artist.clients} />}
        </Box>
      </Box>

      {/*****colorpallet****/}

      {/*<Box>*/}
      {/*  {artist.colorPallete &&*/}
      {/*    artist.colorPallete.map((item) => {*/}
      {/*      return <Palette src={item.location} />;*/}
      {/*    })}*/}
      {/*</Box>*/}
      <Box className={classes.menu}>
        <ArtistProfileMenu />
      </Box>
    </Box>
  );
};

export default ArtistDetailsSection;
