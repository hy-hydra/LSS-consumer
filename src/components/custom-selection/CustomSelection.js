import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Link, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// hooks
import useResponsive from '../../hooks/useResponsive';

CustomSelection.propTypes = {
  isCategory: PropTypes.bool,
  selectionList: PropTypes.array,
  onSelect: PropTypes.func,
};

export default function CustomSelection({ isCategory, selectionList, onSelect }) {
  const theme = useTheme();

  const [item, setItem] = useState(selectionList[0]);
  const [isOpen, setIsOpen] = useState(null);
  const { pathname } = useRouter();
  const isSettingPage = pathname.includes('settings');

  useEffect(() => {
    if (isSettingPage === true) {
      const activePage = selectionList.filter((selectItem) =>
        selectItem.path.includes(pathname)
      )[0];
      setItem(activePage);
    } else {
      setItem(selectionList[0]);
    }
  }, [isSettingPage, pathname, selectionList]);

  const isMobile = useResponsive('between', 'xs', 'sm');

  const handleOpen = (e) => {
    setIsOpen(e.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleSelect = (index) => {
    setIsOpen(null);
    if (!isCategory) {
      setItem(selectionList[index]);
    } else {
      const selectedCategory = selectionList.filter((selectedItem) => selectedItem.id === index)[0];
      setItem(selectedCategory);
      onSelect(selectedCategory.id);
    }
  };

  return (
    <>
      <Button
        variant="text"
        endIcon={isOpen ? <ExpandLessIcon width="24px" /> : <ExpandMoreIcon width="24px" />}
        onClick={(e) => handleOpen(e)}
        sx={{
          paddingInline: 3,
          fontSize: { xl: 24, lg: 24, md: 20, sm: 20, xs: 18 },
          fontWeight: 600,
          color: theme.palette.primary.contrastText,
          borderRadius: 6,
          width: isMobile ? '90%' : 'inherit',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'fixed',
        }}
      >
        {isCategory ? item?.name : item.title}
      </Button>
      <Menu
        defaultValue={isCategory ? item?.id : item.title}
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
            top: {
              xs: '120px !important',
              sm: '140px !important',
              md: '140px !important',
              lg: '80px !important',
            },
            borderRadius: '16px',
            paddingInline: '8px',
            width: {
              xs: '100%',
              sm: 'inherit',
            },
          },
        }}
      >
        {selectionList &&
          selectionList?.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => handleSelect(isCategory ? option?.id : index)}
              sx={{
                borderRadius: '16px',
                padding: '13px 16px',
                minWidth: '244px',
                ...(!isCategory &&
                  item?.title === option?.title && {
                    bgcolor: theme.palette.primary.contrastText,
                    color: theme.palette.grey[200],
                  }),
                ...(isCategory &&
                  item?.id === option?.id && {
                    bgcolor: theme.palette.primary.contrastText,
                    color: theme.palette.grey[200],
                  }),
                '&:hover': {
                  bgcolor: theme.palette.primary.contrastText,
                  color: theme.palette.grey[100],
                },
              }}
            >
              {isCategory === true ? (
                option.name
              ) : (
                <Link
                  component={NextLink}
                  href={option.path}
                  underline="none"
                  sx={{
                    width: '100%',
                    ...(item?.title === option.title &&
                      !isCategory && {
                        color: theme.palette.secondary.contrastText,
                      }),
                  }}
                >
                  {option.title}
                </Link>
              )}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
