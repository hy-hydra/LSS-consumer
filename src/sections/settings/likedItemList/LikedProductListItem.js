import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Typography, Link, Button } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// redux
import { useDispatch } from '../../../redux/store';
import { addToCart } from '../../../redux/slices/product';
// components
import Image from '../../../components/image';

// ----------------------------------------------------------------------

LikedProductListItem.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
};

export default function LikedProductListItem({ row, onDelete }) {
  // const { name, cover, price, colors, available } = row;

  const dispatch = useDispatch();
  const [disableBtn, setDisableBtn] = React.useState(false);

  const handleAddCart = async () => {
    const newProduct = {
      id: row.id || 0,
      name: row.name || '',
      cover: row.cover || '',
      available: row.available || false,
      price: row.price || 0,
      colors: row.colors ? [row.colors[0]] : 'white',
      // size: sizes[0],
      quantity: 1,
    };
    try {
      setDisableBtn(true);
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image
          alt="product image"
          src={(row && row.variants[0].media.sort((a, b) => a.index - b.index)[0].url) || ''}
          sx={{
            width: 92,
            height: 92,
            borderRadius: 2.5,
            mr: 3,
          }}
        />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            flex: 1,
          }}
        >
          <Typography
            noWrap
            variant="subtitle1"
            sx={{
              fontSize: 20,
              fontWeight: 600,
              maxWidth: { xs: 220, sm: 180, md: 360, lg: 260, xl: 260 },
            }}
          >
            {(row && row.name) || ''}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Link
              onClick={onDelete}
              sx={{ fontSize: 14, fontWeight: 500, color: '#EF4444', cursor: 'pointer' }}
            >
              Remove from liked
            </Link>
            <Box
              align="right"
              sx={{
                fontSize: { xs: 20, md: 24 },
                fontWeight: 300,
                display: { xs: 'flex', sm: 'none' },
              }}
            >
              {fCurrency((row && row.price) || 0)}
            </Box>
          </Stack>
        </Stack>

        <Stack
          flex
          flexDirection="row"
          justifyContent="space-between"
          gap={2}
          alignItems="center"
          sx={{
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Box
            align="right"
            sx={{
              fontSize: { xs: 20, md: 24 },
              fontWeight: 300,
            }}
          >
            {fCurrency((row && row.price) || 0)}
          </Box>
          <Button
            variant="outlined"
            sx={{
              color: '#0F172A',
              borderRadius: 20,
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 400,
              padding: { xs: '8px 16px', sm: '10px 16px' },
              width: { xs: '50%', sm: 'fit-content' },
            }}
            onClick={handleAddCart}
            disabled={disableBtn}
          >
            Add to Bag
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#0F172A',
              color: 'white',
              borderRadius: 20,
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 400,
              padding: { xs: '8px 16px', sm: '10px 16px' },
              width: { xs: '50%', sm: 'fit-content' },
            }}
          >
            Buy Now
          </Button>
        </Stack>
      </Box>
      <Stack
        gap={1}
        alignItems="start"
        sx={{
          width: '100%',
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: '#0F172A',
            borderRadius: 20,
            fontSize: { xs: 14, sm: 16 },
            fontWeight: 400,
            padding: { xs: '8px 16px', sm: '10px 16px' },
            width: { xs: '50%', sm: 'fit-content' },
          }}
          onClick={handleAddCart}
        >
          Add to Bag
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#0F172A',
            color: 'white',
            borderRadius: 20,
            fontSize: { xs: 14, sm: 16 },
            fontWeight: 400,
            padding: { xs: '8px 16px', sm: '10px 16px' },
            width: { xs: '50%', sm: 'fit-content' },
          }}
        >
          Buy Now
        </Button>
      </Stack>
    </Stack>
  );
}
