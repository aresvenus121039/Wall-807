import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import styled, { css } from 'styled-components';
import { useInput } from '@mui/core/';
import { styled as muiStyled } from '@mui/system';
import { WxllspaceFullLogo } from '../icons';
import { WxllspaceBlackLogo, WxllspaceColorLogo } from '../icons';
import { submitSubscription } from '@/store/actions/subscriptionActions';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { selectSubscriptionDetails } from '@/store/reducers/subscriptionReducer';
import { REQUEST_STATUS } from '@/constants/requestStatusConstants';
import * as Yup from 'yup';
import Link from 'next/link';
import useVersinInfo from '@/hooks/useVersionInfo';
import Footer from './v4/Footer';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required field.').nullable(),
  email: Yup.string().email().required('Email is required field').nullable(),
});

interface ProxyComponentProps {
  hideFooterOn?: boolean;
}

interface FullNameTextFieldProps {
  name: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // This line is for any other props that might be passed to FullNameTextField
}

interface EmailTextFieldProps {
  email: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // This line is for any other props that might be passed to EmailTextField
}

interface SendButtonProps {
  errors: any;
  handleSubscription: () => void;
  [key: string]: any; // This line is for any other props that might be passed to SendButton
}

interface SocialMediaLinkProps {
  href: string;
  [key: string]: any; // This line is for any other props that might be passed to SocialMediaLink
}

interface FooterLinkProps {
  href?: string;
  to?: string;
  [key: string]: any; // This line is for any other props that might be passed to FooterLink
}

interface ChildrenProps {
  children: React.ReactNode;
  [key: string]: any; // This line is for any other props that might be passed to ChildrenProps
}

const ProxyComponent = ({ hideFooterOn = false }: ProxyComponentProps) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState([]);
  const dispatch = useDispatch();
  const theme = useTheme();
  const largerThanSm = useMediaQuery(theme.breakpoints.up('md'));
  const smallerThanSm = useMediaQuery(theme.breakpoints.down('md'));

  const isV4 = useVersinInfo();

  if (hideFooterOn) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscription = () => {
    validationSchema.isValid({ name, email }).then((isValid) => {
      if (isValid) {
        const values = { name, email };
        dispatch(submitSubscription(values));
        setName('');
        setEmail('');
        setErrors([]);
      } else {
        validationSchema.validate({ name, email }).catch(function (error) {
          setErrors(error.errors);
        });
      }
    });
  };

  if (isV4) {
    return <Footer />;
  }

  if (largerThanSm) {
    return <LargeFooter />;
  }

  if (smallerThanSm) {
    return <SmallFooter />;
  }

  return null;
};

function LargeFooter() {
  const classes = useStyles();
  return (
    <Footer1>
      <FlexRow>
        <FlexCol>
          <WxllspaceColorLogo />

          <SocialMediaLinks>
            <Box
              sx={{
                marginBottom: '20px',
                justifyContent: 'space-between !important',
                display: 'flex',
              }}
            >
              <IconButton
                aria-label="WXLLSPACE Twitter"
                size="small"
                className={classes.socialButtons}
              >
                <a
                  style={{ color: '#FFF' }}
                  href="https://twitter.com/WXLLSPACE"
                >
                  <TwitterIcon className={classes.socialIcon} />
                </a>
              </IconButton>

              <IconButton
                aria-label="WXLLSPACE Facebook"
                className={classes.socialButtons}
                size="small"
              >
                <a
                  style={{ color: '#FFF' }}
                  href="https://www.facebook.com/wxllspace"
                >
                  <FacebookIcon className={classes.socialIcon} />
                </a>
              </IconButton>

              <IconButton
                aria-label="WXLLSPACE Instagram"
                className={classes.socialButtons}
                size="small"
              >
                <a
                  style={{ color: '#FFF' }}
                  href="https://www.instagram.com/wxll.space/"
                >
                  <InstagramIcon className={classes.socialIcon} />
                </a>
              </IconButton>

              <IconButton
                aria-label="WXLLSPACE LinkedIn"
                className={classes.socialButtons}
                size="small"
              >
                <a
                  style={{ color: '#FFF' }}
                  href="https://www.linkedin.com/company/wxllspace"
                >
                  <LinkedInIcon className={classes.socialIcon} />
                </a>
              </IconButton>
            </Box>
          </SocialMediaLinks>

          {/* <Box
            sx={{
              mt: '30px',
            }}
          >
            <ProductHuntBadgeContainer>
              <a
                href="https://www.producthunt.com/posts/wxllspace?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-wxllspace"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=290024&theme=dark"
                  alt="WXLLSPACE - Marketplace platform connecting muralists to wall-space | Product Hunt"
                  width="250"
                  height="54"
                />
              </a>
            </ProductHuntBadgeContainer>
          </Box> */}

          <Box
            sx={{
              pt: '20px',
            }}
          >
            <iframe
              src="https://wxllspace.instatus.com/embed-status/dark-sm"
              width={230}
              height={61}
              frameBorder="0"
              scrolling="no"
              style={{ border: 'none' }}
            ></iframe>
          </Box>
        </FlexCol>

        {/* explore */}
        <Box
          sx={{
            maxWidth: '150px',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifySelf: 'center',
          }}
        >
          <ColumnHeading>explore</ColumnHeading>
          {/* <FooterLink href="https://wxllspace.com/community">
            Community
          </FooterLink> */}
          <FooterLink href="http://wxllspace.com/podcast">Podcast</FooterLink>
          <FooterLink href="https://wxllspace.com/change-log">
            Change-log
          </FooterLink>
          <FooterLink href="https://wxllspace.com/press-kit">
            Press Kit
          </FooterLink>
          <FooterLink href="http://wxllspace.com/feedback">Feedback</FooterLink>
          <FooterLink href="http://wxllspace.com/discord">Discord</FooterLink>
          <FooterLink href="https://www.youtube.com/channel/UCdz82hoeqlI2E4Wg934AVtg">
            Youtube Channel
          </FooterLink>
        </Box>

        {/* Learn more */}
        <Box
          sx={{
            maxWidth: '150px',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <ColumnHeading>Learn More</ColumnHeading>
          <FooterLink
            href={
              window.location.host === 'wxllspace.com'
                ? 'https://wxllspace.com/about'
                : 'https://staging.wxllspace.com/about'
            }
          >
            mission
          </FooterLink>
          <FooterLink
            href={
              window.location.host === 'wxllspace.com'
                ? 'https://wxllspace.com/real-estate'
                : 'https://staging.wxllspace.com/real-esate'
            }
          >
            real estate
          </FooterLink>
          <FooterLink
            href={
              window.location.host === 'wxllspace.com'
                ? 'https://wxllspace.com/creatives'
                : 'https://staging.wxllspace.com/creatives'
            }
          >
            creatives
          </FooterLink>
          <FooterLink to="/marketplace">marketplace</FooterLink>
        </Box>
        {/* support */}
        <Box
          sx={{
            maxWidth: '150px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ColumnHeading>support</ColumnHeading>
          <FooterLink href="/privacy-policy">privacy policy</FooterLink>
          <FooterLink href="/cookies-policy">cookies policy</FooterLink>
          <FooterLink to="/contact">contact</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink href="https://wxllspace.instatus.com/">status</FooterLink>
          <FooterLink href="/terms-of-use">Terms & Conditions</FooterLink>
        </Box>

        {/* get in touch */}
        {/* <Box
          sx={{
            marginLeft: '32px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ColumnHeading>get in touch</ColumnHeading>
          <Text1>
            Curious about where we’re heading? Introduce yourself here 👇🏼
          </Text1>
          <OverlapGroup>
            <FullNameTextField {...rest} />
            <EmailTextField {...props} />
            <SendButton {...props} />
          </OverlapGroup>
        </Box> */}
      </FlexRow>

      <CopyrightContainer>
        <CopyrightText>
          Designed in Denver Copyright © 2022 WXLLSPACE 🚀 All Rights Reserved.
        </CopyrightText>
      </CopyrightContainer>
    </Footer1>
  );
}

export const ValignTextMiddle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MontserratNormalIron14px = css`
  color: var(--iron);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-m);
  font-weight: 400;
  font-style: normal;
`;

export const MontserratLightIron14px = css`
  color: var(--iron);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-m);
  font-weight: 300;
  font-style: normal;
`;

export const MontserratExtraBoldWhite18px = css`
  color: var(--white);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-xl);
  font-weight: 800;
  font-style: normal;
`;

export const MontserratLightWhite14px = css`
  color: var(--white);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-m);
  font-weight: 300;
  font-style: normal;
`;

export const MontserratLightWhite16px = css`
  color: var(--white);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-l);
  font-weight: 300;
  font-style: normal;
`;

export const Border1pxWhite2 = css`
  border: 1px solid var(--white);
`;

const StyledFullNameInputElement = muiStyled('input')(`
  ${Border1pxWhite2}
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 266px;
  border-radius: 8px;
  font-weight: 500;
  width: 100%;
  line-height: 1.4375em;
  background: transparent;
  transition: width 300ms ease;
  white-space: nowrap;
  letter-spacing: 0;
  padding: 1em;

  ${MontserratLightWhite14px}

  &:focus {
    outline: none;
    width: 100%;
    transition: width 200ms ease-out;
  }
`);

const FullNameCustomInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(function CustomInput(props, ref) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div {...getRootProps()}>
      <StyledFullNameInputElement {...props} {...getInputProps()} />
    </div>
  );
});

export const FullNameTextField: React.FC<FullNameTextFieldProps> = (props) => {
  const { name, handleNameChange, ...rest } = props;

  return (
    <FullNameCustomInput
      disabled={false}
      aria-label="Full Name"
      placeholder="Full Name"
      {...rest}
      onChange={handleNameChange}
      value={name}
      name="name"
    />
  );
};

const StyledEmailInputElement = muiStyled('input')(`
  ${Border1pxWhite2}
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 266px;
  border-radius: 8px;
  font-weight: 500;
  width: 100%;
  line-height: 1.4375em;
  background: transparent;
  transition: width 300ms ease;
  white-space: nowrap;
  letter-spacing: 0;
  padding: 1em;
  margin-top: 20px;

  ${MontserratLightWhite14px}

  &:focus {
    outline: none;
    width: 100%;
    transition: width 200ms ease-out;
  }
`);

const EmailCustomInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(function CustomInput(props, ref) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div {...getRootProps()}>
      <StyledEmailInputElement {...props} {...getInputProps()} />
    </div>
  );
});

export const EmailTextField: React.FC<EmailTextFieldProps> = (props) => {
  const { email, handleEmailChange } = props;

  return (
    <>
      <EmailCustomInput
        disabled={false}
        aria-label="Email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
        name="email"
      />
    </>
  );
};

export const SendButton: React.FC<SendButtonProps> = (props) => {
  const subscriptionDetails = useSelector(selectSubscriptionDetails);
  const { errors, handleSubscription } = props;
  return (
    <>
      <Submit>
        <TelegramIcon
          sx={{ color: '#0e1b41', cursor: 'pointer' }}
          onClick={handleSubscription}
        />
      </Submit>
      {errors && errors[0] && (
        <Typography
          sx={{
            marginTop: '-10px',
            color: 'red',
            padding: '0 20px',
            fontSize: '14px',
            textAlign: 'left',
            width: '100%',
          }}
        >
          {errors[0]}
        </Typography>
      )}
      {subscriptionDetails.status === REQUEST_STATUS.FAILED && (
        <Typography
          sx={{
            marginTop: '-10px',
            color: 'red',
            padding: '0 20px',
            fontSize: '14px',
            textAlign: 'left',
            width: '100%',
          }}
        >
          {subscriptionDetails.error}
        </Typography>
      )}
      {subscriptionDetails.status === REQUEST_STATUS.SUCCEEDED && (
        <Typography
          sx={{
            marginTop: '-10px',
            color: 'green',
            padding: '0 20px',
            fontSize: '14px',
            textAlign: 'left',
            width: '100%',
          }}
        >
          Your are subscribed to our Newsletter.
        </Typography>
      )}
    </>
  );
};

const Footer1 = (props: ChildrenProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '520px',
        backgroundColor: 'transparent',
      }}
    >
      {props.children}
    </Box>
  );
};

const FlexRow = (props: ChildrenProps) => {
  return (
    <Box
      sx={{
        height: '282px',
        marginTop: '81px',
        display: 'flex',
        alignItems: 'flex-start',
        width: {
          md: '90vw',
          lg: '95vw',
          xl: '70vw',
        },
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {props.children}
    </Box>
  );
};
const FlexCol = styled.div`
  width: 214px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 178px;
  flex-grow: 1;
`;

const SocialMediaLinks = styled.div`
  width: 194px;
  height: 37px;
  margin-top: 31px;
  margin-left: 0;
`;

const ColumnHeading = (props: ChildrenProps) => {
  return (
    <Box
      sx={{
        height: '22px',
        letterSpacing: 0,
        marginBottom: '1rem',
        color: 'var(--white)',
        fontFamily: 'var(--font-family-montserrat)',
        fontSize: 'var(--font-size-xl)',
        fontWeight: 800,
        fontStyle: 'normal',
        textTransform: 'capitalize',
      }}
    >
      {props.children}
    </Box>
  );
};

const SocialMediaLink = (props: SocialMediaLinkProps) => {
  return <a href={props.href}>{props.children}</a>;
};

const FooterLink = (props: FooterLinkProps) => {
  const classes = useStyles();

  return (
    <>
      {props.to && (
        <Link href={props.to} className={classes.footerLink}>
          {props.children}
        </Link>
      )}
      {props.href && (
        <a href={props.href} className={classes.footerLink}>
          {props.children}
        </a>
      )}
    </>
  );
};

const Submit = styled.div`
  ${Border1pxWhite2}
  height: 30.85px;
  display: flex;
  padding: 3.9px 4.4px;
  align-items: center;
  justify-content: center;
  min-width: 30.85px;
  background-color: var(--white);
  border-radius: 4px;
  position: relative;
  left: 108px;
  top: -41px;
`;

const CopyrightContainer = styled.div`
  height: 82px;
  margin-top: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--white-3);
`;

const CopyrightText = styled.p`
  ${ValignTextMiddle}
  ${MontserratLightWhite16px}
  text-align: center;
  letter-spacing: 0;
  line-height: 1.5;
`;

/* mobile */
const SmallFooter = () => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* blur */}
      <Box
        sx={{
          width: '268px',
          height: '268px',
          backgroundColor: '#00C8C8',
          filter: 'blur(180px)',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      ></Box>

      <Grid
        container
        spacing={2}
        sx={{
          padding: '1rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* logo */}
        <Grid item xs={12}>
          <Box
            sx={{
              marginBottom: {
                xs: '2rem',
              },
            }}
          >
            <FlexCol>
              <WxllspaceColorLogo />
              <SocialMediaLinks>
                <Box
                  sx={{
                    marginBottom: '20px',
                    justifyContent: 'space-between',
                    display: 'flex',
                  }}
                >
                  <SocialMediaLink href="https://twitter.com/WXLLSPACE">
                    <IconButton
                      aria-label="WXLLSPACE Twitter"
                      size="small"
                      className={classes.socialButtons}
                    >
                      <TwitterIcon className={classes.socialIcon} />
                    </IconButton>
                  </SocialMediaLink>

                  <SocialMediaLink href="https://www.facebook.com/wxllspace">
                    <IconButton
                      aria-label="WXLLSPACE Facebook"
                      className={classes.socialButtons}
                      size="small"
                    >
                      <FacebookIcon className={classes.socialIcon} />
                    </IconButton>
                  </SocialMediaLink>

                  <SocialMediaLink href="https://www.instagram.com/wxll.space/">
                    <IconButton
                      aria-label="WXLLSPACE Instagram"
                      className={classes.socialButtons}
                      size="small"
                    >
                      <InstagramIcon className={classes.socialIcon} />
                    </IconButton>
                  </SocialMediaLink>

                  <SocialMediaLink href="https://www.linkedin.com/company/wxllspace">
                    <IconButton
                      aria-label="WXLLSPACE LinkedIn"
                      className={classes.socialButtons}
                      size="small"
                    >
                      <LinkedInIcon className={classes.socialIcon} />
                    </IconButton>
                  </SocialMediaLink>
                </Box>
              </SocialMediaLinks>

              <Box
                sx={{
                  marginTop: '25px',
                }}
              >
                <iframe
                  src="https://wxllspace.instatus.com/embed-status/dark-sm"
                  width={270}
                  height={61}
                  frameBorder="0"
                  scrolling="no"
                  style={{ border: 'none' }}
                ></iframe>
              </Box>
            </FlexCol>
          </Box>
        </Grid>

        {/* quick link */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {/* explorer */}
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ColumnHeading>Explore</ColumnHeading>
              <FooterLink href="https://wxllspace.com/community">
                Community
              </FooterLink>
              <FooterLink to="http://wxllspace.com/podcast">Podcast</FooterLink>
              <FooterLink to="https://wxllspace.com/change-log">
                Change-log
              </FooterLink>
              <FooterLink href="https://wxllspace.instatus.com">
                Status
              </FooterLink>
              <FooterLink to="https://wxllspace.com/press-kit">
                Press Kit
              </FooterLink>
              <FooterLink to="http://wxllspace.com/feedback">
                Feedback
              </FooterLink>
              <FooterLink to="http://wxllspace.com/discord">Discord</FooterLink>
              <FooterLink to="/artist-search">Artist Search</FooterLink>
              <FooterLink href="https://www.youtube.com/channel/UCdz82hoeqlI2E4Wg934AVtg">
                youtube channel
              </FooterLink>
            </Box>

            {/* learn more */}
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ColumnHeading>Learn More</ColumnHeading>
              <FooterLink to="/about">Mission</FooterLink>
              <FooterLink to="/creatives">Creatives</FooterLink>
              <FooterLink to="/real-estate">Real Estate</FooterLink>
            </Box>

            {/* support */}
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                mt: '20px',
              }}
            >
              <ColumnHeading>Support</ColumnHeading>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/cookies-policy">Cookies Policy</FooterLink>
              <FooterLink to="/terms-of-use">Terms & Conditions</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <CopyrightContainer>
        <CopyrightText>
          Designed in Denver Copyright © 2022 WXLLSPACE 🚀 All Rights Reserved.
        </CopyrightText>
      </CopyrightContainer>
    </Box>
  );
};

export default ProxyComponent;
