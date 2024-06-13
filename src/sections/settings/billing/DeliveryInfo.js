import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Paper,
  Typography,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Stack,
} from '@mui/material';

// ----------------------------------------------------------------------

const deliveryOptions = [
  {
    value: 0,
    isDefault: true,
    title: 'Standard Shipping (free)',
    description: 'Delivered on Monday, August 12',
  },
  {
    value: 200,
    isDefault: false,
    title: 'Express Shipping ($200)',
    description: 'Delivered on Monday, August 5',
  },
];

// ----------------------------------------------------------------------

// CheckoutDelivery.propTypes = {
//   onApplyShipping: PropTypes.func,
//   deliveryOptions: PropTypes.array,
// };

export default function DeliveryInfo() {
  return (
    <Card sx={{ mb: 3, boxShadow: 'none' }}>
      <CardHeader
        title={<Typography variant="h6">Shipping Methods</Typography>}
        sx={{ pl: 0, mb: 3 }}
      />
      <Divider sx={{ width: '100%', mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box gap={2}>
          {deliveryOptions.map((option) => (
            <DeliveryOption key={option.value} option={option} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

DeliveryOption.propTypes = {
  option: PropTypes.object,
  isSelected: PropTypes.bool,
};

function DeliveryOption({ option, isSelected }) {
  const { isDefault, value, title, description } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        py: 2,
        px: 2.5,
        borderRadius: 3,
        gap: 2,
        marginBottom: { xs: 2, sm: 3 },
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'space-between' },
        transition: (theme) => theme.transitions.create('all'),
      }}
    >
      <Box
        width="100%"
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          justifyContent: { xs: 'space-between', sm: 'start' },
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} display="flex" gap={0.5}>
          From US to Canada
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} display="flex" gap={0.5}>
          ( Available Tracking )
        </Typography>
      </Box>
      <Stack flexDirection="row" width="100%" justifyContent="end">
        {isDefault && (
          <Button
            disabled
            variant="contained"
            color="primary"
            sx={{
              color: '#0F172A',
              borderRadius: 20,
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 400,
              padding: { xs: '8px 16px', sm: '10px 16px' },
              width: { xs: '50%', sm: 'fit-content' },
            }}
          >
            Default
          </Button>
        )}

        {!isDefault && (
          <Button
            variant="outlined"
            sx={{
              color: '#0F172A',
              mr: 1,
              borderRadius: 20,
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 400,
              padding: { xs: '8px 16px', sm: '10px 16px' },
              width: { xs: '50%', sm: 'fit-content' },
            }}
          >
            Set as default
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
