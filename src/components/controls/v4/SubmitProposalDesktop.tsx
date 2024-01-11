import React from 'react';
import { Box } from '@mui/material';
import SubmitProposalForm from './SubmitProposalForm';

const SubmitProposalDesktop: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--opacity-white-white-10)',
        padding: '48px',
        borderRadius: '24px',
      }}
    >
      <SubmitProposalForm styleWrap={{}} />
    </Box>
  );
};

export default SubmitProposalDesktop;
