import PropTypes from 'prop-types';
import { useState } from 'react';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
  Box,
  Radio,
  Stack,
  Paper,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
  Autocomplete,
} from '@mui/material';
// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

CheckoutPaymentMethods.propTypes = {
  cardOptions: PropTypes.array,
  paymentOptions: PropTypes.array,
};

export default function CheckoutPaymentMethods({ paymentOptions, cardOptions, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name="payment"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <RadioGroup row {...field}>
            <Stack spacing={3} sx={{ width: 1 }}>
              {paymentOptions.map((option) => (
                <PaymentOption
                  key={option.title}
                  option={option}
                  cardOptions={cardOptions}
                  hasChild={option.value === 'credit_card'}
                  isSelected={field.value === option.value}
                  isCreditMethod={option.value === 'credit_card' && field.value === 'credit_card'}
                />
              ))}
            </Stack>
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ pt: 1, px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}

// ----------------------------------------------------------------------

PaymentOption.propTypes = {
  onOpen: PropTypes.func,
  hasChild: PropTypes.bool,
  option: PropTypes.object,
  isSelected: PropTypes.bool,
  cardOptions: PropTypes.array,
  isCreditMethod: PropTypes.bool,
};

function PaymentOption({ option, cardOptions, hasChild, isSelected, isCreditMethod }) {
  const { value, title, icons, description } = option;

  const [cardValue, setCardValue] = useState(cardOptions[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        transition: (theme) => theme.transitions.create('all'),
        ...(isSelected && {
          boxShadow: (theme) => theme.customShadows.z20,
        }),
        ...(hasChild && {
          flexWrap: 'wrap',
        }),
      }}
    >
      <FormControlLabel
        value={value}
        control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
        label={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              ml: 1,
              width: '100%',
            }}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                flexShrink={0}
                sx={{
                  // px: 2.5,
                  justifyContent: 'center',
                  display: {
                    xs: 'none',
                    sm: 'inline-flex',
                  },
                }}
              >
                {icons.map((icon) => (
                  <Image
                    key={icon}
                    disabledEffect
                    alt="logo card"
                    src={icon}
                    sx={{ '& .wrapper': { objectFit: 'contain !important' } }}
                  />
                ))}
              </Stack>
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {description}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              // onClick={handleOpen}
              disabled={!isSelected}
              startIcon={<Iconify icon="eva:edit-fill" />}
              sx={{ borderRadius: 20, padding: '10px 16px' }}
            >
              Edit
            </Button>
          </Box>
        }
        sx={{
          py: 3,
          px: 2.5,
          width: '100% !important',
          '& .MuiFormControlLabel-label': { width: '100%' },
        }}
      />

      {isCreditMethod && (
        <Stack
          alignItems="flex-start"
          sx={{
            px: 3,
            pb: 3,
            width: 1,
          }}
        >
          <Autocomplete
            fullWidth
            value={cardValue}
            autoCapitalize="none"
            options={cardOptions}
            onChange={(event, newValue) => {
              setCardValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Cards" />}
          />
        </Stack>
      )}
    </Paper>
  );
}
