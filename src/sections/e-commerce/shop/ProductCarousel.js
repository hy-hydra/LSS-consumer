import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Link } from '@mui/material';
// next
import NextLink from 'next/link';
// utils
// import { bgGradient } from '../../../../utils/cssStyles';
// components
import Image from '../../../components/image';
import Carousel, { CarouselDots } from '../../../components/carousel';

// ----------------------------------------------------------------------

ProductCarousel.propTypes = {
  list: PropTypes.array,
  linkTo: PropTypes.string,
  isFocused: PropTypes.bool,
};

export default function ProductCarousel({ list, linkTo, isFocused, ...other }) {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const slickPause = () => {
    carouselRef.current?.slickPause();
    carouselRef.current?.slickGoTo(0);
  };

  const slickPlay = () => {
    carouselRef.current?.slickPlay();
  };

  useEffect(() => {
    if (isFocused) {
      slickPlay();
    } else {
      slickPause();
    }
  }, [isFocused]);

  const carouselSettings = {
    autoplaySpeed: 2000,
    speed: 500,
    dots: true,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: {
        right: 'calc(50% - 37px)',
        bottom: 14,
        width: 74,
        color: theme.palette.primary.contrastText,
        position: 'absolute',
        '& li .css-1wxwoiw-MuiStack-root .css-mkgmya': {
          width: {
            xs: '8px',
            sm: '10px',
            md: '8px',
            lg: '10px',
            xl: '10px',
          },
          height: {
            xs: '8px',
            sm: '10px',
            md: '8px',
            lg: '10px',
            xl: '10px',
          },
        },
      },
    }),
  };

  return (
    <Card {...other}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((item, index) => (
          <CarouselItem key={index} item={item.url} linkTo={linkTo} />
        ))}
      </Carousel>
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.string,
  linkTo: PropTypes.string,
};

function CarouselItem({ item, linkTo }) {
  // const { image, name } = item;

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      />
      <Link component={NextLink} href={linkTo}>
        <Image
          alt={item}
          src={item}
          ratio="1/1"
          sx={{
            height: { xs: 677, sm: 677, md: 320, lg: 320, xl: 320 },
            borderRadius: {
              xs: 0,
              sm: 0,
              md: 0,
              lg: 1.5,
              xl: 1.5,
            },
          }}
        />
      </Link>
    </Box>
  );
}
