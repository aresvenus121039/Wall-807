import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

interface TotalEstimatedCostProps {
  styleWrap: React.CSSProperties;
  totalCost: number | string;
  tooltipContent: string;
}

const TotalEstimatedCost: React.FC<TotalEstimatedCostProps> = ({
  styleWrap,
  totalCost,
  tooltipContent,
}) => {
  return (
    <Tooltip title={tooltipContent} placement="top-start">
      <Box
        sx={{
          ...styleWrap,
          backgroundColor: 'rgba(177, 78, 255, 0.10)',
          padding: '21px 18px',
          borderRadius: '8px',
          border: '1px solid rgba(177, 78, 255, 0.50)',
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
            color: 'rgba(177, 78, 255, 0.50)',
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
          Total Estimated Cost:
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
              color: 'rgba(177, 78, 255, 0.50)',
              fontSize: {
                xs: '20px',
                sm: '24px',
              },
              fontWeight: '700',
            }}
          >
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(Number(totalCost))}
          </Typography>

          <Typography
            component="span"
            sx={{
              color: 'rgba(177, 78, 255, 0.50)',
              fontSize: '14px',
              fontWeight: '700',
              paddingBottom: '4px',
              paddingLeft: '5px',
            }}
          >
            USD
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default TotalEstimatedCost;
