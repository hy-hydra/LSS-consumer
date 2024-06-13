import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// components
import Image from '../../../components/image';
import Lightbox from '../../../components/lightbox';
import Carousel, { CarouselDots } from '../../../components/carousel';

// ----------------------------------------------------------------------

ProductDetailsCarousel.propTypes = {
  product: PropTypes.object,
};

export default function ProductDetailsCarousel({ product }) {
  const theme = useTheme();

  const carousel1 = useRef(null);

  const carousel2 = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [nav1, setNav1] = useState();

  const [nav2, setNav2] = useState();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState(-1);

  const imagesLightbox = [...product.variants[0].media]
    .sort((a, b) => a.index - b.index)
    .map((img) => ({ src: img.url }));

  const handleOpenLightbox = (imageUrl) => {
    const imageIndex = imagesLightbox.findIndex((image) => image.src === imageUrl);
    setSelectedImage(imageIndex);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(-1);
  };

  const carouselSettings1 = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
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

  // const carouselSettings2 = {
  //   dots: false,
  //   arrows: false,
  //   centerMode: true,
  //   swipeToSlide: true,
  //   focusOnSelect: true,
  //   variableWidth: true,
  //   centerPadding: '0px',
  //   slidesToShow: product.images.length > 3 ? 3 : product.images.length,
  // };

  useEffect(() => {
    if (carousel1.current) {
      setNav1(carousel1.current);
    }
    if (carousel2.current) {
      setNav2(carousel2.current);
    }
  }, []);

  useEffect(() => {
    carousel1.current?.slickGoTo(currentIndex);
  }, [currentIndex]);

  // const handlePrev = () => {
  //   carousel2.current?.slickPrev();
  // };

  // const handleNext = () => {
  //   carousel2.current?.slickNext();
  // };

  const renderLargeImg = (
    <Box sx={{ mb: 3, overflow: 'hidden', position: 'relative' }}>
      <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}>
        {[...product.variants[0].media]
          .sort((a, b) => a.index - b.index)
          .map((img) => (
            <Image
              key={img}
              alt="product"
              src={img.url}
              ratio="1/1"
              onClick={() => handleOpenLightbox(img)}
              sx={{
                cursor: 'zoom-in',
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
          ))}
      </Carousel>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          '& .slick-slide': {
            float: theme.direction === 'rtl' ? 'right' : 'left',
          },
        }}
      >
        {renderLargeImg}
      </Box>

      <Lightbox
        index={selectedImage}
        slides={imagesLightbox}
        open={selectedImage >= 0}
        close={handleCloseLightbox}
        onGetCurrentIndex={(index) => setCurrentIndex(index)}
      />
    </>
  );
}
