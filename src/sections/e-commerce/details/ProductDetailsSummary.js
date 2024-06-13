import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
// @mui
import {
  Box,
  // Link,
  Stack,
  Button,
  // Rating,
  // Divider,
  // MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/system';

// routes
import { PATH_PAGE } from '../../../routes/paths';
// hook
// eslint-disable-next-line import/no-unresolved
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// _mock
import { _metadata } from '../../../_mock/arrays';
import _mock from '../../../_mock';
// components
// import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
// import { IncrementerButton } from '../../../components/custom-input';
// import { ColorSinglePicker } from '../../../components/color-utils';
import FormProvider from '../../../components/hook-form';
import { CustomAvatar, CustomAvatarGroup } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  product: PropTypes.object,
  onGotoStep: PropTypes.func,
};

const COLORS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({ cart, product, onAddCart, onGotoStep, ...other }) {
  const { push } = useRouter();

  const theme = useTheme();

  const [faveAdded, setFavAdded] = useState(false);
  // const [disableBtn, setDisableBtn] = useState(false);

  const { id, name, variants, likes } = product;

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const RESPONSIVE = {
    SIZE: 'medium',
    TITLE: {
      FONTSIZE: 24,
      FONTWEIGHT: 600,
    },
    DESCRIPTION: {
      FONTSIZE: 14,
    },
    PRICE: {
      FONTSIZE: 32,
    },
    BUTTON: {
      FONTSIZE: 16,
      PADDING: '14px 20px',
    },
  };

  if (isDesktopL) {
    RESPONSIVE.SIZE = 'medium';
    RESPONSIVE.TITLE.FONTSIZE = 24;
    RESPONSIVE.TITLE.FONTWEIGHT = 600;
    RESPONSIVE.DESCRIPTION.FONTSIZE = 14;
    RESPONSIVE.PRICE.FONTSIZE = 32;
    RESPONSIVE.BUTTON.FONTSIZE = 16;
    RESPONSIVE.BUTTON.PADDING = '14px 20px';
  }
  if (isDesktopN) {
    RESPONSIVE.SIZE = 'medium';
    RESPONSIVE.TITLE.FONTSIZE = 24;
    RESPONSIVE.TITLE.FONTWEIGHT = 600;
    RESPONSIVE.DESCRIPTION.FONTSIZE = 14;
    RESPONSIVE.PRICE.FONTSIZE = 32;
    RESPONSIVE.BUTTON.FONTSIZE = 16;
    RESPONSIVE.BUTTON.PADDING = '14px 20px';
  }
  if (isTabletL) {
    RESPONSIVE.SIZE = 'small';
    RESPONSIVE.TITLE.FONTSIZE = 18;
    RESPONSIVE.TITLE.FONTWEIGHT = 600;
    RESPONSIVE.DESCRIPTION.FONTSIZE = 12;
    RESPONSIVE.PRICE.FONTSIZE = 24;
    RESPONSIVE.BUTTON.FONTSIZE = 12;
    RESPONSIVE.BUTTON.PADDING = '12px 16px';
  }
  if (isTabletP) {
    RESPONSIVE.SIZE = 'medium';
    RESPONSIVE.TITLE.FONTSIZE = 24;
    RESPONSIVE.TITLE.FONTWEIGHT = 600;
    RESPONSIVE.DESCRIPTION.FONTSIZE = 14;
    RESPONSIVE.PRICE.FONTSIZE = 32;
    RESPONSIVE.BUTTON.FONTSIZE = 16;
    RESPONSIVE.BUTTON.PADDING = '14px 20px';
  }
  if (isMobile) {
    RESPONSIVE.SIZE = 'small';
  }

  const alreadyProduct = cart.map((item) => item.id).includes(id);

  // const isMaxQuantity =
  //   cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= variants[0].is_active;

  const defaultValues = {
    id,
    name,
    variants,
    likes,
  };

  const methods = useForm({
    defaultValues,
  });

  // const { reset, watch, control, setValue, handleSubmit } = methods;
  const { reset, handleSubmit } = methods;

  // const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = async (data) => {
    try {
      if (!alreadyProduct) {
        onAddCart({
          id,
          name,
          cover: [...variants[0].media].sort((a, b) => a.index - b.index)[0].url,
          price: variants[0].inventory.price,
          metadata: variants[0].metadeta,
          quantity: 1,
        });
      }
      onGotoStep(0);
      push(PATH_PAGE.eCommerce.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async () => {
    try {
      // setDisableBtn(true);
      onAddCart({
        id,
        name,
        cover: [...variants[0].media].sort((a, b) => a.index - b.index)[0].url,
        price: variants[0].inventory.price,
        metadata: variants[0].metadeta,
        quantity: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} {...other}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="start"
            spacing={1}
            sx={{
              alignItems: 'center',
              fontSize: {
                xs: '12px',
                sm: '14px',
                md: '12px',
                lg: '14px',
                xl: '14px',
              },
              color: theme.palette.primary.contrastText,
            }}
          >
            <CustomAvatarGroup key="medium" size={RESPONSIVE.SIZE} max={6}>
              {COLORS.map((color, index) => (
                <CustomAvatar key={index} alt="Remy Sharp" src={_mock.image.avatar(index + 1)} />
              ))}
            </CustomAvatarGroup>
            <Box component="span">{COLORS.length - 5}+ Likes</Box>
          </Stack>
          <Stack direction="row">
            {faveAdded ? (
              <IconButton aria-label="add to favorite" onClick={() => setFavAdded(false)}>
                <FavoriteIcon sx={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
            ) : (
              <IconButton aria-label="remove from favorite" onClick={() => setFavAdded(true)}>
                <FavoriteBorderIcon sx={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography
            variant="h4"
            fontSize={24}
            fontWeight={600}
            color={theme.palette.primary.contrastText}
          >
            {name}
          </Typography>
          <Typography
            variant="Subtitle"
            fontSize={16}
            fontWeight={500}
            color={theme.palette.primary.contrastText}
          >
            {product && product.category && product.category.name}
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          {_metadata
            .sort((a, b) => a.index - b.index)
            .map((metadata) => (
              <Stack
                key={metadata.id}
                direction="row"
                alignItems="center"
                justifyContent="start"
                gap={1}
                color={theme.palette.primary.darker}
              >
                <Typography variant="body">{metadata.field}:</Typography>
                <Typography variant="subtitle1">{metadata.value}</Typography>
              </Stack>
            ))}
        </Stack>

        <Typography
          variant="h4"
          fontSize={32}
          fontWeight={300}
          color={theme.palette.primary.contrastText}
        >
          {variants[0].inventory.price && (
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
            >
              {/* {fCurrency(variants[0].inventory.price)} */}
            </Box>
          )}
          {fCurrency(variants[0].inventory.price)}
        </Typography>

        <Stack direction="column" spacing={1.5}>
          <Button
            fullWidth
            // disabled={isMaxQuantity || disableBtn}
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-add-shopping-cart" />}
            onClick={handleAddCart}
            sx={{
              whiteSpace: 'nowrap',
              padding: '12px 20px',
              borderRadius: 6,
              border: `1px solid ${theme.palette.primary.light}`,
              bgcolor: theme.palette.grey[0],
              color: theme.palette.primary.contrastText,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Add to Bag
          </Button>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              whiteSpace: 'nowrap',
              padding: '12px 20px',
              borderRadius: 6,
              border: `1px solid ${theme.palette.primary.light}`,
              bgcolor: theme.palette.primary.darker,
              color: theme.palette.grey[100],
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                color: theme.palette.grey[100],
              },
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Buy Now
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
