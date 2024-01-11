import React from 'react';
import { Box, Container, Grid, Typography, CardMedia } from '@mui/material';
import {
  Wash,
  Stairs,
  LocalParking,
  Wifi,
  FormatPaint,
  PresentToAll,
  BlurLinear,
  FormatColorFill,
  Shower,
  BathtubRounded,
} from '@mui/icons-material';
import { CSSProperties, makeStyles } from '@mui/styles';
import _ from 'lodash';
import { cloudflareImage } from '@/utility/images';
import { isDueDate } from '@/utility';
import { getRichDescription } from '@/utility/getRichDescription';

// import { isDueDate } from '@/utility/index';

import WallDetailsHeadInfo from './WallDetailsHeadInfo';
import WallDetailsBoxIcon from './WallDetailsBoxIcon';
import WallDetailsTextIcon from './WallDetailsTextIcon';
import WallDetailsLabel from './WallDetailsLabel';
import FeaturedImagesLabel from './FeaturedImagesLabel';
import { Theme } from '@mui/system';

interface WallDetailsSectionProps {
  title?: string;
  status?: string;
  location?: string;
  dateListed?: string;
  dateDueDate?: string;
  totalProposal?: string;
  surfaceArea?: string;
  wallArea?: string;
  brick?: string;
  scope?: string;
  categoryBuilding?: string;
  textDescription?: string;
  crypto?: boolean;
  textAdditionalInfo?: string;
  condition?: string;
  artStyles?: string[];
  createdAt?: string;
  direction?: string;
  colorscheme?: string[];
  amenities?: string[];
}

interface AmenitiesInfo {
  id: string;
  label: string;
  icon: any;
  type?: string;
}

interface WallDetailsHeadInfoProps {
  textDescription?: string;
  location?: string;
  dateListed?: string;
  dateDueDate?: string;
  totalProposal?: string;
  createdAt?: string;
}

const amenitiesInfo: AmenitiesInfo[] = [
  {
    id: 'Bathroom',
    label: 'Bathroom',
    icon: BathtubRounded,
  },
  {
    id: 'Electricity',
    label: 'Electricity',
    icon: 'icon-outdoor-electricity.svg',
    type: 'img',
  },
  {
    id: 'Lift Onsite',
    label: 'Lift Available',
    icon: Stairs,
    // icon: 'icon-ladder.svg',
    // type: 'img',
  },
  { id: 'Parking - Paid ', label: 'Paid Parking', icon: LocalParking },
  { id: 'Primed', label: 'Primed', icon: '' },
  { id: 'Slop Sink', label: 'Slop Sink', icon: Wash },
  { id: 'Wifi', label: 'Wifi', icon: Wifi },
  {
    id: 'Extra Paint Available',
    label: 'Extra Paint Available',
    icon: FormatPaint,
  },
  { id: 'Parking - Free', label: 'Free Parking', icon: LocalParking },
  {
    id: 'Outdoor Electricity',
    label: 'Outdoor Electricity',
    icon: 'icon-outdoor-electricity.svg',
    type: 'img',
  },
  { id: 'Paint Gun', label: 'Paint Gun', icon: FormatColorFill },
  { id: 'Power Washer', label: 'Power Washer', icon: Shower },
  { id: 'Projector', label: 'Projector', icon: PresentToAll },
  { id: 'Scaffolding', label: 'Scaffolding', icon: BlurLinear },
];

const useStyles = makeStyles((theme: Theme) => {
  const commonStyles = {
    fontWeight: 700,
    fontFamily: 'var(--font-family-formulacondensed)',
    fontStyle: 'normal',
    letterSpacing: '0.25rem',
    color: 'var(--white)',
    textAlign: 'left',
    textTransform: 'capitalize',
  };

  const getStyles = (fontSize: string, lineHeight: string | null = null) => ({
    fontSize,
    lineHeight,
    ...commonStyles,
  });

  const typographyBase: CSSProperties = {
    color: '#F1F0F0',
    fontFamily: 'var(--font-family-formulacondensed)',
    fontWeight: '700',
    fontStyle: 'normal',
    letterSpacing: '1.6px',
    textTransform: 'capitalize',
  };

  return {
    sectionHeading: {
      [theme.breakpoints.only('xs')]: getStyles('32px'),
      [theme.breakpoints.only('sm')]: getStyles('32px'),
      [theme.breakpoints.only('md')]: getStyles('50px', '80px'),
      [theme.breakpoints.only('lg')]: getStyles('50px', '80px'),
      [theme.breakpoints.only('xl')]: getStyles('80px', '100px'),
    },
    typography: {
      ...typographyBase,
      fontSize: '40px', // default to xs size
      lineHeight: '48px',
      marginBottom: '16px', // default to xs size
      [theme.breakpoints.up('md')]: {
        fontSize: '40px',
        marginBottom: '32px',
      },
    },
  };
});

const WallDetailsSection: React.FC<WallDetailsSectionProps> = (props) => {
  const {
    title,
    status,
    location,
    dateListed,
    dateDueDate,
    totalProposal,
    surfaceArea,
    wallArea,
    brick,
    scope,
    categoryBuilding,
    textDescription,
    crypto,
    textAdditionalInfo,
    condition,
    // wallType,
    artStyles,
    createdAt,
    // acceptCrypto,
  } = props;

  const classes = useStyles();

  const direction = _.get(props, 'direction', '') || '';
  const colorscheme = _.get(props, 'colorscheme', []) || [];
  const amenities = _.get(props, 'amenities', []) || [];

  const extractWallDetailsHeadInfoProps = (
    props: WallDetailsHeadInfoProps
  ) => ({
    styleWrap: { marginBottom: { xs: '24px', md: '52.73px' } },
    textDescription: props.textDescription,
    textLocation: props.location,
    textListed: props.dateListed,
    textDueDate: props.dateDueDate,
    textTotalProposal: props.totalProposal,
    createdAt: props.createdAt,
  });

  // RENDERS
  const renderWallDetailsBoxIcon = (
    iconImageSrc: string,
    text: string,
    popoverText: string
  ): JSX.Element => (
    <Grid item xs={6} sm={4}>
      <WallDetailsBoxIcon
        iconImageSrc={cloudflareImage(iconImageSrc)}
        text={text}
        popoverText={popoverText}
      />
    </Grid>
  );

  const renderWallDetailsBoxIcons = (
    wallArea: string = '',
    surfaceArea: string = '',
    brick: string = '',
    scope: string = '',
    direction: string = '',
    categoryBuilding: string = ''
  ): JSX.Element[] => {
    // Add more box icons as needed
    return [
      renderWallDetailsBoxIcon(
        'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame-2@2x.svg',
        surfaceArea,
        'Available to paint'
      ),
      renderWallDetailsBoxIcon(
        'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/full-screen-2@2x.svg',
        wallArea,
        'Wall dimensions in feet'
      ),
      renderWallDetailsBoxIcon(
        'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/tower-crane@2x.svg',
        brick,
        'Construction type'
      ),
      renderWallDetailsBoxIcon(
        'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame-5@2x.svg',
        scope,
        'Location of wall'
      ),
      renderWallDetailsBoxIcon(
        'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame-3@2x.svg',
        direction,
        'Direction wall faces'
      ),
      renderWallDetailsBoxIcon(
        'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame-4@2x.svg',
        categoryBuilding,
        'Property type'
      ),
    ];
  };

  return (
    <Grid>
      {/* head info */}
      <WallDetailsHeadInfo {...extractWallDetailsHeadInfoProps(props)} />

      {/* box icon list */}
      <Grid
        sx={{
          marginBottom: {
            xs: '40px',
            md: '60px',
          },
        }}
        container
        spacing={{ xs: 2, md: 4 }}
      >
        {renderWallDetailsBoxIcons(
          wallArea,
          surfaceArea,
          brick,
          scope,
          direction,
          categoryBuilding
        )}
      </Grid>

      {/* color pallete */}
      <Box
        sx={{
          display: 'none',
          marginBottom: {
            xs: '40px',
            md: '60px',
          },
        }}
      >
        <Typography component="h3" className={classes.typography}>
          Suggested Color Palette
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            '& div:first-of-type': {
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
            },
            '& div:last-child': {
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
            },
          }}
        >
          {colorscheme.map((item, i) => {
            const width = 100 / colorscheme.length;
            return (
              <div
                key={i}
                style={{
                  width: `${width}%`,
                  height: '30px',
                  backgroundColor: item,
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* additional info */}
      {textAdditionalInfo && (
        <Box
          sx={{
            marginBottom: {
              xs: '40px',
              md: '60px',
            },
          }}
        >
          <Typography component="h3" className={classes.typography}>
            Additional Info
          </Typography>

          <Typography
            sx={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-family-montserrat)',
              fontSize: '12px',
              fonWeight: '400',
              fontStyle: 'normal',
              lineHeight: '28.2px',
            }}
          >
            {textAdditionalInfo}
          </Typography>
        </Box>
      )}

      <Grid
        container
        spacing={{
          xs: 2,
          md: 4,
        }}
        sx={{
          marginBottom: {
            xs: '40px',
            md: '60px',
          },
        }}
      >
        <Grid item xs={12} md={6}>
          {/* accommodations */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'baseline',
              }}
            >
              <Typography component="h3" className={classes.typography}>
                Accommodations
              </Typography>
            </Box>

            <Grid
              container
              direction="column"
              sx={{
                borderRadius: '20px',
                border: '1px solid var(--opacity-white-white-50)',
                overflow: 'hidden',
              }}
            >
              {amenities.map((item, i) => {
                const details = amenitiesInfo.find(
                  (i: AmenitiesInfo) => i.id === item
                ) as AmenitiesInfo;
                const { icon: Icon, type } = details || {};
                return (
                  <Grid key={i} item>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '24px',
                        borderTop:
                          i != 0
                            ? '1px solid var(--opacity-white-white-35)'
                            : 'none',
                        background: 'var(--opacity-white-white-10)',
                      }}
                    >
                      {Icon &&
                        (type === 'img' ? (
                          <CardMedia
                            component="img"
                            src={`/${Icon}`}
                            sx={{
                              width: {
                                xs: '16px',
                                md: '24px',
                              },
                              height: {
                                xs: '16px',
                                md: '24px',
                              },
                            }}
                          />
                        ) : (
                          <Icon
                            sx={{
                              width: {
                                xs: '16px',
                                md: '24px',
                              },
                              height: {
                                xs: '16px',
                                md: '24px',
                              },
                            }}
                          />
                        ))}
                      <Typography
                        component="p"
                        sx={{
                          color: '#FFF',
                          fontFamily: 'Roboto',
                          fontSize: {
                            xs: '12px',
                            md: '16px',
                          },
                          fontWeight: '400',
                          fontStyle: 'normal',
                          marginLeft: '10px',
                          lineHeight: '25px',
                        }}
                      >
                        {details?.label || item}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* details */}
          <Box
            sx={{
              display: 'flex',
              padding: '18px 48px',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'stretch',
              borderRadius: '1000px',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              background: '#B14EFF',
              backdropFilter: 'blur(20px)',
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '900',
              lineHeight: '25px',
              marginTop: '20px',
            }}
          >
            Wall Details
          </Box>
        </Grid>
      </Grid>

      {/* interested art styles */}
      {artStyles && (
        <Box>
          <Typography component="h3" className={classes.typography}>
            Interested Art Styles
          </Typography>

          <Grid container>
            <Grid item sm={12}>
              {artStyles?.map((item, index) => (
                <WallDetailsLabel
                  key={index}
                  text={item}
                  styleWrap={{
                    margin: '0 12px 24px 0',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(60px)',
                    fontSize: '16px',
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '900',
                    lineHeight: '22px',
                    fontVariant: 'all-small-caps',
                    letterSpacing: '2.56px',
                  }}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default WallDetailsSection;
