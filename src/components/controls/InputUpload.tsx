import React, { useRef, useState } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { styled as muiStyledSystem, styled } from '@mui/system';
import InputLabel from './InputLabel';
import Lightbox from 'react-image-lightbox';
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from '@mui/core/ButtonUnstyled';
import { get } from 'lodash';
import { cloudflareImage } from '@/utility/images';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';

const Input = styled('input')({
  display: 'none',
});

const CustomButtonRoot = muiStyledSystem('button')(`
  background-color: lightgrey;
  color: black;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  font-weight: 600;
  cursor: pointer;
  border: none;
  height: 20px;
  width: 20px;
  margin: 5px;
  border-radius: 20px;

  &:hover {
    background-color: grey;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`);

const useStyles = makeStyles((theme: any) => ({
  previewImage: {
    objectFit: 'cover',
    borderRadius: '8px',
    mb: '12px',
  },
}));

const LightboxComponent = Lightbox as any;

const InputUpload = (props: any) => {
  const classes = useStyles();

  const { styleWrap, textLabel, form, field } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(
    get(form?.values[field?.name], '[0].location')
  );
  const refInput = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = (e: any) => {
    const files = e.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target) {
        setPreview(evt.target.result);
      }
    };

    reader.onerror = (evt) => {
      console.error('Error reading file');
    };

    reader.readAsDataURL(file);
    form?.setFieldValue(field?.name, file);
  };

  const deleteHandler = () => {
    setPreview('');
    form?.setFieldValue(field?.name, '');
    if (refInput.current) {
      refInput.current.value = '';
    }
  };

  return (
    <Box sx={styleWrap}>
      {textLabel && (
        <InputLabel
          text={textLabel}
          styleWrap={{
            marginBottom: '12px',
          }}
        />
      )}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.13)',
          borderRadius: '8px',
          border: '1px dashed #FFFFFF',
          width: '100%',
        }}
      >
        {isOpen && preview && (
          <LightboxComponent
            mainSrc={preview}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}

        {preview && (
          <Box
            style={{
              position: 'relative',
              width: '90%',
              height: '80px',
              margin: '6% auto -10px auto',
            }}
          >
            <Image
              alt="preview"
              src={
                preview?.includes('http') ? cloudflareImage(preview) : preview
              }
              className={classes.previewImage}
              onClick={() => setIsOpen(true)}
              priority
              fill
            />
            <ButtonUnstyled
              component={CustomButtonRoot}
              onClick={deleteHandler}
              sx={{ position: 'absolute', top: 0, right: 0 }}
            >
              X
            </ButtonUnstyled>
          </Box>
        )}

        <label htmlFor={field?.name}>
          <Input
            accept="image/*"
            id={field?.name}
            type="file"
            name={field?.name}
            onChange={onChangeHandler}
            ref={refInput}
          />
          <Box
            sx={{
              display: 'flex',
              padding: '28px 28px',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}
            >
              <CardMedia
                image={cloudflareImage(
                  'https://anima-uploads.s3.amazonaws.com/projects/6183b51d6b5cbed22d564e6f/releases/618a04ee1ebc77dda1e390a7/img/icon@2x.svg?v=1636444489397&v=1636444489800&v=1636446995761&v=1636447000710&v=1636453494937&v=1636453495631'
                )}
                sx={{
                  width: '20px',
                  height: '20px',
                  paddingRight: '8px',
                }}
              />
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-family-montserrat)',
                  fontSize: '14px',
                  fontWeight: '700',
                  fontStyle: 'normal',
                }}
              >
                Upload
              </Typography>
            </Box>
          </Box>
        </label>
      </Box>
      {form?.errors[field?.name] && form?.touched[field?.name] && (
        <Typography
          className={'Mui-error'}
          sx={{ color: 'red', fontSize: '13px' }}
        >
          {form?.errors[field?.name]}
        </Typography>
      )}
    </Box>
  );
};

export default InputUpload;