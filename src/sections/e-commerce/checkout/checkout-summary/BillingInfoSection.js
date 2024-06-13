import PropTypes from 'prop-types';
// @mui
import { Card, Button, Stack, Typography, CardHeader, CardContent, Divider } from '@mui/material';
import { useTheme } from '@mui/system';
// components
import Iconify from '../../../../components/iconify';
import Image from '../../../../components/image';
import { CustomAvatar } from '../../../../components/custom-avatar';
// context
import { useAuthContext } from '../../../../auth/useAuthContext';

// ----------------------------------------------------------------------

BillingInfoSection.propTypes = {
  onEdit: PropTypes.func,
  billing: PropTypes.object,
  onBackStep: PropTypes.func,
  enableEdit: PropTypes.bool,
};

export default function BillingInfoSection({ billing, onEdit, onBackStep, enableEdit = false }) {
  const theme = useTheme();
  const { user } = useAuthContext();

  return (
    <Card sx={{ boxShadow: '0 0 2px 0 rgb(100 116 139 / 62%)', width: '100%', padding: '24px' }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={2}
        paddingY={3}
        sx={{ justifyContent: { xs: 'center', md: 'start' } }}
      >
        <CustomAvatar
          src={user.avatar_url}
          alt={user.username}
          name={user.username}
          sx={{
            width: '56px',
            height: '56px',
            boxShadow: user?.avatar_url
              ? '0 4px 8px rgb(0 0 0 / 15%)'
              : '0 4px 8px 0px rgb(0 0 0 / 61%)',
            border: user?.avatar_url ? '1.5px solid white' : '3px solid white',
            backgroundColor: user?.avatar_url ? 'white' : '#232323',
            color: user?.avatar_url ? theme.palette.primary.contrastText : 'white',
          }}
        />
        <Stack>
          <Typography
            sx={{ fontSize: '18px', fontWeight: 700, color: theme.palette.primary.contrastText }}
          >
            {user.username}
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            {user.order_count} previous orders
          </Typography>
        </Stack>
      </Stack>
      <Divider orientation="horizontal" />
      <Stack flexDirection="row" justifyContent="start" alignItems="normal" gap={1} paddingY={3}>
        <Image
          key={billing.id}
          disabledEffect
          alt="logo card"
          src="/assets/icons/payments/ic_mail.svg"
          sx={{ '& .wrapper': { width: 24, objectFit: 'contain !important' } }}
        />
        <Typography variant="subtitle2">{user.email}</Typography>
      </Stack>
      <Divider orientation="horizontal" />
      <Stack
        flexDirection="column"
        justifyContent="start"
        alignItems="normal"
        sx={{ px: { xs: 0, lg: '12px', xl: '24px' } }}
      >
        <BillingAddress
          title="Shipping Address"
          billing={billing}
          onEdit={onEdit}
          onBackStep={onBackStep}
          enableEdit
        />
        <BillingAddress
          title="Billing Address"
          billing={billing}
          onEdit={onEdit}
          onBackStep={onBackStep}
          enableEdit
        />
        <ShippingMethod billing={billing} onEdit={onEdit} onBackStep={onBackStep} enableEdit />
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

BillingAddress.propTypes = {
  title: PropTypes.string,
  onEdit: PropTypes.func,
  billing: PropTypes.object,
  onBackStep: PropTypes.func,
  enableEdit: PropTypes.bool,
};

export function BillingAddress({ title, billing, onEdit, onBackStep, enableEdit = false }) {
  return (
    <Stack flexDirection="row" alignItems="center" width="100%">
      <Image
        key={billing.id}
        disabledEffect
        alt="logo card"
        src="/assets/icons/payments/ic_address.svg"
        sx={{ '& .wrapper': { width: 32, objectFit: 'contain !important' } }}
      />
      <Stack width="100%">
        <CardHeader
          title={title}
          action={
            enableEdit && (
              <Button size="small" onClick={onEdit} startIcon={<Iconify icon="eva:edit-fill" />}>
                Edit
              </Button>
            )
          }
        />
        <CardContent sx={{ pt: 1 }}>
          <Stack>
            <Typography variant="subtitle2">
              {billing?.name}&nbsp;
              <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                (Home)
              </Typography>
            </Typography>

            <Typography variant="body2">
              {billing?.address}, {billing?.city}, {billing?.state} / {billing?.zip}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {billing?.phone}
            </Typography>
          </Stack>
        </CardContent>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

ShippingMethod.propTypes = {
  onEdit: PropTypes.func,
  billing: PropTypes.object,
  onBackStep: PropTypes.func,
  enableEdit: PropTypes.bool,
};

export function ShippingMethod({ billing, onEdit, onBackStep, enableEdit = false }) {
  return (
    <Stack flexDirection="row" alignItems="center" width="100%">
      <Image
        key={billing.id}
        disabledEffect
        alt="logo card"
        src="/assets/icons/payments/ic_deliver.svg"
        sx={{ '& .wrapper': { width: 32, objectFit: 'contain !important' } }}
      />
      <Stack width="100%">
        <CardHeader
          title="Shipping Method"
          action={
            enableEdit && (
              <Button size="small" onClick={onEdit} startIcon={<Iconify icon="eva:edit-fill" />}>
                Edit
              </Button>
            )
          }
        />
        <CardContent sx={{ pt: 1 }}>
          <Typography variant="body2">DHL - Takes up to 3 working days</Typography>
        </CardContent>
      </Stack>
    </Stack>
  );
}
