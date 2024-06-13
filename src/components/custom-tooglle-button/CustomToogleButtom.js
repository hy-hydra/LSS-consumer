import * as React from 'react';
// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { setSearchType } from '../../redux/slices/search';
// hook
import useResponsive from '../../hooks/useResponsive';

export default function CustomToogleButtom() {
  const { searchType } = useSelector((state) => state.search);
  const [subType, setSubType] = React.useState(searchType);

  const dispatch = useDispatch();

  const isMobile = useResponsive('down', 'sm');
  const responsiveWidth = isMobile ? '96%' : '96px';

  const onSetPeople = () => {
    setSubType('people');
    dispatch(setSearchType('people'));
  };

  const onSetProduct = () => {
    setSubType('products');
    dispatch(setSearchType('products'));
  };
  return (
    <Box
      className="custom-toogle"
      sx={{
        display: 'flex',
      }}
    >
      <Box
        className="mask-box"
        sx={{
          display: 'flex',
          borderRadius: '41px',
          border: isMobile ? '1px solid #bdbdbd' : null,
          padding: '4px',
          color: '#64748B',
          textTransform: 'none',
          position: 'relative',
          background: 'transparent',
          width: isMobile ? '100%' : '200px',
          '& .MuiButton-root': {
            borderRadius: '41px',
            width: isMobile ? '100%' : '100px',
            height: '41px',
            transition: 'all 0.2s 0.1s ease',
            fontSize: '14px',
            fontWeight: 400,
          },
          '& .MuiButton-root:hover': {
            opacity: 0.8,
          },
        }}
      >
        <Box
          className="mask"
          sx={{
            backgroundColor: '#0F172A',
            boxShadow: '1px 1px 2px #00000096',
            borderRadius: '41px',
            transform: `translateX(${subType === 'products' ? 0 : responsiveWidth})`,
            width: isMobile ? '50%' : '100px',
            height: '41px',
            padding: '10px 20px',
            position: 'absolute',
            transition: 'all 0.5s ease',
          }}
        />
        <Button
          disableRipple
          variant="text"
          fullWidth
          sx={{
            color: subType === 'products' ? '#FFFFFF' : '#64748B',
            textTransform: 'none',
          }}
          onClick={onSetProduct}
        >
          Products
        </Button>
        <Button
          fullWidth
          disableRipple
          variant="text"
          sx={{
            color: subType === 'people' ? '#FFFFFF' : '#64748B',
            textTransform: 'none',
          }}
          onClick={onSetPeople}
        >
          People
        </Button>
      </Box>
    </Box>
  );
}
