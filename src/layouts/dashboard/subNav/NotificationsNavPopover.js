import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useCallback, useEffect, useState } from 'react';
// @mui
import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  Avatar,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import { useTheme } from '@mui/system';
// import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
// utils
import { fToNow } from '../../../utils/formatTime';
import { NAV } from '../../../config-global';
// _mock_
// import { _notifications } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const theme = useTheme();

  // const [openPopover, setOpenPopover] = useState(null);

  // const [notifications, setNotifications] = useState(_notifications);

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(async () => {
    const resData = await axios.get('/notifications/');
    setNotifications(resData.data);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  // const handleOpenPopover = (event) => {
  //   setOpenPopover(event.currentTarget);
  // };

  // const handleClosePopover = () => {
  //   setOpenPopover(null);
  // };

  // const handleMarkAllAsRead = () => {
  //   setNotifications(
  //     notifications.map((notification) => ({
  //       ...notification,
  //       isUnRead: false,
  //     }))
  //   );
  // };

  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '0 !important',
        left: {
          xl: `${NAV.W_DASHBOARD_MINI}px !important`,
          lg: `${NAV.W_DASHBOARD_MINI}px !important`,
          md: '0px',
          sm: '0px',
          xs: '0px',
        },
        width: { xl: 360, lg: 360, md: 360, sm: '100%', xs: '100%' },
        height: '100% !important',
        maxHeight: '100%',
        pt: { xl: 14.5, lg: 14.5, md: 12, sm: 12, xs: 10.25 },
        px: { xl: 0, lg: 0, md: 0, sm: 16, xs: 0 },
        borderRadius: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
        zIndex: 999,
        background: theme.palette.grey[0],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pt: { xl: '16px', lg: '11px', md: '0px', sm: '0px', xs: '0px' },
          pb: 6,
          px: { xl: 3, lg: 3, md: 3, sm: 0, xs: 3 },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontFamily={600}
            color={theme.palette.primary.contrastText}
            sx={{ fontSize: { xs: 20, sm: 20, md: 20, lg: 24, xl: 24 } }}
          >
            Notifications
          </Typography>

          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            You have {totalUnRead} unread messages
          </Typography> */}
        </Box>

        {/* <Tooltip title="Mark all as read">
          <span>
            <IconButton onClick={handleMarkAllAsRead} disabled={totalUnRead === 0}>
              <MarkChatReadIcon sx={{ color: theme.palette.primary.darker }} />
            </IconButton>
          </span>
        </Tooltip> */}
      </Box>

      <Scrollbar sx={{ height: '100%' }}>
        {/* <List
          disablePadding
          // subheader={
          //   <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
          //     New
          //   </ListSubheader>
          // }
        >
          {notifications.slice(0, 2).map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </List> */}

        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{
                py: 1,
                px: 2.5,
                // typography: 'overline',
                fontSize: 18,
                color: theme.palette.primary.contrastText,
              }}
            >
              Earlier
            </ListSubheader>
          }
        >
          {notifications.slice(2, 5).map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </List>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 1 }}>
        <Button fullWidth disableRipple>
          View All
        </Button>
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.node,
    type: PropTypes.string,
    title: PropTypes.string,
    isUnRead: PropTypes.bool,
    description: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        // ...(notification.isUnRead && {
        //   bgcolor: 'action.selected',
        // }),
      }}
    >
      {notification.isUnRead && (
        <ListItemAvatar>
          <Badge
            color="info"
            variant="dot"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              '& .MuiBadge-badge': {
                border: '1px solid #ff0000',
                background: '#ff000066',
              },
            }}
          >
            <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
          </Badge>
        </ListItemAvatar>
      )}
      {!notification.isUnRead && (
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
      )}
      <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(notification.createdAt)}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2" color="black">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src={notification.avatar} />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src={notification.avatar} />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src={notification.avatar} />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src={notification.avatar} />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
