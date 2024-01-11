import * as React from 'react';
import styled, { css } from 'styled-components';
import { makeStyles } from '@mui/styles';
import { getRichDescription } from '@/utility/getRichDescription';

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`;

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

const Title = styled.h3`
  ${ValignTextMiddle}
  ${MontserratBoldWhite16px}
  width: 89px;
  height: 25px;
  letter-spacing: 0;
  line-height: 1;
  white-space: nowrap;
  font-size: 18.72px;
`;

const useStyles = makeStyles((theme: any) => ({
  description: {
    fontSize: 'var(--font-size-m)',
    [theme.breakpoints.only('xs')]: {
      letterSpacing: '0',
      lineHeight: '28.8px',
      color: 'var(--white)',
      fontFamily: 'var(--font-family-montserrat)',
      fontSize: '16px',
      fontWeight: 400,
      fontStyle: 'normal',
      marginTop: '14px',
    },
    [theme.breakpoints.only('sm')]: {
      letterSpacing: '0',
      lineHeight: '28.8px',
      color: 'var(--white)',
      fontFamily: 'var(--font-family-montserrat)',
      fontSize: '16px',
      fontWeight: 400,
      fontStyle: 'normal',
      marginTop: '14px',
    },
    [theme.breakpoints.only('md')]: {
      letterSpacing: '0',
      lineHeight: '28.8px',
      color: 'var(--white)',
      fontFamily: 'var(--font-family-montserrat)',
      fontWeight: 400,
      fontStyle: 'normal',
      marginTop: '10px',
    },
    [theme.breakpoints.only('lg')]: {
      width: '100%',
      marginTop: '10px',
      fontFamily: 'var(--font-family-montserrat)',
      fontWeight: 400,
      color: 'var(--iron)',
      letterSpacing: '0',
      lineHeight: '30.8px',
      marginBottom: '-5px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    [theme.breakpoints.only('xl')]: {
      width: '100%',
      marginTop: '10px',
      fontFamily: 'var(--font-family-montserrat)',
      fontWeight: 400,
      color: 'var(--iron)',
      letterSpacing: '0',
      lineHeight: '30.8px',
      marginBottom: '-5px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
}));

interface ArtistBioProps {
  children: string;
}

const ArtistBio: React.FC<ArtistBioProps> = (props) => {
  const classes = useStyles();

  return (
    <Root>
      <Title>Biography</Title>
      <div
        className={classes.description}
        dangerouslySetInnerHTML={{ __html: getRichDescription(props.children) }}
      />
    </Root>
  );
};

export default ArtistBio;
