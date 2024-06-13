import PropTypes from 'prop-types';
// @mui
import {
  Card,
  Stack,
  Paper,
  Button,
  Typography,
  CardHeader,
  CardContent,
  Divider,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/system';
// components
import Image from '../../../components/image';
import { hideCardNumber } from '../../../utils/formatString';

// ----------------------------------------------------------------------

const paymentOptions = [
  {
    created_at: '2023-11-07T19:05:13.739537Z',
    cvc: null,
    date: null,
    id: 0,
    is_default: true,
    is_deleted: false,
    method: 'bank',
    modified_at: '2023-11-07T19:05:03.714888Z',
    name: 'Adam',
    provider: '1231231231231232346583',
    user_id: 11,
  },
  {
    created_at: '2023-11-08T11:14:21.524444Z',
    cvc: '123',
    date: '2023-11-23T00:00:00Z',
    id: 1,
    is_default: false,
    is_deleted: false,
    method: 'card',
    modified_at: '2023-11-08T11:14:21.524459Z',
    name: 'asdasd',
    provider: '123123123123123123123',
    user_id: 11,
  },
];

// ----------------------------------------------------------------------

PaymentMethods.propTypes = {
  onOpen: PropTypes.func,
};

export default function PaymentMethods({ onOpen }) {
  const theme = useTheme();

  return (
    <Card sx={{ mb: 3, boxShadow: 'none' }}>
      <CardHeader
        title={<Typography variant="h6">Payment Methods</Typography>}
        action={
          <Link
            // href={goto}
            onClick={onOpen}
            sx={{
              cursor: 'pointer',
              textDecorationLine: 'underline',
              color: theme.palette.primary.darker,
              ':hover': {
                color: theme.palette.primary.contrastText,
              },
              fontWeight: '500',
              fontSize: '12px',
              lineHeight: '40px',
              textAlign: 'center',
              mt: 1,
            }}
          >
            Add payment method.
          </Link>
        }
        sx={{ pl: 0, mb: 3 }}
      />
      <Divider sx={{ width: '100%', mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        {paymentOptions.map((option) => (
          <PaymentOption
            key={option.id}
            option={option}
            // isSelected={field.value === option.id}
            // onOpen={onOpen}
          />
        ))}
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

PaymentOption.propTypes = {
  onOpen: PropTypes.func,
  option: PropTypes.object,
  isSelected: PropTypes.bool,
};

function PaymentOption({ option, isSelected, onOpen }) {
  const { id, is_default, method, provider } = option;
  const isCard = method === 'card';

  return (
    <Paper
      variant="outlined"
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
      <Stack
        width="100%"
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          justifyContent: { xs: 'space-between', sm: 'start' },
          alignItems: 'center',
        }}
      >
        <Stack flexDirection="row" justifyContent="center" alignItems="center" gap={1}>
          <Image
            key={id}
            disabledEffect
            alt="logo card"
            src={
              isCard
                ? '/assets/icons/payments/ic_credit_card.svg'
                : '/assets/icons/payments/ic_bank.svg'
            }
            sx={{ '& .wrapper': { width: 32, objectFit: 'contain !important' } }}
          />
          <Typography variant="body2" flex={1} sx={{ color: 'text.secondary' }}>
            {isCard ? 'Master Card ending with' : 'US bank account ending with'}
          </Typography>
        </Stack>
        <Stack flexDirection="row" gap={1} justifyContent="start" alignItems="center">
          <Typography variant="subtitle2">
            {isCard ? hideCardNumber(provider) : hideCardNumber(provider)}
          </Typography>
          {/* <Typography variant="subtitle2">{is_default ? `(Default)` : ''}</Typography> */}
        </Stack>
      </Stack>
      <Stack flexDirection="row" width="100%" justifyContent="end">
        {!is_default && (
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

        {is_default && (
          <Button
            disabled
            variant="contained"
            color="primary"
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
            Default
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#0F172A',
            color: 'white',
            borderRadius: 20,
            fontSize: { xs: 14, sm: 16 },
            fontWeight: 400,
            padding: { xs: '8px 16px', sm: '10px 16px' },
            width: { xs: '50%', sm: 'fit-content' },
          }}
        >
          Edit
        </Button>
      </Stack>
    </Paper>
  );
}
