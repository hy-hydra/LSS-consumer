import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Menu, MenuItem, Typography, Box, Badge } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { makeVariantsSelectionTitle } from '../../utils/formatString';

CustomVariantSelection.propTypes = {
  variants: PropTypes.array,
  selectVariants: PropTypes.func,
};

export default function CustomVariantSelection({ variants, selectVariants }) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(null);
  const [item, setItem] = useState(0);

  const isTabletL = useResponsive('between', 'md', 'lg');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const handleOpen = (e) => {
    setIsOpen(e.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleSelect = (index) => {
    setIsOpen(null);
    setItem(index);
    selectVariants(index);
  };

  return (
    <>
      {variants.length > 1 &&
        (isMobile || isTabletL ? (
          <Badge
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: 'black',
                color: 'white',
                position: 'absolute',
                top: '6px',
                right: '6px',
                borderRadius: '48px',
                height: '24px',
                width: '24px',
              },
            }}
            badgeContent={makeVariantsSelectionTitle(variants.length)}
          >
            <Button
              variant="contained"
              endIcon={isOpen ? <ExpandLessIcon width="16px" /> : <ExpandMoreIcon width="16px" />}
              onClick={(e) => handleOpen(e)}
              sx={{
                py: '10px',
                px: '14px',
                display: 'flex',
                borderRadius: 10,
                width: isMobile ? '90%' : 'inherit',
                color: theme.palette.primary.contrastText,
                border: '1px solid #E2E8F0',
                backgroundColor: 'white',
                ':hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              <Box component="img" src="/assets/icons/products/ic_variants.svg" />
            </Button>
          </Badge>
        ) : (
          <Button
            variant="contained"
            endIcon={isOpen ? <ExpandLessIcon width="16px" /> : <ExpandMoreIcon width="16px" />}
            onClick={(e) => handleOpen(e)}
            sx={{
              py: '10px',
              px: '14px',
              display: 'flex',
              borderRadius: 10,
              width: 'inherit',
              color: theme.palette.primary.contrastText,
              border: '1px solid #E2E8F0',
              backgroundColor: 'white',
              ':hover': {
                backgroundColor: 'white',
              },
            }}
          >
            <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>
              {makeVariantsSelectionTitle(variants.length)}&nbsp;
            </Typography>
            <Typography sx={{ fontWeight: '400', fontSize: '16px' }}>
              {variants.length === 1 ? 'Variant' : 'Variants'}
            </Typography>
          </Button>
        ))}

      <Menu
        defaultValue={0}
        keepMounted
        id="simple-menu"
        anchorEl={isOpen}
        onClose={handleClose}
        open={Boolean(isOpen)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            mt: '5px !important',
            borderRadius: '16px',
            px: '8px',
            width: { xs: '128px', lg: '180px' },
          },
        }}
      >
        {variants.map((_, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelect(index)}
            sx={{
              borderRadius: '16px',
              padding: '13px 16px',
              ...(item === index && {
                bgcolor: theme.palette.primary.contrastText,
                color: theme.palette.grey[100],
              }),
              '&:hover': {
                bgcolor: theme.palette.primary.contrastText,
                color: theme.palette.grey[100],
              },
            }}
          >
            Variant {makeVariantsSelectionTitle(index + 1)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
