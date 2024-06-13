import { useState } from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, IconButton, Link, Stack, Fab } from '@mui/material';
import { useTheme } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// hook
// eslint-disable-next-line import/no-unresolved
import useResponsive from 'src/hooks/useResponsive';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// redux
import { useDispatch } from '../../../redux/store';
import { addToCart } from '../../../redux/slices/product';
// components
import ProductCarousel from './ProductCarousel';
import { CustomAvatar, CustomAvatarGroup } from '../../../components/custom-avatar';
import CustomVariantSelection from '../../../components/custom-selection/CustomVariantSelection';
import axios from '../../../utils/axios';
// context
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const { id, name, variants, likes } = product;
  const { user, updateUser } = useAuthContext();

  const theme = useTheme();
  const dispatch = useDispatch();
  const [faveAdded, setFavAdded] = useState(
    Boolean(likes.map((like) => like.user.id === user.id)[0])
  );
  const [disableBtn, setDisableBtn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const mediaList = [...variants[variantIndex].media].sort((a, b) => a.index - b.index);

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

  const linkTo = PATH_PAGE.productDetails(paramCase(`${id}`));

  const handleAddCart = async () => {
    const newProduct = {
      id,
      name,
      cover: mediaList[0].url,
      price: variants[variantIndex].inventory.price,
      metadata: variants[variantIndex].metadeta,
      quantity: 1,
    };
    try {
      setDisableBtn(true);
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetFavAdd = async (flag) => {
    try {
      if (flag === true) await axios.post(`/users/like/products/${id}`);
      else await axios.delete(`/users/like/products/${id}`);
      setFavAdded(flag);
      updateUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        width: { xs: '100%', lg: '572px' },
        borderRadius: { xs: 0, md: 3 },
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
        ':hover': {
          boxShadow: '0 0 2px 0 rgba(100, 116, 139, 0.2), 1px 7px 30px -4px rgb(0 0 0 / 28%)',
        },
        p: 1,
      }}
      onMouseEnter={() => {
        setIsFocused(true);
      }}
      onMouseLeave={() => {
        setIsFocused(false);
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <ProductCarousel
          isFocused={isFocused}
          linkTo={linkTo}
          list={mediaList}
          sx={{
            borderRadius: { xs: 0, md: 3 },
            boxShadow: 'none',
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
        }}
      >
        <CustomVariantSelection variants={variants} selectVariants={setVariantIndex} />
      </Box>

      <Stack
        spacing={2}
        sx={{
          p: 3,
        }}
      >
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
            <CustomAvatarGroup key="medium" size={RESPONSIVE.SIZE} max={6} countmore>
              {likes.length === 0 ? (
                <CustomAvatar
                  key={Math.random()}
                  alt="like.user.username"
                  name="LLS"
                  sx={{
                    backgroundColor: '#232323',
                    color: 'white',
                  }}
                  src="/assets/lss_cute_puppy.png"
                />
              ) : (
                likes.map((like, index) => (
                  <CustomAvatar
                    key={index}
                    alt={like.user.username}
                    name={like.user.username}
                    sx={{
                      backgroundColor: like.user.avatar_url ? 'white' : '#232323 !important',
                      color: like.user.avatar_url
                        ? theme.palette.primary.contrastText
                        : 'white !important',
                      fontSize: '16px !important',
                      fontWeight: '600 !important',
                    }}
                    src={like.user.avatar_url}
                  />
                ))
              )}
            </CustomAvatarGroup>
            {likes.length > 5 ? <Box component="span">{likes.length - 5}+ Likes</Box> : null}
          </Stack>
          <Stack direction="row">
            {faveAdded ? (
              <IconButton aria-label="add to favorite" onClick={() => handleSetFavAdd(false)}>
                <FavoriteIcon sx={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
            ) : (
              <IconButton aria-label="remove from favorite" onClick={() => handleSetFavAdd(true)}>
                <FavoriteBorderIcon sx={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Stack justifyContent="start" spacing={1}>
          <Link
            component={NextLink}
            href={linkTo}
            color={theme.palette.primary.contrastText}
            variant="subtitle2"
            fontSize={RESPONSIVE.TITLE.FONTSIZE}
            fontWeight={RESPONSIVE.TITLE.FONTWEIGHT}
            noWrap
          >
            {name}
          </Link>
          <Box
            component="span"
            sx={{
              fontSize: RESPONSIVE.DESCRIPTION.FONTSIZE,
              fontWeight: 300,
              color: theme.palette.primary.contrastText,
            }}
          >
            {variants[variantIndex].description}
            {variants[variantIndex].description && (
              <Link
                sx={{
                  fontSize: RESPONSIVE.DESCRIPTION.FONTSIZE,
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText,
                }}
              >
                {' '}
                Read more
              </Link>
            )}
          </Box>
        </Stack>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 2 : ''}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: '2px' }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              typography: 'subtitle1',
              fontSize: RESPONSIVE.PRICE.FONTSIZE,
              fontWeight: 300,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Box component="span">{fCurrency(variants[variantIndex].inventory.price)}</Box>
          </Stack>
          {variants[variantIndex].inventory.price && (
            <Stack direction="row" spacing={1} sx={{ width: isMobile ? '100%' : 'inherit' }}>
              <Fab
                key={id}
                color="black"
                variant="outlinedExtended"
                sx={{
                  width: isMobile ? '100%' : 'inherit',
                  border: `1px solid ${theme.palette.primary.light}`,
                  fontWeight: 400,
                  fontSize: RESPONSIVE.BUTTON.FONTSIZE,
                  padding: RESPONSIVE.BUTTON.PADDING,
                }}
                disabled={disableBtn}
                onClick={handleAddCart}
              >
                Add To Bag
              </Fab>
              <Fab
                key="black"
                color="inherit"
                variant="extended"
                sx={{
                  width: isMobile ? '100%' : 'inherit',
                  border: `1px solid ${theme.palette.primary.darker}`,
                  backgroundColor: theme.palette.primary.darker,
                  color: theme.palette.grey[100],
                  fontWeight: 400,
                  fontSize: RESPONSIVE.BUTTON.FONTSIZE,
                  padding: RESPONSIVE.BUTTON.PADDING,
                  boxShadow: 'none',
                  ':hover': {
                    backgroundColor: theme.palette.primary.darker,
                  },
                }}
              >
                Buy now
              </Fab>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
