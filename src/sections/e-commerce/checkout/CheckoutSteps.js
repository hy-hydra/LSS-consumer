import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Step,
  Stack,
  Stepper,
  StepLabel,
  Typography,
  StepConnector as MUIStepConnector,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
// hook
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

const StepConnector = styled(MUIStepConnector)(({ theme }) => ({
  paddingInline: 0,
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// ----------------------------------------------------------------------

CheckoutSteps.propTypes = {
  sx: PropTypes.object,
  activeStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string),
};

export default function CheckoutSteps({ steps, activeStep, sx, ...other }) {
  const isMobile = useResponsive('down', 'sm');
  const isTabletP = useResponsive('between', 'sm', 'md');

  if (isMobile || isTabletP) {
    return (
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<StepConnector />}
        sx={{ mb: 5, ...sx }}
        {...other}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={StepIconMobile}
              sx={{
                '& .MuiStepLabel-label': {
                  typography: 'subtitle2',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  }

  return (
    <Stepper
      activeStep={activeStep}
      connector={<StepConnector />}
      sx={{
        px: 1,
        py: 2,
        gap: 3,
        minWidth: { xs: 1200, sm: 600, md: 800, lg: 800, xl: 1000 },
        ...sx,
      }}
      {...other}
    >
      {steps.map((label, index) => (
        <Step key={label} sx={{ px: '0px !important' }}>
          <StepLabel
            StepIconComponent={(props) => (
              <StepIcon {...props} activeStep={activeStep} index={index} />
            )}
          >
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                textAlign: 'left',
              }}
            >
              Step 0{index + 1}
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              {label}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

// ----------------------------------------------------------------------

StepIcon.propTypes = {
  active: PropTypes.bool,
  index: PropTypes.number,
  activeStep: PropTypes.number,
  completed: PropTypes.bool,
};

function StepIcon({ active, index, activeStep, completed }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 48,
        height: 48,
        color: '#dadee3',
        ...(active && {
          color: '#0F172A',
        }),
        ...(completed && {
          color: '#059669',
        }),
      }}
    >
      <Box
        sx={{
          border: '1px solid currentColor',
          background: 'white',
          padding: '4px',
          borderRadius: '50%',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: 12,
              verticalAlign: 'center',
              lineHeight: 1,
            }}
          >
            {
              // eslint-disable-next-line no-nested-ternary
              completed ? (
                <Iconify icon="eva:checkmark-fill" sx={{ color: 'white', width: 24, height: 24 }} />
              ) : active ? (
                `0${activeStep + 1}`
              ) : (
                `0${index + 1}`
              )
            }
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}

StepIconMobile.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function StepIconMobile({ active, completed }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 24,
        height: 24,
        color: 'text.disabled',
        ...(active && {
          color: '#0F172A',
        }),
        ...(completed && {
          color: '#059669',
        }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ color: 'currentColor' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Stack>
  );
}
