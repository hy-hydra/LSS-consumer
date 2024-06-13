import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { TextField, InputAdornment, Typography, Box } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { MobileDatePicker } from '@mui/x-date-pickers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MuiTelInput } from 'mui-tel-input';

// form
import { useFormContext, Controller } from 'react-hook-form';
// components
import SvgColor from '../svg-color';

export default function CustomLoginTextField({
  name,
  helperText,
  imgSrc,
  prefix,
  suffix,
  type,
  children,
  minDate,
  ...props
}) {
  const theme = useTheme();
  const { control } = useFormContext();

  const customTheme = (outerTheme) =>
    createTheme({
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              fontFamily: theme.typography.fontFamily,
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '17.64px',
              letterSpacing: '-0.02em',
              borderRadius: '14px',
              border: '1px solid transparent',
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                border: '1px solid transparent',
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                border: '1px solid transparent',
              },
              [`&.Mui-focused`]: {
                border: '1px solid #475569',
                boxShadow: '0px 4px 8px 0px #0000001A',
              },
              [`&:hover`]: {
                border: '1px solid #94A3B8',
                boxShadow: '0px 4px 32px 0px #00000026',
              },
              transition:
                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
          },
        },
      },
    });

  const outerTheme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <ThemeProvider theme={customTheme(outerTheme)}>
          {
            // eslint-disable-next-line no-nested-ternary
            type !== 'date' ? (
              type === 'phone' ? (
                <MuiTelInput
                  {...props}
                  {...field}
                  error={!!error}
                  helperText={error ? error?.message : helperText}
                  fullWidth
                  defaultCountry="US"
                />
              ) : (
                <TextField
                  {...props}
                  {...field}
                  autoCapitalize="none"
                  type={type}
                  value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                  error={!!error}
                  helperText={error ? error?.message : helperText}
                  InputProps={{
                    startAdornment: (imgSrc || prefix) && (
                      <InputAdornment position="start">
                        {imgSrc && (
                          <SvgColor
                            src={imgSrc}
                            sx={{
                              width: '24px',
                              height: '24px',
                              color: theme.palette.contrastThreshold,
                            }}
                          />
                        )}
                        {prefix && (
                          <Typography
                            sx={{
                              color: '#475569',
                              fontSize: '14px',
                              fontWeight: '500',
                              lineHeight: '17.64px',
                              letterSpacing: '-0.02em',
                              fontFamily: theme.typography.fontFamily,
                            }}
                          >
                            {prefix}
                          </Typography>
                        )}
                      </InputAdornment>
                    ),
                    endAdornment: suffix && (
                      <InputAdornment position="start">
                        <Box sx={{ display: 'flex', gap: '12px', width: '93px' }}>
                          <Box
                            component="img"
                            width="42px"
                            height="24px"
                            alt="Visa"
                            src={suffix[0]}
                          />
                          <Box
                            component="img"
                            width="38.4px"
                            height="24px"
                            alt="Visa"
                            src={suffix[1]}
                          />
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                >
                  {children}
                </TextField>
              )
            ) : (
              <MobileDatePicker
                {...field}
                inputFormat="dd/MM/yyyy"
                minDate={new Date(minDate)}
                renderInput={(params) => (
                  <TextField
                    {...props}
                    {...params}
                    value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    InputProps={{
                      startAdornment: (imgSrc || prefix) && (
                        <InputAdornment position="start">
                          {imgSrc && (
                            <SvgColor
                              src={imgSrc}
                              sx={{
                                width: '24px',
                                height: '24px',
                                color: theme.palette.contrastThreshold,
                              }}
                            />
                          )}
                          {prefix && (
                            <Typography
                              sx={{
                                color: '#475569',
                                fontSize: '14px',
                                fontWeight: '500',
                                lineHeight: '17.64px',
                                letterSpacing: '-0.02em',
                                fontFamily: theme.typography.fontFamily,
                              }}
                            >
                              {prefix}
                            </Typography>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  >
                    {children}
                  </TextField>
                )}
              />
            )
          }
        </ThemeProvider>
      )}
    />
  );
}

CustomLoginTextField.propTypes = {
  imgSrc: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.array,
  props: PropTypes.any,
  children: PropTypes.node,
  name: PropTypes.string,
  helperText: PropTypes.node,
  minDate: PropTypes.any,
  type: PropTypes.string,
};
