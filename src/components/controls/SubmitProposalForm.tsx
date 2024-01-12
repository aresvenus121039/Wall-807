import React, {
  useState,
  useEffect,
  MouseEventHandler,
  FormEvent,
} from 'react';
import { Box, Grid, CardMedia, Typography, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Formik, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { cloudflareImage } from '@/utility/images';

import TotalProposedBudget from './TotalProposedBudget';
import UndecidedProposedBudget from './UndecidedProposedBudget';
import TotalEstimatedCost from './TotalEstimatedCost';
import ControlledInputUpload from '@/components/controls/ControlledInputUpload';
import ControlledInputTextField from '@/components/controls/ControlledInputTextField';
import InputSlider from '@/components/controls/ControlledInputSlider';

import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { selectListingDetails } from '@/store/reducers/listingReducers';
import {
  selectProposalDetails,
  REQUEST_STATUS,
} from '@/store/reducers/proposalReducers';
import { submitProposal } from '@/store/actions/proposalActions';

import {
  PRICE_PER_SQUARE_FEET_REQUIRED,
  DATE_REQUIRED,
  TRAVEL_COSTS,
} from '@/constants/errorMessage';
import {
  DEFAULT_SLIDER_MARKS,
  DEFAULT_SLIDER_MAX_VALUE,
  DEFAULT_SLIDER_MIN_VALUE,
  ARTIST_SLIDER_MIN_VALUE,
  ARTIST_SLIDER_MAX_VALUE,
  DEFAULT_SLIDER_ARTIST,
} from '@/constants/commonConstants';
import { USER_TYPE } from '@/constants/userConstants';
import useAuthInfo from '@/hooks/useAuthInfo';
import moment from 'moment';

interface FormValues {
  startDate: Date | null;
  endDate: Date | null;
  requiredLift: boolean | null;
  pricePerSqft: number | null;
  artistFee: number | null;
  hotelCharges: number | null;
  travelCost: number | null;
  paintAndMaterialCost: number | null;
  notes: string | null;
  proposalImage: any[];
}

interface SectionHeadingProps {
  children: React.ReactNode;
}

interface ProposalDetails {
  status: string;
  error: string;
}

interface ListingDetails {
  data: {
    info: {
      size: number;
      offered: number;
      undecided_offered?: boolean;
    };
    status: string;
    _id: string;
    // Add any other properties as needed
  };
  // Add any other properties as needed
}

const tooltipContent = {
  startDate:
    'Select the start date for your project, based on the dates available at the location.',
  endDate:
    'Select the end date for your project, based on the dates available at the location.',
  artistFee:
    'Enter your rate for painting each square foot of the wall, This amount should include your fee and any assistant costs.',
  squareFeet:
    'Estimate the total area of the wall you plan to paint in square feet.',
  housing:
    'What will your accommodation costs be? Include your total or Airbnb expenses.',
  travel:
    'Estimate your total travel costs, including getting to the site and back, any rideshares, and additional expenses like baggage.',
  paintMaterials:
    'List the cost of all materials needed for the project, like paint, brushes, tape, etc.',
  totalCosts: 'This is the total of your artist fee plus all your expenses.',
  proposedBudget:
    "This is what the project owner expects to spend. Try to match this budget, but it's okay to propose a higher amount.",
  referenceImage:
    'Upload an image that represents your proposed work. It can be from past projects or any other suitable reference.',
  notes:
    'Use this space for any additional notes or questions you might have about the project.',
};

const validationSchema = Yup.object().shape({
  startDate: Yup.date()
    .nullable()
    .default(() => new Date())
    .required('Start date is required'),
  endDate: Yup.date()
    .nullable()
    .min(Yup.ref('startDate'), 'End date must be greater than start date')
    .required('End date is required'),
  requiredLift: Yup.boolean().nullable(),
  pricePerSqft: Yup.number()
    .min(1, 'Price per square foot must be greater than 0')
    .nullable()
    .required(PRICE_PER_SQUARE_FEET_REQUIRED),
  hotelCharges: Yup.number().min(0).nullable(),
  travelCost: Yup.number().min(0).nullable(),
  paintAndMaterialCost: Yup.number().min(0).nullable(),
  notes: Yup.string().nullable(),
  proposalImage: Yup.array(),
});

const SubmitProposalForm: React.FC<{ styleWrap: any }> = (props) => {
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const dispatch = useDispatch();
  const { userInfo } = useAuthInfo();
  const { styleWrap } = props;
  const listingDetails = useSelector(selectListingDetails) as ListingDetails;
  const proposalDetails = useSelector(selectProposalDetails) as ProposalDetails;
  const { info, status } = listingDetails.data;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const current = new Date();
    const day = (current.getDate() < 10 ? '0' : '') + current.getDate();
    const date = `${current.getFullYear()}-${(
      '0' +
      (current.getMonth() + 1)
    ).slice(-2)}-${day}`;
    setCurrentDate(date);
  }, []);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const onSubmitProposal = (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    const {
      startDate,
      endDate,
      requiredLift,
      notes,
      pricePerSqft,
      hotelCharges,
      travelCost,
      paintAndMaterialCost,
      proposalImage,
    } = values;

    const basePrice = pricePerSqft! * Number(info.size);
    const otherCost =
      Number(hotelCharges!) +
      Number(travelCost!) +
      Number(paintAndMaterialCost!);

    dispatch(
      submitProposal(
        {
          listing_id: listingDetails?.data._id,
          start_date: startDate,
          end_date: endDate,
          lift_required: requiredLift,
          estimated_quote: Number(info.offered),
          artistProposal: basePrice + otherCost,
          notes_questions: notes,
          price_per_square: pricePerSqft,
          hotelAcommodation: Number(hotelCharges),
          travelCost: Number(travelCost),
          paintMaterial: Number(paintAndMaterialCost),
          proposalImage: proposalImage.map((item) => item.file),
        },
        () => setSubmitting(false)
      ) as any
    );
    setOpen(true);
  };

  const ArchivedStatus: React.FC = () => (
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
      This wall is currently not accepting any proposals.
    </Typography>
  );

  const NormalStatus: React.FC = () => (
    <>
      <SectionHeading>Send Proposal</SectionHeading>
      <Typography
        sx={{
          fontWeight: 300,
          fontSize: '14px',
          fontFamily: 'var(--font-family-formulacondensed)',
          fontStyle: 'normal',
          textTransform: 'uppercase',
          color: '#FFF',
          paddingBottom: '39px',
          letterSpacing: '0.56px',
        }}
      >
        Interested in painting this wall? Make sure your landing page is
        completed so you have the best opportunity. Hover over each component
        below for help. Use the form below to calculate your cost for the
        project.
      </Typography>
      <Grid container spacing={'40px'}>
        <Formik<FormValues>
          initialValues={{
            startDate: new Date(currentDate),
            endDate: null,
            requiredLift: false,
            pricePerSqft: 0,
            artistFee: 0,
            hotelCharges: null,
            travelCost: null,
            paintAndMaterialCost: null,
            notes: null,
            proposalImage: [],
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmitProposal}
        >
          {({ handleSubmit, values }) => {
            const {
              pricePerSqft,
              artistFee,
              hotelCharges,
              travelCost,
              paintAndMaterialCost,
            } = values;

            const basePrice = Number(pricePerSqft!) * Number(info?.size || 0);
            const otherCost =
              Number(hotelCharges!) +
              Number(travelCost!) +
              Number(paintAndMaterialCost!);

            return (
              <>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Tooltip
                        title={
                          'The 1st available date is hardcoded in. Please estimate how much time you would need on-site to complete the project.'
                        }
                        placement="top-start"
                      >
                        <Box
                          sx={{
                            cursor: 'pointer',
                            color: '#FFF',
                            fontFamily: 'var(--font-family-formulacondensed)',
                            fontSize: '22px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: '26px',
                            letterSpacing: '0.88px',
                          }}
                        >
                          When are you available for the project?
                        </Box>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        component={ControlledInputTextField}
                        name="startDate"
                        typeInput="date"
                        inputProps={{
                          min: currentDate,
                          defaultValue: currentDate,
                        }}
                        dir={'left'}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        component={ControlledInputTextField}
                        name="endDate"
                        typeInput="date"
                        inputProps={
                          values.startDate
                            ? {
                                min: moment(values.startDate)
                                  .utc()
                                  .format('YYYY-MM-DD'),
                              }
                            : { min: currentDate }
                        }
                        dir={'left'}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip
                    title={
                      'Estimate the total area of the wall you plan to paint in square feet.'
                    }
                    placement="top-start"
                  >
                    <Box className="paint">
                      <Field
                        component={InputSlider}
                        name="pricePerSqft"
                        textLabel="How much of the wall are you painting?  "
                        min={DEFAULT_SLIDER_MIN_VALUE}
                        max={DEFAULT_SLIDER_MAX_VALUE}
                        marks={DEFAULT_SLIDER_MARKS}
                      />
                      <Box
                        sx={{
                          width: '100%',
                          marginTop: '28px',
                        }}
                      />
                    </Box>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip
                    title={
                      'Enter your price per SQFT for painting each square foot of the wall. This amount should include your fee and any assistant costs.'
                    }
                    placement="top-start"
                  >
                    <Box className="artist">
                      <Field
                        component={InputSlider}
                        name="artistFee"
                        textLabel="Artist Fee  "
                        min={ARTIST_SLIDER_MIN_VALUE}
                        max={ARTIST_SLIDER_MAX_VALUE}
                        marks={DEFAULT_SLIDER_ARTIST}
                      />
                      <Box
                        sx={{
                          width: '100%',
                          marginTop: '28px',
                        }}
                      />
                    </Box>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    paddingTop: '0px !important',
                    display: 'flex',
                    gap: '5px',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1_2875)">
                        <path
                          d="M12.488 18.4646L13.7369 16.0646V9.8942C15.8862 9.3578 17.4835 7.4942 17.4835 5.2646C17.4835 2.6174 15.243 0.4646 12.488 0.4646C9.73295 0.4646 7.49246 2.6174 7.49246 5.2646C7.49246 7.4942 9.08978 9.3578 11.2391 9.8942V16.0646L12.488 18.4646Z"
                          fill="white"
                        />
                        <path
                          d="M17.8178 10.7402L17.1521 13.0538C20.388 13.913 22.4798 15.5654 22.4798 17.2646C22.4798 19.535 18.3773 22.0646 12.4888 22.0646C6.60033 22.0646 2.49776 19.535 2.49776 17.2646C2.49776 15.5654 4.58963 13.913 7.82673 13.0526L7.16108 10.739C2.74379 11.9126 0 14.4122 0 17.2646C0 21.3014 5.48633 24.4646 12.4888 24.4646C19.4913 24.4646 24.9776 21.3014 24.9776 17.2646C24.9776 14.4122 22.2338 11.9126 17.8178 10.7402Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_2875">
                          <rect
                            width="24.9776"
                            height="24"
                            fill="white"
                            transform="translate(0 0.4646)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Box>
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      color: '#FFF',
                      fontFamily: 'var(--font-family-formulacondensed)',
                      fontSize: '22px',
                      fontStyle: 'normal',
                      fontWeight: '700',
                      lineHeight: '26px',
                      letterSpacing: '0.88px',
                    }}
                  >
                    Accommodations
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ paddingTop: '10px !important' }}>
                  <Tooltip title={tooltipContent.housing} placement="top-start">
                    <Box sx={{ cursor: 'pointer' }}>
                      <Field
                        component={ControlledInputTextField}
                        textLabel=""
                        name="hotelCharges"
                        typeInput="number"
                        inputProps={{ min: 0, max: 1000 }}
                        prefix={
                          <Typography sx={{ color: 'white' }}>$</Typography>
                        }
                        placeholder="100"
                        dir={'right'}
                      />
                    </Box>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip
                    title={
                      'Estimate your total travel costs, including getting to the site and back, any rideshares, and additional expenses like baggage.'
                    }
                    placement="top-start"
                  >
                    <Box sx={{ cursor: 'pointer' }}>
                      <Field
                        component={ControlledInputTextField}
                        textLabel="Travel"
                        name="travelCost"
                        typeInput="number"
                        inputProps={{ min: 1, max: 1000 }}
                        prefix={
                          <Typography sx={{ color: 'white' }}>$</Typography>
                        }
                        placeholder="100"
                        dir={'right'}
                      />
                    </Box>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip
                    title={
                      'List the cost of all materials needed for the project, like paint, brushes, tape, etc.'
                    }
                    placement="top-start"
                  >
                    <Box sx={{ cursor: 'pointer' }}>
                      <Field
                        component={ControlledInputTextField}
                        textLabel="Paint + Materials"
                        name="paintAndMaterialCost"
                        typeInput="number"
                        inputProps={{ min: 0, max: 1000 }}
                        prefix={
                          <Typography sx={{ color: 'white' }}>$</Typography>
                        }
                        placeholder="750"
                        dir={'right'}
                      />
                    </Box>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <TotalEstimatedCost
                        styleWrap={{ marginTop: '15px' }}
                        totalCost={basePrice + otherCost}
                        tooltipContent={
                          'Enter your rate for painting each square foot of the wall. This amount should include your fee and any assistant costs.'
                        }
                      />
                    </Grid>
                    {info?.undecided_offered ? (
                      <Grid item xs={12}>
                        <Box sx={{ pt: '12px' }}>
                          <UndecidedProposedBudget
                            styleWrap={{}}
                            totalCost={''}
                          />
                        </Box>
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <Box sx={{ pt: '12px' }}>
                          <TotalProposedBudget
                            textTotalBudget={Number(info?.offered) * 0.7}
                            styleWrap={{}}
                            tooltipContent={tooltipContent.proposedBudget}
                          />
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="proposalImage"
                    component={ControlledInputUpload}
                    textLabel={
                      <Tooltip
                        title={
                          'Upload an image that represents your proposed work. It can be from past projects or any other suitable reference.'
                        }
                        placement="top-start"
                      >
                        <Box sx={{ cursor: 'pointer' }}>
                          Would you like to share a reference image?
                        </Box>
                      </Tooltip>
                    }
                    multiple
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={ControlledInputTextField}
                    textLabel={
                      <Tooltip
                        title={
                          'Use this space for any additional notes or questions you might have about the project.'
                        }
                        placement="top-start"
                      >
                        <Box sx={{ cursor: 'pointer' }}>
                          Anything you would like to add?
                        </Box>
                      </Tooltip>
                    }
                    name="notes"
                    multiline
                    inputProps={{
                      minRows: 4,
                      maxRows: 4,
                    }}
                    typeInput="textarea"
                    placeholder="Please add any notes or questions here. My name is artist and I am looking to paint this mural here...."
                  />
                </Grid>
                <Grid item xs={12}>
                  {proposalDetails.status === REQUEST_STATUS.FAILED ? (
                    <>
                      <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        sx={{
                          top: '90px !important',
                        }}
                        open={open}
                        autoHideDuration={4000}
                        message={proposalDetails.error}
                        onClose={() => setOpen(false)}
                        action={action}
                        key={'top' + 'right'}
                      />
                    </>
                  ) : (
                    ''
                  )}
                  {proposalDetails.status === REQUEST_STATUS.SUCCEEDED ? (
                    <>
                      <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        sx={{
                          top: '90px !important',
                        }}
                        open={open}
                        autoHideDuration={4000}
                        onClose={() => setOpen(false)}
                        message={`Proposal successfully submitted.`}
                        action={action}
                        key={'top' + 'right'}
                      />
                    </>
                  ) : (
                    ''
                  )}
                  <LoadingButton
                    loading={proposalDetails.status === REQUEST_STATUS.LOADING}
                    disabled={
                      proposalDetails.status === REQUEST_STATUS.LOADING ||
                      userInfo?.role !== USER_TYPE.ARTIST
                    }
                    onClick={handleSubmit as MouseEventHandler<any>}
                    sx={{
                      fontFamily: 'var(--font-family-montserrat)',
                      fontSize: '16px',
                      fontWeight: '900',
                      lineHeight: '22px',
                      fontVariant: 'all-small-caps',
                      letterSpacing: '2.56px',
                      fontStyle: 'normal',
                      textTransform: 'lowercase',
                      padding: '18px',
                      width: '100%',
                      display: 'block',
                      textAlign: 'center',
                      color: 'white !important',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--opacity-white-white-35)',
                      background: '#B14EFF',
                      '&:hover': {
                        color: 'var(--main-pink)',
                        boxShadow: '0px 0px 25px 0px rgba(255, 255, 255, 0.25)',
                        border: '1px solid var(--main-pink)',
                        background: '#B14EFF',
                      },
                    }}
                  >
                    SUBMIT PROPOSAL
                  </LoadingButton>
                </Grid>
              </>
            );
          }}
        </Formik>
      </Grid>
    </>
  );

  return (
    <Box sx={{ ...styleWrap }}>
      {status === 'archived' ? <ArchivedStatus /> : <NormalStatus />}
    </Box>
  );
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return (
    <Typography
      variant="h2"
      sx={{
        fontWeight: 700,
        fontSize: '50px',
        fontFamily: 'var(--font-family-formulacondensed)',
        fontStyle: 'normal',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#D8D8D8',
      }}
    >
      {children}
    </Typography>
  );
};

export default SubmitProposalForm;
