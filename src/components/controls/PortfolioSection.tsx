import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import React from 'react';
import PortfolioCard from './PortfolioCard';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import { cloudflareImage } from '@/utility/images';
import { ValignTextMiddle, MontserratBoldWhite16px } from './ArtistCard';

const useStyles = makeStyles((theme: any) => ({
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
  artist_name: {
    [theme.breakpoints.down('md')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      fontWeight: 900,
      fontSize: 'var(--font-size-l)',
      color: 'var(--white)',
      letterSpacing: 0,
      whiteSpace: 'wrap',
      wordBreak: 'break-word',
    },
    [theme.breakpoints.up('md')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      fontWeight: 900,
      fontSize: 'var(--font-size-xxxl)',
      color: 'var(--white)',
      letterSpacing: 0,
      whiteSpace: 'wrap',
      wordBreak: 'break-word',
    },
  },
  artistLocation: {
    [theme.breakpoints.down('md')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 'var(--font-size-xs)',
      color: 'var(--white-42)',
      letterSpacing: 0,
      whiteSpace: 'normal',
      textTransform: 'uppercase',
    },
    [theme.breakpoints.up('md')]: {
      fontFamily: 'var(--font-family-montserrat)',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 'var(--font-size-l)',
      color: 'var(--white-42)',
      letterSpacing: 0,
      whiteSpace: 'normal',
      textTransform: 'uppercase',
    },
  },
  wrapGrid: {
    '&:hover div': {
      opacity: 1,
    },
  },
}));

interface GalleryImage {
  title?: string;
  location: string;
  address?: string;
}

interface PortfolioSectionProps {
  gallery?: GalleryImage[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  gallery = [],
}) => {
  const classes = useStyles();

  if (gallery === undefined || gallery.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        mx: 'auto',
      }}
    >
      <Typography
        variant="h2"
        className={classes.sectionHeading}
        sx={{
          marginBottom: '20px',
        }}
      >
        Portfolio
      </Typography>

      <Box>
        <Masonry
          breakpointCols={{
            default: 2,
            1140: 3,
            912: 2,
            768: 1,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {gallery.map((image, index) => (
            <Box key={index}>
              <Box sx={{ position: 'relative' }} className={classes.wrapGrid}>
                <img
                  src={cloudflareImage(image.location)}
                  alt={image.title}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                  }}
                />
                {(image.title || image.address) && (
                  <Group3316>
                    {image.title && (
                      <Typography className={classes.artist_name}>
                        {image.title}
                      </Typography>
                    )}
                    {image.address && (
                      <Location>
                        <Typography className={classes.artistLocation}>
                          {image.address}
                        </Typography>
                      </Location>
                    )}
                  </Group3316>
                )}
              </Box>
            </Box>
          ))}
        </Masonry>
      </Box>

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
          zIndex: -10,
        }}
      ></Box>
    </Box>
  );
};

export default PortfolioSection;

PortfolioSection.propTypes = {
  gallery: PropTypes.array,
};

PortfolioSection.defaultProps = {
  gallery: [],
};

const Group3316 = styled.div`
  opacity: 0;
  position: absolute;
  bottom: 20px;
  right: 20px;
  left: 20px;
  padding: 15.5px 20px;
  background-color: #00000069;
  backdrop-filter: blur(40px) brightness(100%);
  -webkit-backdrop-filter: blur(40px) brightness(100%);
  text-align: left;
  border-radius: 10px;
  transition: opacity 0.5s;
  text-overflow: ellipsis;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Location = styled.div`
  ${ValignTextMiddle}
  ${MontserratBoldWhite16px}
  letter-spacing: 0;
  line-height: 90px;
  white-space: normal;
`;
