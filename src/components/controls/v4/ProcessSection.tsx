import React from 'react';
import { Container, Box, Grid, Typography, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProcessTextIcon from './ProcessTextIcon';
import { cloudflareImage } from '@/utility/images';

const useStyles = makeStyles((theme: any) => ({
  sectionHeading: {
    fontSize: '50px',
    fontWeight: 700,
    fontFamily: 'var(--font-family-formulacondensed)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'white',
  },
}));

interface ProcessSectionProps {
  processImageSrc: string;
  subtitle: string;
  title: string;
  description: string;
}

const ProcessSection: React.FC<ProcessSectionProps> = (props) => {
  const classes = useStyles();
  const { processImageSrc, subtitle, title, description } = props;

  const processData = [
    {
      icon: 'https://anima-uploads.s3.amazonaws.com/projects/6183b51d6b5cbed22d564e6f/releases/6188834677e5a840e6864d1a/img/frame-3@2x.svg?v=1636337334455',
      title: 'Insurance',
      description:
        'Must have coverage that protects you from unforeseen circumstances and provides peace of mind knowing your assets are secure, no matter what happens!',
    },
    {
      icon: 'https://anima-uploads.s3.amazonaws.com/projects/6183b51d6b5cbed22d564e6f/releases/6188834677e5a840e6864d1a/img/frame@2x.svg?v=1636337334453',
      title: 'Media',
      description:
        'Producing captivating, action-packed footage for all your social media content.',
    },
    {
      icon: 'https://anima-uploads.s3.amazonaws.com/projects/6183b51d6b5cbed22d564e6f/releases/6188834677e5a840e6864d1a/img/frame-2@2x.svg?v=1636337334455',
      title: 'Legal Documents',
      description:
        'Protecting your intellectual property and time. All smart contracts on the blockchain.',
    },
    {
      icon: 'https://anima-uploads.s3.amazonaws.com/projects/6183b51d6b5cbed22d564e6f/releases/6188834677e5a840e6864d1a/img/frame-1@2x.svg?v=1636337334454',
      title: 'Time Saving',
      description:
        'RFQ’s are endless and time consuming. Fill out a proposal in 60 seconds or less.',
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box>
        {/* subtitle */}
        <Box
          sx={{
            fontFamily: 'var(--font-family-montserrat)',
            fontWeight: '400',
            color: 'var(--white)',
            fontSize: {
              xs: '16px',
              sm: '22px',
            },
            textTransform: 'lowercase',
            marginBottom: '12px',
          }}
        >
          {subtitle}
        </Box>

        {/* title */}
        <Box
          className={classes.sectionHeading}
          sx={{
            marginBottom: '20px',
          }}
        >
          {title}
        </Box>

        {/* description */}
        <Typography
          component={'p'}
          sx={{
            fontFamily: 'var(--font-family-montserrat)',
            fontWeight: '400',
            color: 'var(--white)',
            fontSize: {
              xs: '14px',
              md: '16px',
            },
            lineHeight: '24px',
            marginBottom: '48px',
            width: '75%',
          }}
        >
          {description}
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {processData.map((item, i) => (
            <Grid item xs={12} md={6} key={i}>
              <ProcessTextIcon
                iconImageSrc={cloudflareImage(item.icon)}
                title={item.title}
                description={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProcessSection;
