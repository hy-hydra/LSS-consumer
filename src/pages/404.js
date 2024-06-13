import { m } from 'framer-motion';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/system';
import { Button, Typography } from '@mui/material';
// layouts
import CompactLayout from '../layouts/compact';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

Page404.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page404() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Long Story Short | 404 Page Not Found</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph sx={{ color: theme.palette.primary.contrastText }}>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: theme.palette.primary.contrastText }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <m.div
          variants={varBounce().in}
          style={{ height: '150px', marginTop: '40px', marginBottom: '80px' }}
        >
          <PageNotFoundIllustration
            sx={{
              opacity: 0.9,
              height: 300,
              margin: 'auto',
              my: { xs: 2, sm: 4 },
              maxHeight: '500px',
            }}
          />
        </m.div>

        <Button
          component={NextLink}
          href="/"
          size="large"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            color: 'white',
            borderRadius: '48px',
          }}
        >
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
