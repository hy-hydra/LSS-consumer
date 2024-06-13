import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Stack,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Typography,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// assets
import FormProvider, { RHFCheckbox, RHFRadioGroup } from '../../../../components/hook-form';
import { CustomLoginTextField } from '../../../../components/text-field';
import { CustomSelectTextField } from '../../../../components/text-field/CustomSelectTextField';
import { getCountry } from '../../../../utils/country';

// ----------------------------------------------------------------------

CheckoutBillingNewAddressForm.propTypes = {
  open: PropTypes.bool,
  isNew: PropTypes.bool,
  onClose: PropTypes.func,
  onCreateBilling: PropTypes.func,
  addressData: PropTypes.object,
};

export default function CheckoutBillingNewAddressForm({
  open,
  isNew,
  onClose,
  onCreateBilling,
  addressData,
}) {
  const NewAddressSchema = Yup.object().shape({
    receiver: Yup.string().required('Fullname is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  const defaultValues = {
    receiver: isNew ? '' : addressData.name || '',
    phoneNumber: isNew ? '' : addressData.phone || '',
    address: isNew ? '' : addressData.address || '',
    city: isNew ? '' : addressData.city || '',
    state: isNew ? '' : addressData.state || '',
    country: isNew ? '' : addressData.country || '',
    zipCode: isNew ? '' : addressData.zip || '',
    isDefault: isNew ? '' : addressData.address || true,
    shippingAddress: 'same',
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await onCreateBilling({ ...data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {isNew ? 'Add shipping address.' : 'Edit shipping address.'}
        <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>
          {isNew ? 'Please add a new shipping address.' : 'Please edit shipping address.'}
        </Typography>
      </DialogTitle>
      <Divider sx={{ mb: 3 }} />

      <DialogContent dividers>
        <Stack sx={{ gap: { xs: 1, sm: 3 } }}>
          <Box
            sx={{ rowGap: { xs: 1, sm: 3 } }}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Name</Typography>
              <CustomLoginTextField
                fullWidth
                name="receiver"
                placeholder="Enter full name"
                imgSrc="/assets/icons/auth/ic_user.svg"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Phone Number</Typography>
              <CustomLoginTextField
                type="phone"
                name="phoneNumber"
                placeholder="Enter phone number."
              />
            </Box>
          </Box>

          <Box
            sx={{ rowGap: { xs: 1, sm: 3 } }}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Country</Typography>
              <CustomSelectTextField
                name="country"
                placeholder="Select country"
                imgSrc="/assets/icons/setting/ic_map.svg"
              >
                {getCountry().map((option) => (
                  <MenuItem key={option.code} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelectTextField>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>State</Typography>
              <CustomLoginTextField
                fullWidth
                name="state"
                placeholder="Enter State."
                imgSrc="/assets/icons/setting/ic_map.svg"
              />
            </Box>
          </Box>

          <Box
            sx={{ rowGap: { xs: 1, sm: 3 } }}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>City</Typography>
              <CustomLoginTextField
                fullWidth
                name="city"
                placeholder="Enter City."
                imgSrc="/assets/icons/setting/ic_compass.svg"
              >
                {getCountry().map((option) => (
                  <MenuItem key={option.code} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomLoginTextField>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>ZIP</Typography>
              <CustomLoginTextField
                fullWidth
                name="zipCode"
                placeholder="Enter zip code."
                imgSrc="/assets/icons/setting/ic_zip_code.svg"
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Shipping address.</Typography>
            <CustomLoginTextField
              fullWidth
              name="address"
              placeholder="Enter address."
              imgSrc="/assets/icons/setting/ic_shipping_address.svg"
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Billing address.</Typography>
            <RHFRadioGroup
              row
              name="shippingAddress"
              options={[{ label: 'Same as shipping address', value: 'same' }]}
            />
            <RHFCheckbox name="isDefault" label="Use this address as default." />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            backgroundColor: '#0F172A',
            color: 'white',
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 400,
            py: 1,
            mx: '0px !important',
            width: { xs: '100%', sm: 'fit-content' },
          }}
        >
          Deliver to this Address
        </LoadingButton>

        <Button
          color="inherit"
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 400,
            py: 1,
            mx: '0px !important',
            width: { xs: '100%', sm: 'fit-content' },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </FormProvider>
  );
}
