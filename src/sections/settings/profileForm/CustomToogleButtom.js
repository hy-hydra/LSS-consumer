// import PropTypes from 'prop-types';
import * as React from 'react';
// form
// import { useFormContext, Controller } from 'react-hook-form';
// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// CustomToogleButtom.propTypes = {
//   name: PropTypes.string,
// };

export default function CustomToogleButtom({ ...other }) {
  // const methods = useFormContext();
  // const { control, setValue } = methods;

  const responsiveWidth = '96px';

  const [isPublic, setIsPublic] = React.useState(other.defaultValue);

  React.useEffect(() => {
    other.setPrivate(isPublic);
  }, [isPublic, other]);

  return (
    <Box
      className="custom-toogle"
      sx={{
        display: 'flex',
      }}
    >
      <Box
        className="mask-box"
        sx={{
          display: 'flex',
          borderRadius: '41px',
          border: '1px solid #bdbdbd',
          padding: '4px',
          color: '#64748B',
          textTransform: 'none',
          position: 'relative',
          background: 'transparent',
          width: '200px',
          '& .MuiButton-root': {
            borderRadius: '41px',
            width: '100px',
            height: '41px',
            transition: 'all 0.2s 0.1s ease',
            fontSize: '14px',
            fontWeight: 400,
          },
          '& .MuiButton-root:hover': {
            opacity: 0.8,
          },
        }}
      >
        <Box
          className="mask"
          sx={{
            backgroundColor: '#0F172A',
            boxShadow: '1px 1px 2px #00000096',
            borderRadius: '41px',
            transform: `translateX(${isPublic === false ? 0 : responsiveWidth})`,
            width: '92px',
            height: '41px',
            padding: '10px 20px',
            position: 'absolute',
            transition: 'all 0.5s ease',
          }}
        />
        <Button
          disableRipple
          variant="text"
          fullWidth
          sx={{
            color: isPublic === false ? '#FFFFFF' : '#64748B',
            textTransform: 'none',
          }}
          onClick={() => {
            setIsPublic(false);
          }}
        >
          Private
        </Button>
        <Button
          fullWidth
          disableRipple
          variant="text"
          sx={{
            color: isPublic === true ? '#FFFFFF' : '#64748B',
            textTransform: 'none',
          }}
          onClick={() => {
            setIsPublic(true);
          }}
        >
          Public
        </Button>
      </Box>
    </Box>
  );
}
