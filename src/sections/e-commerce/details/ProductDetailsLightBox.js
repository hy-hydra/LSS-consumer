import PropTypes from 'prop-types';
import { useState } from 'react';
// next
// import Head from 'next/head';
// @mui
import {
  Box,
  // Card,
  Grid,
  // Paper,
  // Stack,
  // Switch,
  // Container,
  // FormLabel,
  // FormControl,
  // FormControlLabel,
} from '@mui/material';
// routes
// import { PATH_PAGE } from '../../../../routes/paths';
// _mock
// import _mock from '../../../../_mock';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Image from '../../../components/image';
import Lightbox from '../../../components/lightbox';
// import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

// const imagesLightbox = [...Array(5)].map((_, index) => ({
//   src: _mock.image.cover(index + 1),
//   title: 'Flamingo',
//   description: 'Vicko Mozara \n Veliki zali, Dubravica, Croatia',
// }));

// ----------------------------------------------------------------------

DemoLightboxPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------
DemoLightboxPage.propTypes = {
  product: PropTypes.object,
};

export default function DemoLightboxPage({ product }) {
  const mediaList = [...product.variants[0].media].sort((a, b) => a.index - b.index);
  const imagesLightbox =
    product &&
    mediaList.map((image, index) => ({
      src: image.url,
      title: 'Flamingo',
      description: 'Vicko Mozara \n Veliki zali, Dubravica, Croatia',
    }));
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    disabledZoom: false,
    disabledVideo: false,
    disabledTotal: false,
    disabledCaptions: true,
    disabledSlideshow: false,
    disabledThumbnails: false,
    disabledFullscreen: false,
  });

  // const handleChange = (event) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const [selectedImage, setSelectedImage] = useState(-1);

  const handleOpenBasic = (imageUrl) => {
    const imageIndex = imagesLightbox.findIndex((image) => image.src === imageUrl);
    setSelectedImage(imageIndex);
  };

  const handleCloseBasic = () => {
    setSelectedImage(-1);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Box
            display="grid"
            gridTemplateColumns={{
              sm: 'repeat(1, 1fr)',
              md: 'repeat(1, 1fr)',
              lg: 'repeat(1, 1fr)',
              xl: 'repeat(1, 1fr)',
            }}
            mb={2}
          >
            {imagesLightbox.map(
              (img, index) =>
                index === 0 && (
                  <Image
                    key={img.src}
                    alt={img.src}
                    src={img.src}
                    ratio="1/1"
                    onClick={() => handleOpenBasic(img.src)}
                    sx={{
                      borderRadius: { sm: 0, md: 3, lg: 3, xl: 3 },
                      cursor: 'pointer',
                    }}
                  />
                )
            )}
          </Box>
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)',
              xl: 'repeat(2, 1fr)',
            }}
          >
            {imagesLightbox.map(
              (img, index) =>
                index !== 0 && (
                  <Image
                    key={img.src}
                    alt={img.src}
                    src={img.src}
                    ratio="1/1"
                    onClick={() => handleOpenBasic(img.src)}
                    sx={{
                      borderRadius: { sm: 0, md: 3, lg: 3, xl: 3 },
                      cursor: 'pointer',
                    }}
                  />
                )
            )}
          </Box>
        </Grid>
      </Grid>

      <Lightbox
        disabledZoom={state.disabledZoom}
        disabledTotal={state.disabledTotal}
        disabledVideo={state.disabledVideo}
        disabledCaptions={state.disabledCaptions}
        disabledSlideshow={state.disabledSlideshow}
        disabledThumbnails={state.disabledThumbnails}
        disabledFullscreen={state.disabledFullscreen}
        index={selectedImage}
        open={selectedImage >= 0}
        close={handleCloseBasic}
        slides={[
          ...imagesLightbox,
          {
            type: 'video',
            width: 1280,
            height: 720,
            poster:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
            sources: [
              {
                src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                type: 'video/mp4',
              },
            ],
          },
        ]}
      />
    </>
  );
}
