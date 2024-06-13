import * as React from 'react';
// mui
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
// component
import { CustomToogleButtom } from '../custom-tooglle-button';
import useResponsive from '../../hooks/useResponsive';
// redux
import { dispatch } from '../../redux/store';
import { setSearchValue } from '../../redux/slices/search';

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: '#F1F5F9',
          },
          root: {
            borderRadius: '48px',
            paddingInline: '8px',
            backgroundColor: '#E8F0FE',
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: '#F1F5F9',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: '#F1F5F9',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#E8F0FE',
            borderRadius: '48px',
            '&:before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

export default function CustomizedInputsStyleOverrides() {
  const outerTheme = useTheme();
  const [search, setSearch] = React.useState('');

  const isMobile = useResponsive('down', 'sm');

  const handleOnChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      dispatch(setSearchValue(''));
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr',
          md: '1fr',
          lg: '1.5fr 1fr 1fr',
          xl: '1.5fr 1fr 1fr',
        },
        gap: 1,
        paddingBlock: '8px',
      }}
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          autoFocus
          fullWidth
          autoCapitalize="none"
          autoComplete="off"
          hiddenLabel
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: isMobile ? null : <CustomToogleButtom />,
          }}
          value={search}
          onChange={handleOnChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent form submission if TextField is within a form
              dispatch(setSearchValue(search));
            }
          }}
        />
        {isMobile ? <CustomToogleButtom /> : null}
      </ThemeProvider>
    </Box>
  );
}
