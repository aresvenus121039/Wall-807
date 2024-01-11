import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { VerifiedBadgeIcon } from '@/components/icons';
import useWindowSize from '@/utility/useWindowSize';

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    [theme.breakpoints.only('xl')]: {
      gap: 30,
    },
    [theme.breakpoints.only('lg')]: {
      gap: 30,
    },
    [theme.breakpoints.only('md')]: {
      gap: 20,
    },
    [theme.breakpoints.only('sm')]: {
      gap: 20,
    },
    [theme.breakpoints.only('xs')]: {
      gap: 20,
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
      fontSize: '60px',
      fontWeight: 900,
      lineHeight: '1.1',
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
      lineHeight: '1.1',
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
      lineHeight: '1.1',
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
      lineHeight: '1.1',
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
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      textAlign: 'left',
    },
  },
  verified: {
    backgroundColor: 'var(--alto2)',
    cursor: 'pointer',
    [theme.breakpoints.only('xl')]: {
      width: 45,
      height: 45,
    },
    [theme.breakpoints.only('lg')]: {
      width: 45,
      height: 45,
    },
    [theme.breakpoints.only('md')]: {
      width: 30,
      height: 30,
    },
    [theme.breakpoints.only('sm')]: {
      width: 30,
      height: 30,
    },
    [theme.breakpoints.only('xs')]: {
      width: 30,
      height: 30,
    },
  },
}));

interface ArtistVerifiedNameProps {
  verified: boolean;
  children: React.ReactNode;
}

export const ArtistVerifiedName: React.FC<ArtistVerifiedNameProps> = ({
  verified,
  children,
}) => {
  const classes = useStyles();
  const size = useWindowSize();

  const [isOpen, setIsOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsOpen(!isOpen);
  };

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  return (
    <Box className={classes.root}>
      <Box
        className={classes.name}
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          position: 'relative',
          mt: '14px',
        }}
      >
        {/* popover */}
        <Box
          sx={{
            position: 'absolute',
            zIndex: 2,
            left: {
              xs: '-115px',
              md: '-73px',
              lg: '-73px',
              xl: '-73px',
            },
            right: {
              xs: '0',
              sm: '-73px',
              md: '-73px',
              lg: '-73px',
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
                fontWeight: '600',
                fontStyle: 'normal',
                fontSize: {
                  xs: '8px',
                  sm: '12px',
                },
                textAlign: 'center',
              }}
            >
              This artist has been verified
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
                xs: '95%',
                sm: '50%',
              },
              transform: {
                xs: 'translateX(-90%)',
                sm: 'translateX(-50%)',
              },
            }}
          ></Box>
        </Box>

        {/* icon image */}
        {verified && (
          <Box
            sx={{
              cursor: 'pointer',
              position: 'relative',
              zIndex: 8,
            }}
            onClick={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <VerifiedBadgeIcon
              height={size?.width ? (size.width > 900 ? 45 : 30) : undefined}
              width={size?.width ? (size.width > 900 ? 45 : 30) : undefined}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
