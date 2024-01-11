import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

interface TotalProposedBudgetProps {
  textTotalBudget: number | string;
  styleWrap: React.CSSProperties;
  tooltipContent: string;
}

const TotalProposedBudget: React.FC<TotalProposedBudgetProps> = ({
  textTotalBudget,
  styleWrap,
  tooltipContent,
}) => {
  return (
    <Tooltip title={tooltipContent} placement="top-start">
      <Box
        sx={{
          ...styleWrap,
          background: 'rgba(206, 206, 206, 0.1)',
          border: '1px solid #C8C8C8',
          padding: '21px 18px',
          borderRadius: '8px',
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          component="h5"
          sx={{
            color: '#CECECE',
            fontSize: {
              xs: '12px',
              sm: '14px',
            },
            fontWeight: '700',
            paddingRight: {
              xs: '12px',
              sm: '15px',
            },
            flex: '1 1 auto',
          }}
        >
          Percent Delta to Proposed Budget:
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'end',
          }}
        >
          <Typography
            component="h4"
            sx={{
              color: '#CECECE',
              fontSize: {
                xs: '30px',
                sm: '32px',
              },
              fontWeight: '700',
            }}
          >
            {Intl.NumberFormat('en-US', {
              style: 'percent',
              currency: 'USD',
            }).format(Number(textTotalBudget))}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default TotalProposedBudget;
