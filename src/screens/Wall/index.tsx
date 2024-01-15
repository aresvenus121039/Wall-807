import React, { useEffect } from 'react';
import { Container, Grid, Typography, CardMedia } from '@mui/material';
import { Box } from '@mui/system';
import { CSSProperties, makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import gtag from 'ga-gtag';

import FeaturedImagesSection from '@/components/controls/FeaturedImagesSection';
import WallDetailsSection from '@/components/controls/WallDetailsSection';
import LocationMapContainer from '@/components/controls/LocationMapContainer';
import ProcessSection from '@/components/controls/ProcessSection';
import SubmitProposalDesktop from '@/components/controls/SubmitProposalDesktop';
import SubmitProposalPopup from '@/components/controls/SubmitProposalPopup';
import WallSlider from '@/components/controls/WallSlider';
import FeaturedImagesLabel from '@/components/controls/FeaturedImagesLabel';
import { formatDate } from '@/utility';
import { cloudflareImage } from '@/utility/images';
import { WALL_GET_DETAILS_SUCCESS } from '@/constants/listingConstants';

import useMobile from '@/hooks/useMobile';
import { Theme } from '@mui/system';
import { isDueDate } from '@/utility';

const locationData = (coordinates: any) => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates,
      },
      properties: {
        title: 'Wall Location',
        description: 'Wall Location',
        image: cloudflareImage(
          'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/61850ffff59ce59ffa02723a/img/rectangle-77@2x.png'
        ),
        entity: 'locationNoPhoto',
      },
    },
  ],
});

const useStyles = makeStyles((theme: Theme) => {
  const commonStyles = {
    fontWeight: 700,
    fontFamily: 'var(--font-family-formulacondensed)',
    fontStyle: 'normal',
    letterSpacing: '0.25rem',
    color: 'transparent',
    textAlign: 'left',
    textTransform: 'uppercase',
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
      [theme.breakpoints.only('xs')]: getStyles('50px'),
      [theme.breakpoints.only('sm')]: getStyles('50px'),
      [theme.breakpoints.only('md')]: getStyles('70px', '80px'),
      [theme.breakpoints.only('lg')]: getStyles('90px', '100px'),
      [theme.breakpoints.only('xl')]: getStyles('100px', '110px'),
    },
    typography: {
      ...typographyBase,
      fontSize: '16px', // default to xs size
      marginBottom: '16px', // default to xs size
      [theme.breakpoints.up('md')]: {
        fontSize: '40px',
        marginBottom: '32px',
      },
    },
    containerSticky: {
      position: 'sticky',
      top: 20,
      zIndex: 5,
      alignSelf: 'flex-start',
    },
    containerFull: {
      position: 'relative',
    },
  };
});

const Wall = (props: any) => {
  const { listingDetails, otherWalls } = props;

  const { colorscheme, amenities, createdAt } = listingDetails;

  const classes = useStyles();

  console.log('[props--->]', props);

  const coordinates = _.get(listingDetails, 'location.coordinates', []) || [];
  const longitude = _.get(coordinates, [0], 0) || 0;
  const latitude = _.get(coordinates, [1], 0) || 0;
  const info = _.get(listingDetails, 'info', {}) || {};
  const address = _.get(listingDetails, 'address', {}) || {};
  const wallImages = _.get(listingDetails, 'images', []) || [];
  const featuredImageLocation =
    _.get(listingDetails, 'feature_image', []) || [];
  const carousalImages = [...featuredImageLocation, ...wallImages];
  const title = listingDetails.info.title.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter: string) => letter.toUpperCase()
  );

  const isMobile = useMobile();

  useEffect(() => {
    gtag('event', 'wall_view_per_visit', {
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [listingDetails]);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        {/* blur */}
        <Box
          sx={{
            width: '200px',
            height: '200px',
            backgroundColor: '#00C8C8',
            filter: 'blur(160px)',
            position: 'absolute',
            left: '50%',
            top: '1400px',
            zIndex: -100,
          }}
        />

        {/* blur */}
        <Box
          sx={{
            width: '268px',
            height: '268px',
            backgroundColor: '#B14EFF',
            filter: 'blur(160px)',
            position: 'absolute',
            right: '50%',
            top: '450px',
            zIndex: -100,
          }}
        />

        <Container
          maxWidth={false}
          sx={{
            position: 'relative',
            zIndex: 2,
            marginBottom: '400px',
          }}
        >
          <Grid container>
            {/* Featured Images Section */}
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Box sx={{ paddingTop: '9.125rem' }}>
                <FeaturedImagesSection
                  featureImage={carousalImages}
                  coordinates={coordinates}
                  createdAt={createdAt}
                />
              </Box>
            </Grid>

            {/* Wall Details Section */}
            <Container
              maxWidth={false}
              sx={{
                marginBottom: {
                  xs: 0,
                  sm: '6rem',
                },
                marginTop: '3.5rem',
              }}
            >
              <Grid
                container
                spacing={{ xs: 10, sm: 3, md: 4, lg: 4, xl: 4 }}
                sx={{ marginBottom: '1rem' }}
              >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexFlow: 'row nowrap',
                      flexDirection: {
                        sm: 'row',
                        xs: 'column',
                      },
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* top head */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        flexDirection: {
                          sm: 'column',
                          xs: 'column',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          alignItems: {
                            sm: 'start',
                            xs: 'start',
                          },
                          justifyContent: 'flex-start',
                          position: 'relative',
                          marginTop: {
                            md: 0,
                            xs: '40px',
                          },
                          flexDirection: {
                            sm: 'row',
                            xs: 'column',
                          },
                        }}
                      >
                        {/* title */}
                        <Box
                          sx={{
                            flex: '0 1 auto',
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: {
                              xs: '12px',
                              sm: '0',
                            },
                          }}
                        >
                          <Typography
                            className={classes.sectionHeading}
                            variant="h1"
                            sx={{
                              marginBottom: {
                                xs: '6px',
                                sm: '0',
                              },
                              display: 'inline-block',
                              background:
                                'linear-gradient(146deg, #D8D8D8 40.08%, #5700FF 135.15%)',
                              backgroundClip: 'text',
                              leadingTrim: 'both',
                              textEdge: 'cap',
                            }}
                          >
                            {title}
                          </Typography>
                        </Box>
                        {/* just listed */}
                        {!isDueDate(createdAt) || (
                          <Box
                            sx={{
                              marginLeft: '10px',
                              marginTop: '8px',
                            }}
                          >
                            <FeaturedImagesLabel text="Just listed" />
                          </Box>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: {
                            xs: 'column',
                            sm: 'row',
                          },
                          flexWrap: 'wrap',
                        }}
                      >
                        <Box
                          sx={{
                            flex: '0 1 auto',
                            padding: {
                              xs: '0 0 12px 0',
                              sm: '0 14px 0 0',
                            },
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={cloudflareImage(
                              'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame@2x.svg'
                            )}
                            sx={{
                              width: {
                                xs: '16px',
                                md: '24px',
                              },
                              height: {
                                xs: '16px',
                                md: '25px',
                              },
                              flex: '0 1 auto',
                            }}
                          />

                          <Typography
                            component="h2"
                            sx={{
                              color: '#D8D8D8',
                              fontFamily: 'Roboto',
                              fontSize: {
                                xs: '14px',
                                md: '22px',
                              },
                              fontWeight: '900',
                              fontStyle: 'normal',
                              flex: '0 1 auto',
                              padding: {
                                xs: '0 0 0 8px',
                                md: '0 0 0 12px',
                              },
                              letterSpacing: '3.52px',
                              fontVariant: 'all-small-caps',
                            }}
                          >
                            {address.city + ', ' + address.state}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: '0 1 auto',
                            padding: {
                              xs: '0 0 12px 0',
                              sm: '0 14px 0 0',
                            },
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={cloudflareImage(
                              'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame@2x.svg'
                            )}
                            sx={{
                              width: {
                                xs: '16px',
                                md: '24px',
                              },
                              height: {
                                xs: '16px',
                                md: '25px',
                              },
                              flex: '0 1 auto',
                            }}
                          />

                          <Typography
                            component="h2"
                            sx={{
                              color: '#D8D8D8',
                              fontFamily: 'Roboto',
                              fontSize: {
                                xs: '14px',
                                md: '22px',
                              },
                              fontWeight: '900',
                              fontStyle: 'normal',
                              flex: '0 1 auto',
                              padding: {
                                xs: '0 0 0 8px',
                                md: '0 0 0 12px',
                              },
                              letterSpacing: '3.52px',
                              fontVariant: 'all-small-caps',
                            }}
                          >
                            {'12 PROPOSALS'}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: '0 1 auto',
                            padding: {
                              xs: '0 0 12px 0',
                              sm: '0 14px 0 0',
                            },
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={cloudflareImage(
                              'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame@2x.svg'
                            )}
                            sx={{
                              width: {
                                xs: '16px',
                                md: '24px',
                              },
                              height: {
                                xs: '16px',
                                md: '25px',
                              },
                              flex: '0 1 auto',
                            }}
                          />

                          <Typography
                            component="h2"
                            sx={{
                              color: '#D8D8D8',
                              fontFamily: 'Roboto',
                              fontSize: {
                                xs: '14px',
                                md: '22px',
                              },
                              fontWeight: '900',
                              fontStyle: 'normal',
                              flex: '0 1 auto',
                              padding: {
                                xs: '0 0 0 8px',
                                md: '0 0 0 12px',
                              },
                              letterSpacing: '3.52px',
                              fontVariant: 'all-small-caps',
                            }}
                          >
                            {'OWNERS PROPOSED BUDGET: $13,150'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          color: '#D8D8D8',
                          fontFamily: 'Roboto',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '300',
                          lineHeight: 'normal',
                          fontVariant: 'all-small-caps',
                          letterSpacing: '2.24px',
                          marginBottom: {
                            xs: '6px',
                            sm: '0',
                          },
                          display: 'inline-block',
                        }}
                      >
                        listed: {formatDate(info.start_end_date)}
                      </Typography>
                      <Typography
                        variant="h1"
                        sx={{
                          color: '#D8D8D8',
                          fontFamily: 'Roboto',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '300',
                          lineHeight: 'normal',
                          fontVariant: 'all-small-caps',
                          letterSpacing: '2.24px',
                          marginBottom: {
                            xs: '6px',
                            sm: '0',
                          },
                          display: 'inline-block',
                        }}
                      >
                        closes in 12 days
                      </Typography>
                      <Typography
                        variant="h1"
                        sx={{
                          color: '#D8D8D8',
                          fontFamily: 'Roboto',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '300',
                          lineHeight: 'normal',
                          fontVariant: 'all-small-caps',
                          letterSpacing: '2.24px',
                          marginBottom: {
                            xs: '6px',
                            sm: '0',
                          },
                          display: 'inline-block',
                        }}
                      >
                        available: {formatDate(info.start_end_date)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={{ xs: 10, sm: 3, md: 4, lg: 4, xl: 4 }}
                className={classes.containerFull}
              >
                {/* <StickyElement> */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={8}
                  className={classes.containerSticky}
                >
                  <WallDetailsSection
                    dateDueDate={formatDate(info.start_end_date)}
                    title={info.title}
                    status={listingDetails.status}
                    location={address.city + ', ' + address.state}
                    dateListed={formatDate(createdAt)}
                    surfaceArea={info.size + ' sqft'}
                    totalProposal={undefined}
                    wallArea={`${info.height}H x ${info.width}L`}
                    brick={info.construction}
                    scope={info.location_of_wall}
                    direction={info.direction_face}
                    categoryBuilding={info.property_type}
                    colorscheme={colorscheme}
                    textDescription={info.description}
                    crypto={info.crypto}
                    amenities={amenities}
                    condition={info.condition}
                    textAdditionalInfo={info.additional_info}
                    artStyles={info.art_styles}
                    createdAt={createdAt}
                  />
                </Grid>
                {/* </StickyElement> */}

                {/* Submit Proposal Form Section */}
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                  {!isMobile ? (
                    <Box
                      sx={{
                        boxShadow:
                          'rgba(177, 78, 255, 0.70) 0px 0px 112px 11px',
                        borderRadius: '24px',
                      }}
                    >
                      <SubmitProposalDesktop />
                    </Box>
                  ) : (
                    <Box>
                      <SubmitProposalPopup />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Container>

        <Container
          maxWidth={false}
          sx={{
            marginBottom: {
              xs: '5rem',
              sm: '10rem',
              position: 'relative'
            },
          }}
        >
          <Box
              sx={{
                width: '1696px',
                height: '772px',
                filter: 'blur(240px)',
                position: 'absolute',
                left: '-50%',
                top: 0,
                transform: 'translateY(-50%)',
                zIndex: -100,
                borderRadius: '133px',
                background: 'linear-gradient(348deg, #40A4E2 9.01%, #B14EFF 90.87%)'
              }}
            />
          <LocationMapContainer
            bearing={-128.61}
            doubleClickZoom={false}
            dragPan={false}
            dragRotate={false}
            height="100%"
            keyboard={false}
            latitude={latitude}
            longitude={longitude}
            mapStyle="dark-v10"
            markerData={locationData([longitude, latitude])}
            pitch={55.01}
            scrollZoom={false}
            touchPitch={false}
            touchZoomRotate={false}
            width="100%"
            zoom={15.04}
          />
        </Container>

        {/* Process Section */}
        <Box
          sx={{
            zIndex: 1,
            paddingLeft: '145px',
            paddingRight: '145px'
          }}
        >
          {/* process section */}
          <Box
            sx={{
              paddingBottom: {
                xs: '1rem',
                sm: '5rem',
                md: '8rem',
                xl: '8rem',
                lg: '8rem',
                position: 'relative',
              },
            }}
          >
            {/* blur */}
            <Box
              sx={{
                width: '268px',
                height: '268px',
                backgroundColor: '#B14EFF',
                filter: 'blur(230px)',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: -100,
              }}
            />

            {/* blur */}
            <Box
              sx={{
                width: '268px',
                height: '268px',
                backgroundColor: '#00C8C8',
                filter: 'blur(180px)',
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: -100,
              }}
            />

            <Box
              sx={{
                marginBottom: {
                  xs: '5rem',
                  sm: '10rem',
                },
              }}
            >
              <ProcessSection
                processImageSrc={`${process.env.NEXT_PUBLIC_REACT_APP_S3_BASE_URL}/assets/mural+completed.svg`}
                subtitle="Streamline The Process"
                title="Why WXLLSPACE"
                description="Stop wasting precious time and energy pounding the streets. Browse the latest new mural commissions before they hit the open market. Connect directly with owners and decision-makers who control the space."
              />
            </Box>

            <Container
              maxWidth="xl"
              sx={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* <Typography
                component={'p'}
                sx={{
                  fontFamily: 'var(--font-family-montserrat)',
                  fontWeight: '400',
                  color: 'var(--white)',
                  fontSize: '22px',
                  margin: 0,
                }}
              >
                send your proposal!
              </Typography> */}

              <Typography
                component={'h2'}
                sx={{
                  fontFamily: 'var(--font-family-formulacondensed)',
                  fontWeight: '700',
                  color: '#F1F0F0',
                  fontSize: '50px',
                  marginBottom: '56px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                take a look at other Walls Available
              </Typography>

              <Box sx={{ margin: '0 -18px' }}>
                <WallSlider otherWalls={otherWalls} />
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const ConnectedWallScreen = (props: any) => {
  const { listingDetails, otherWalls } = props;

  localStorage.setItem('listingDetails', JSON.stringify(listingDetails));
  const dispatch = useDispatch();

  dispatch({
    type: WALL_GET_DETAILS_SUCCESS,
    payload: listingDetails,
  });

  return <Wall listingDetails={listingDetails} otherWalls={otherWalls} />;
};

export default ConnectedWallScreen;
