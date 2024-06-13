import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormControl, FormHelperText, Select, Stack, Typography } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import SvgColor from '../svg-color';

// ----------------------------------------------------------------------

CustomSelectTextField.propTypes = {
  imgSrc: PropTypes.string,
  prefix: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  native: PropTypes.bool,
  children: PropTypes.node,
  helperText: PropTypes.node,
  maxHeight: PropTypes.number,
  displayValue: PropTypes.func,
};

export function CustomSelectTextField({
  name,
  imgSrc,
  prefix,
  native,
  children,
  helperText,
  placeholder,
  displayValue,
  maxHeight = 220,
  ...other
}) {
  const theme = useTheme();
  const { control } = useFormContext();

  const customTheme = (outerTheme) =>
    createTheme({
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              height: 55.13,
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
          <FormControl fullWidth error>
            <Select
              {...field}
              fullWidth
              displayEmpty
              selectprops={{
                native,
                MenuProps: {
                  PaperProps: {
                    sx: {
                      ...(!native && {
                        px: 1,
                        maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                        '& .MuiMenuItem-root': {
                          px: 1,
                          borderRadius: 0.75,
                          typography: 'body2',
                          textTransform: 'capitalize',
                        },
                      }),
                    },
                  },
                },
                sx: { textTransform: 'capitalize' },
              }}
              // eslint-disable-next-line consistent-return
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return (
                    (imgSrc || placeholder) && (
                      <Stack
                        flexDirection="row"
                        justifyContent="start"
                        alignItems="center"
                        gap={1}
                        position="start"
                      >
                        {imgSrc && (
                          <SvgColor
                            src={imgSrc}
                            sx={{
                              width: '24px',
                              height: '24px',
                              color: '#898989',
                            }}
                          />
                        )}
                        {placeholder && (
                          <Typography
                            sx={{
                              fontSize: '14px',
                              fontWeight: '200',
                              lineHeight: '17.64px',
                              letterSpacing: '-0.02em',
                              fontFamily: theme.typography.fontFamily,
                              color: '#c2c2c2',
                            }}
                          >
                            {placeholder}
                          </Typography>
                        )}
                      </Stack>
                    )
                  );
                }
                return (
                  <Stack
                    flexDirection="row"
                    justifyContent="start"
                    alignItems="center"
                    gap={1}
                    position="start"
                  >
                    {imgSrc && (
                      <SvgColor
                        src={imgSrc}
                        sx={{
                          width: '24px',
                          height: '24px',
                          color: '#898989',
                        }}
                      />
                    )}
                    {prefix || ''}
                    {displayValue ? displayValue(selected) : selected}
                  </Stack>
                );
              }}
              error={!!error}
              {...other}
            >
              {children}
            </Select>
            <FormHelperText>{error ? error?.message : helperText}</FormHelperText>
          </FormControl>
        </ThemeProvider>
      )}
    />
  );
}
