import { memo } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function PageNotFoundIllustration({ ...other }) {
  return <Box {...other} component="img" src="/assets/404.gif" alt="404 not found" />;
}

export default memo(PageNotFoundIllustration);
