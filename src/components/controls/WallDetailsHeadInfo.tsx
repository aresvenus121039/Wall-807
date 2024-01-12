import React from 'react';
import { Box, Grid, CardMedia, Typography } from '@mui/material';
import FeaturedImagesLabel from './FeaturedImagesLabel';
import { isDueDate } from '@/utility';
import { cloudflareImage } from '@/utility/images';

interface WallDetailsHeadInfoProps {
  styleWrap?: React.CSSProperties | any;
  textDescription?: string;
  textLocation?: string;
  textListed?: string;
  textTotalProposal?: string;
  createdAt?: string;
  textDueDate?: string;
  wallId?: any;
  richDescription?: any;
}

const WallDetailsHeadInfo: React.FC<WallDetailsHeadInfoProps> = (props) => {
  const {
    styleWrap,
    textDescription,
    textLocation,
    textListed,
    textTotalProposal,
    createdAt,
    textDueDate,
  } = props;
  return (
    <Box
      sx={{
        ...styleWrap,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '6rem',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            mt: 2,
          }}
        >
          <Typography
            paragraph={true}
            sx={{
              color: '#D8D8D8',
              fontFamily: 'Roboto',
              fontSize: {
                xs: '12px',
                md: '14px',
              },
              fontWeight: '300',
              fontStyle: 'normal',
              lineHeight: '24px',
              alignSelf: 'stretch',
            }}
          >
            {textDescription}
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          flexWrap: 'wrap',
          mt: 2,
        }}
      >
        {/* {textTotalProposal && (
          <Box
            sx={{
              flex: '0 1 auto',
              padding: {
                xs: '0 0 12px 0',
                sm: '0 14px 0 14px',
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
                'https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame-6@2x.svg'
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
              component="h4"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'var(--font-family-montserrat)',
                fontSize: {
                  xs: '12px',
                  md: '20px',
                },
                fontWeight: '600',
                fontStyle: 'normal',
                flex: '0 1 auto',
                padding: {
                  xs: '0 0 0 8px',
                  md: '0 0 0 12px',
                },
              }}
            >
              Proposals Sent : {textTotalProposal}
            </Typography>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default WallDetailsHeadInfo;
