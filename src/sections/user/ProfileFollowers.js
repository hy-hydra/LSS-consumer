import React from 'react';
import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Button, Typography, Stack, Link } from '@mui/material';
import { useTheme } from '@mui/system';
// components
import { CustomAvatar, CustomAvatarGroup } from '../../components/custom-avatar';
import Iconify from '../../components/iconify';
// hook
import useResponsive from '../../hooks/useResponsive';
// context
import { useAuthContext } from '../../auth/useAuthContext';
// axios
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};

export default function ProfileFollowers({ followers }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(1, 1fr)',
        xl: 'repeat(1, 1fr)',
      }}
      sx={{
        marginTop: {
          xs: 10,
          sm: 2,
          md: 0,
          lg: 3,
          xl: 3,
        },
        marginX: {
          xs: 0,
          sm: 0,
          md: 0,
          lg: 3,
          xl: 3,
        },
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: 480,
          xl: 480,
        },
      }}
    >
      {followers.map((follower) => (
        <FollowerCard key={follower.id} follower={follower} />
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  follower: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    followers: PropTypes.array,
    followees: PropTypes.array,
    avatar_url: PropTypes.string,
  }),
};

function FollowerCard({ follower }) {
  const { user, updateUser } = useAuthContext();
  const { username, avatar_url, followers } = follower;

  const theme = useTheme();
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  console.log('Re-render');

  let isActive;
  let isBlocked = false;
  const myFollowees = user?.followees.filter((item) => {
    if (item.followee?.id === follower.id) {
      isActive = item.is_active;
      isBlocked = item.is_deleted;
    }
    return item.is_active;
  });

  user?.followers.map((item) => {
    if (item.follower?.id === follower.id) {
      isBlocked = item.is_deleted;
    }
    return item;
  });

  const followed = Boolean(
    myFollowees?.filter((item) => item.followee?.id === follower.id && item.is_accepted)[0]
  );
  const otherFollowers = followers.filter((item) => item.is_active && item.is_accepted);

  const handleFollow = async () => {
    try {
      if (!followed && isActive === undefined) await axios.post(`/users/followees/${follower.id}`);
      else if (!followed) await axios.put(`/users/followees/${follower.id}`, { is_active: true });
      else await axios.put(`/users/followees/${follower.id}`, { is_active: false });
      updateUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
        <Stack
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <CustomAvatar
              src={avatar_url}
              alt={username}
              name={username}
              sx={{
                margin: !isDesktopN ? '0px' : 'auto !important',
                boxShadow: avatar_url
                  ? '0 4px 8px rgb(0 0 0 / 15%)'
                  : '0 4px 8px 0px rgb(0 0 0 / 61%)',
                border: avatar_url ? '1.5px solid white' : '3px solid white',
                backgroundColor: avatar_url ? 'white' : '#232323',
                color: avatar_url ? theme.palette.primary.contrastText : 'white',
                width: { zl: 60, lg: 60, md: 60, sm: 60, xs: 48 },
                height: { zl: 60, lg: 60, md: 60, sm: 60, xs: 48 },
              }}
            />
            <Box
              sx={{
                pl: 2,
                pr: 1,
                flexGrow: 1,
                minWidth: 0,
              }}
            >
              <Link
                component={NextLink}
                href={`/profile/${follower.id}`}
                sx={{ color: theme.palette.primary.contrastText }}
              >
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ fontSize: 22, fontWeight: 600, maxWidth: { xs: 130, sm: 150 } }}
                >
                  {username}
                </Typography>
              </Link>

              <Stack
                spacing={0.5}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.secondary' }}
              >
                <Typography
                  variant="body2"
                  component="span"
                  noWrap
                  sx={{ fontSize: 16, fontWeight: 800 }}
                >
                  {otherFollowers.length}
                </Typography>

                <Typography
                  variant="body2"
                  component="span"
                  noWrap
                  sx={{ fontSize: 14, fontWeight: 400 }}
                >
                  {otherFollowers.length < 2 ? 'Follower' : 'Followers'}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Button
            size="small"
            onClick={handleFollow}
            variant={followed ? 'text' : 'contained'}
            startIcon={followed && <Iconify icon="eva:checkmark-fill" />}
            sx={{
              padding: '24px',
              borderRadius: 48,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: 21,
              backgroundColor: isActive ? 'white' : '#0F172A',
              color: isActive ? '#0F172A' : 'white',
            }}
            disabled={(!followed && isActive) || isBlocked}
          >
            {isBlocked && 'Blocked'}
            {!isBlocked && followed && 'Followed'}
            {!isBlocked && !followed && isActive && 'Pending'}
            {!isBlocked && !isActive && 'Follow'}
          </Button>
        </Stack>
        <Stack>
          <CustomAvatarGroup key="medium" size="medium" max={11} countmore>
            {otherFollowers?.map((folUser, index) => (
              <CustomAvatar
                key={index}
                alt={folUser.follower.username}
                name={folUser.follower.username}
                sx={{
                  ...(!folUser.follower.avatar_url
                    ? {
                        backgroundColor: '#232323 !important',
                        color: 'white !important',
                      }
                    : {}),
                  width: { zl: 60, lg: 60, md: 60, sm: 60, xs: 48 },
                  height: { zl: 60, lg: 60, md: 60, sm: 60, xs: 48 },
                }}
                src={folUser.follower.avatar_url}
              />
            ))}
          </CustomAvatarGroup>
        </Stack>
      </Stack>
    </Card>
  );
}
