import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Iconify from '../iconify';

const ButtonContainer = styled('span')(({ theme, isScrollButtonVisible }) => ({
  position: 'fixed',
  bottom: '15%',
  right: 'calc(50vw - 32px)',
  alignItems: 'center',
  height: '64px',
  width: '64px',
  justifyContent: 'center',
  zIndex: 1000,
  cursor: 'pointer',
  animation: isScrollButtonVisible ? 'fadeIn 0.6s' : 'fadeOut 0.6s',
  opacity: isScrollButtonVisible ? 0.7 : 0,
  background: 'Black',
  borderRadius: '24px',
  transition: 'opacity 0.4s, color ease-in-out 0.2s, background ease-in-out 0.2s',
  display: isScrollButtonVisible ? 'flex' : 'none',
  '&:hover': {
    opacity: isScrollButtonVisible && 1,
  },
  '&::before': {
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
    borderRadius: '40%',
    background: 'black',
    opacity: 0,
    content: '" "',
    animation: 'pulse 2.5s linear infinite',
  },
  '&::after': {
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
    borderRadius: '40%',
    background: 'black',
    opacity: 0,
    content: '" "',
    animation: 'pulse1 2.5s linear infinite',
  },
  '@keyframes pulse': {
    from: {
      transform: 'scale(0.2)',
      opacity: 0.8,
    },
    to: {
      transform: 'scale(1.8)',
      opacity: 0,
    },
  },
  '@keyframes pulse1': {
    from: {
      transform: 'scale(0.4)',
      opacity: 0.8,
    },
    to: {
      transform: 'scale(2.2)',
      opacity: 0,
    },
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 0.7 },
  },
  '@keyframes fadeOut': {
    '0%': { opacity: 0.7 },
    '100%': { opacity: 0 },
  },
}));

const CustomScrollToBottom = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (
        showButton &&
        document.documentElement.scrollHeight - document.documentElement.clientHeight <
          window.pageYOffset + 120
      ) {
        setShowButton(false);
      } else if (
        !showButton &&
        document.documentElement.scrollHeight - document.documentElement.clientHeight >=
          window.pageYOffset + 120
      ) {
        setShowButton(true);
      }
    };

    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <ButtonContainer isScrollButtonVisible={showButton} onClick={scrollToTop}>
      <IconButton color="whtie" size="large">
        <Iconify
          icon="solar:double-alt-arrow-down-line-duotone"
          width={32}
          height={32}
          color="white"
        />
      </IconButton>
    </ButtonContainer>
  );
};

export default CustomScrollToBottom;
