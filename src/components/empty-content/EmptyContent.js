import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Link } from '@mui/material';
//
import Image from '../image';

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  sx: PropTypes.object,
  img: PropTypes.string,
  gotoText: PropTypes.string,
  goto: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function EmptyContent({ title, description, img, gotoText, goto, sx, ...other }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        textAlign: 'center',
        p: (theme) => theme.spacing(8, 2),
        ...sx,
      }}
      {...other}
    >
      <Image
        disabledEffect
        alt="empty content"
        src={img || '/assets/illustrations/illustration_empty_content.svg'}
        sx={{ height: 208, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
      <Link
        href={goto}
        sx={{
          cursor: 'pointer',
          textDecorationLine: 'underline',
          ':hover': {
            color: 'Black',
          },
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '21px',
          textAlign: 'center',
          mt: 1,
        }}
      >
        {gotoText}
      </Link>
    </Stack>
  );
}
