import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
// @emotion
import createEmotionServer from '@emotion/server/create-instance';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import palette from '../theme/palette';
import { primaryFont } from '../theme/typography';

// ----------------------------------------------------------------------

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={primaryFont.className}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />

          {/* PWA primary color */}
          <meta name="theme-color" content={palette('light').primary.main} />

          {/* Favicon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

          {/* Emotion */}
          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}

          {/* Meta */}
          <meta
            name="description"
            content="Long Story Short brings together the thrill of social media and the excitement of online shopping. Ignite meaningful conversations, sponsor your friends, buy unique products, and share valuable feedback, all in one place. Our platform is all about simplifying your e-commerce experience, making it more social, more interactive, and a lot more fun!"
          />
          <meta name="keywords" content="social,ecommerce,shopping,long story short,lss,l-s-s,luxury,gift,sponsorship,best,material,kit,application,platform,Long Story Short,Social Ecommerce,Buy and Share,Shopping Online,Social Shopping,Online buys,Shopping Community,Product Reviews,Social Product Feedback,Crowd Sourced Shopping,Digital Market Place,Sponsored Shopping,Shop Socially,Social Media and Shopping,Social Ecommerce Platform,Online Shopping Community,Ecommerce User Reviews,Conversational Ecommerce,Sponsored Ecommerce" />
          <meta name="author" content="Long Story Short" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
