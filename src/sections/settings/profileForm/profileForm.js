import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
// next
// import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography, MenuItem, Divider } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// assets
import { getCountry } from '../../../utils/country';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFUploadAvatar } from '../../../components/hook-form';
import { CustomLoginTextField } from '../../../components/text-field';
import { CustomSelectTextField } from '../../../components/text-field/CustomSelectTextField';
import CustomToogleButtom from './CustomToogleButtom';
// context
import { useAuthContext } from '../../../auth/useAuthContext';
// axios
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function UserProfileForm() {
  // const { push } = useRouter();
  const { user: currentUser, updateUser } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    birthday: Yup.date().required('Birthday is required').min(new Date('1960-01-01')),
    phone: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    avatar_url: Yup.mixed().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentUser?.first_name || '',
      last_name: currentUser?.last_name || '',
      email: currentUser?.email || '',
      birthday: new Date(currentUser?.birthday || ''),
      phone: currentUser?.phone || '',
      country: currentUser?.country || '',
      avatar_url: currentUser?.avatar_url || null,
      is_private: currentUser?.is_private || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentUser) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const onSubmit = async (data) => {
    console.log('DATA', data);
    try {
      await axios.put('/users/account/update-user/', { ...data });
      updateUser();
      enqueueSnackbar('Update success!');
    } catch (error) {
      enqueueSnackbar('Update success!', 'error');
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('file', newFile);
        setValue('avatar_url', newFile.preview);
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} xl={3}>
          <Box sx={{ mb: 4 }}>
            <RHFUploadAvatar
              name="avatar_url"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} xl={9}>
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
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>First Name</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="first_name"
                  placeholder="Enter first name."
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
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Last Name</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="last_name"
                  placeholder="Enter last name."
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
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Email</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="email"
                  placeholder="Enter email."
                  imgSrc="/assets/icons/auth/ic_email.svg"
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
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Day of Birth</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="birthday"
                  type="date"
                  minDate={new Date('1960-01-01')}
                  placeholder="Enter the day of birth."
                  imgSrc="/assets/icons/payments/ic_calendar.svg"
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
                <CustomLoginTextField type="phone" name="phone" placeholder="Enter phone number." />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Privacy</Typography>
                <CustomToogleButtom
                  defaultValue={defaultValues.is_private}
                  setPrivate={(v) => setValue('is_private', v)}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  You’re profile will only be visible to everyone
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed', mt: 3 }} />
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
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
                width: { xs: '100%', md: '50%' },
              }}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
