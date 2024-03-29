import React, { useRef } from 'react';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import { RightArrowIcon, LeftArrowIcon } from './../icons/index';
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from '@mui/core/ButtonUnstyled';
import { Box, Button, CardMedia } from '@mui/material';
import { cloudflareImage } from '@/utility/images';

const CustomButtonRoot = styled('button')(`
background: transparent;
backdrop-filter: blur(50px);
  padding: 12px;
  border-radius: 100px;
  color: #fff;
  font-weight: 600;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: 1px solid white;
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

const FeaturedImagesCard = (props: any) => {
  const { styleWrap, styleImage, featuredImageSrc } = props;
  return (
    <Box
      sx={{
        ...styleWrap,
      }}
    >
      <CardMedia
        component="img"
        image={cloudflareImage(featuredImageSrc)}
        sx={{
          ...styleImage,
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'center',
          height: {
            xs: '277px',
            sm: '453px',
            md: '462px',
            xl: '600px',
          },
        }}
      />
    </Box>
  );
};

interface FeaturedSliderCardProps {
  image: { location: string }[];
}

const FeaturedSliderCard: React.FC<FeaturedSliderCardProps> = ({ image }) => {
  const sliderRef = useRef<Slider>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imageLength = image.length;

  return (
    <Box
      sx={{
        // maxWidth: '1440px',
        width: '100%',
        margin: 'auto',
        position: 'relative'
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {image.map((item, i) => (
          <FeaturedImagesCard
            featuredImageSrc={item.location}
            key={i}
            styleWrap={{
              width: '100%',
            }}
            styleImage={{
              borderRadius: {
                lg: '16px',
                xs: '8px',
              },
            }}
            textLabel={false}
          />
        ))}
      </Slider>
      <Box
          sx={{
            position: 'absolute',
            left: '23px',
            bottom: '22px'
          }}
        >
          <Button
            sx={{
              padding: '18px 48px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#9f63b0',
              color: '#FFF',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: '900',
              lineHeight: '22px',
              fontVariant: 'all-small-caps',
              letterSpacing: '2.56px'
            }}
          >
            DOWNLOAD IMAGE
          </Button>
        </Box>
      {imageLength > 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            right: '23px',
            bottom: '22px',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              zIndex: 10,
            }}
          >
            <PrevArrowButton onClick={previous} />
          </Box>
          <Box
            sx={{
              zIndex: 10,
            }}
          >
            <NextArrowButton onClick={next} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FeaturedSliderCard;
