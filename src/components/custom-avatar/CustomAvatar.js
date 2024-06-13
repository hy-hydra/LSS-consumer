import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Badge, Avatar } from '@mui/material';

// ----------------------------------------------------------------------

const getCharAtName = (name) => {
  if (name && name.split(' ')[1])
    return `${name.split(' ')[0].charAt(0).toUpperCase()}${name
      .split(' ')[1]
      .charAt(0)
      .toUpperCase()}`;
  return name && `${name.split(' ')[0].charAt(0).toUpperCase()}`;
};

const getColorByName = (name) => {
  if (
    [
      'A',
      'N',
      'H',
      'L',
      'Q',
      'F',
      'G',
      'T',
      'I',
      'J',
      'K',
      'D',
      'Y',
      'B',
      'O',
      'P',
      'E',
      'R',
      'S',
      'U',
      'V',
      'W',
      'X',
      'M',
      'Z',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
    ].includes(getCharAtName(name).charAt(0))
  )
    return 'primary';
  return 'default';
};

// ----------------------------------------------------------------------

const CustomAvatar = forwardRef(({ color, name = '', BadgeProps, children, sx, ...other }, ref) => {
  const theme = useTheme();

  const charAtName = getCharAtName(name);

  const colorByName = getColorByName(name);

  const colr = color || colorByName;

  const renderContent =
    colr === 'default' ? (
      <Avatar ref={ref} sx={sx} {...other}>
        {name && charAtName}
        {children}
      </Avatar>
    ) : (
      <Avatar
        ref={ref}
        sx={{
          color: theme.palette[colr]?.contrastText,
          backgroundColor: theme.palette[colr]?.main,
          fontWeight: theme.typography.fontWeightMedium,
          ...sx,
        }}
        {...other}
      >
        {name && charAtName}
        {children}
      </Avatar>
    );

  return BadgeProps ? (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...BadgeProps}
    >
      {renderContent}
    </Badge>
  ) : (
    renderContent
  );
});

CustomAvatar.propTypes = {
  sx: PropTypes.object,
  name: PropTypes.string,
  children: PropTypes.node,
  BadgeProps: PropTypes.object,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
};

export default CustomAvatar;
