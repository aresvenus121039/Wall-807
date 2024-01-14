import React, { useRef } from 'react';
import Link from 'next/link';
import _ from 'lodash';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import { RightArrowIcon, LeftArrowIcon } from '../icons/index';
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from '@mui/core/ButtonUnstyled';
import { Box, CardMedia, Typography, Grid } from '@mui/material';
import { cloudflareImage } from '@/utility/images';
import { makeStyles } from '@mui/styles';
import { Right_square } from './../icons/index';

const useStyles = makeStyles((theme: any) => ({
  wrapGrid: {
    '&:hover div': {
      opacity: 1,
    },
  },
}));

const CustomButtonRoot = styled('button')(`
  background: transparent;
  backdrop-filter: blur(50px);
  padding: 12px;
  border-radius: 100px;
  border: 1px solid white;
  color: #fff;
  font-weight: 600;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  width: 60px;
  height: 60px;

  &:hover {
    background-color: rgba(220, 220, 220, 0.5);
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`);

function NextArrowButton(props: any) {
  return (
    <ButtonUnstyled {...props} component={CustomButtonRoot}>
      <RightArrowIcon />
    </ButtonUnstyled>
  );
}
function PrevArrowButton(props: any) {
  return (
    <ButtonUnstyled {...props} component={CustomButtonRoot}>
      <LeftArrowIcon />
    </ButtonUnstyled>
  );
}

const WallImagesCard = ({ wallInfo }: { wallInfo: Record<string, any> }) => {
  const images = _.get(wallInfo, 'images', []) || [];
  const info = _.get(wallInfo, 'info', {}) || {};
  const address = _.get(wallInfo, 'address', {}) || {};
  const slug = _.get(wallInfo, 'slug', {}) || {};
  const classes = useStyles();

  return (
    <Box
      sx={{
        margin: '0 18px',
        borderRadius: '40px 40px 16px 16px',
        background: 'rgba(255, 255, 255, 0.10)',
        padding: '16px',
        position: 'relative'
      }}
      className={classes.wrapGrid}
    >
      <Link href={`/wall/${slug}`}
        style={{textDecoration: 'none'}}
      >
      <CardMedia
        component="img"
        image={images.length > 0 ? cloudflareImage(images[0].location) : ''}
        sx={{
          height: '425px',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: '20px',
          marginBottom: '14px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: '0.5s',
        }}
      >
        <Right_square />
      </Box>
      
      <Box
        sx={{
          padding: '8px',
          borderRadius: '8px',
          background: 'rgba(100, 225, 220, 0.06)',
          backdropFilter: 'blur(30px)',
          marginBottom: '10px',
          display: 'inline-flex',
        }}
      >
        <Typography
          component={'p'}
          sx={{
            color: '#64E1DC',
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: 'Roboto',
            lineHeight: '14px',
          }}
        >
          {info?.offered ? `$${info.offered} - Proposed Budget` : ''}
        </Typography>
      </Box>
      <Typography
        component={'h3'}
        sx={{
          fontFamily: 'var(--font-family-formulacondensed)',
          color: '#F1F0F0',
          fontSize: '40px',
          fontWeight: 700,
          letterSpacing: '1.6px',
          lineHeight: '48px',
        }}
      >
        {info.title}
      </Typography>
      <Grid container columnSpacing={2}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            component="img"
            image="https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame-5@2x.svg"
            sx={{
              width: '12px',
              height: '12px',
              color: 'A6A6A6',
            }}
          />

          <Typography
            component="p"
            sx={{
              paddingLeft: '6px',
              color: '#A6A6A6',
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: 'Roboto',
              lineHeight: '25px',
            }}
          >
            {address.city}
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            component="img"
            image="https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/frame-2@2x.svg"
            sx={{
              width: '12px',
              height: '12px',
              color: 'A6A6A6',
            }}
          />

          <Typography
            component="p"
            sx={{
              paddingLeft: '6px',
              color: '#A6A6A6',
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: 'Roboto',
              lineHeight: '25px',
            }}
          >
            {info.size + ' sqft'}
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            component="img"
            image="https://cdn.animaapp.com/projects/6183b51d6b5cbed22d564e6f/releases/6188bbd34b232d685f2fbe96/img/full-screen-2@2x.svg"
            sx={{
              width: '12px',
              height: '12px',
              color: 'A6A6A6',
            }}
          />

          <Typography
            component="p"
            sx={{
              paddingLeft: '6px',
              color: '#A6A6A6',
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: 'Roboto',
              lineHeight: '25px',
            }}
          >
            {`${info.height}H x ${info.width}L`}
          </Typography>
        </Grid>
      </Grid>
      </Link>
    </Box>
  );
};

interface WallSliderProps {
  otherWalls: Array<Record<string, any>>;
}

const WallSlider: React.FC<WallSliderProps> = ({ otherWalls }) => {
  const sliderRef = useRef<Slider | null>(null);

  function next() {
    sliderRef.current?.slickNext();
    console.log('Position =?', sliderRef.current);
  }

  function previous() {
    sliderRef.current?.slickPrev();
  }

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const imageLength = otherWalls.length;

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {otherWalls.map((wall, i) => (
          <WallImagesCard key={i} wallInfo={wall} />
        ))}
      </Slider>
      {imageLength > 1 && (
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            top: '50px',
            right: '24px',
            gap: '24px',
            '@media(max-width: 425px)': {
              top: '170px',
              right: '31%',
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 10,
            }}
          >
            <PrevArrowButton onClick={() => previous()} />
          </Box>
          <Box
            sx={{
              position: 'relative',
              zIndex: 10,
            }}
          >
            <NextArrowButton onClick={() => next()} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WallSlider;
