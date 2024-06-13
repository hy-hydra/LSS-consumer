import React from 'react';
import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Button, Box, Divider, Container, Typography, Stack, Link } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
// hook
import { useAuthContext } from '../../auth/useAuthContext';
import useResponsive from '../../hooks/useResponsive';
// components
import { CustomAvatar } from '../../components/custom-avatar';
import { FollowDialog } from '../../components/dialog';
import DashboardLayout from '../../layouts/dashboard';
import EmptyContent from '../../components/empty-content';
// routes
import { PATH_PAGE } from '../../routes/paths';
// axios
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

OtherUserProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const StyledInfo = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    marginBottom: 16,
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: 32,
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: 48,
  },
  display: 'flex',
  justifyContent: 'center',
}));

export default function OtherUserProfile() {
  const theme = useTheme();

  const { user: me, updateUser } = useAuthContext();
  const {
    query: { id },
  } = useRouter();

  const [user, setUser] = React.useState({});
  const [myFollowees, setFollowees] = React.useState([]);
  const [myFollowers, setFollowers] = React.useState([]);
  const [followed, setFollowed] = React.useState(undefined);
  const [accepted, setAccepted] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(true);

  const fetchUser = React.useCallback(async () => {
    try {
      if (!id) return;
      const resData = await axios.get(`/users/${id}`);
      let block;
      setIsPrivate(resData.data.is_private);
      setFollowees(resData.data.followees.filter((item) => item.is_active && item.is_accepted));
      setFollowers(
        resData.data.followers.filter((item) => {
          if (item.follower.id === me.id) {
            setFollowed(item.is_active);
            setAccepted(item.is_accepted);
            block = item.is_deleted;
            setBlocked(block);
          }
          return item.is_active && item.is_accepted;
        })
      );
      if (!block)
        resData.data.followees.map((item) => {
          if (item.followee.id === me.id) {
            setBlocked(item.is_deleted);
          }
          return true;
        });
      setUser(resData.data);
    } catch (error) {
      console.error(error);
    }
  }, [id, me.id]);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const isEmpty = !user?.likes && !user?.likes?.length;

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [type, setType] = React.useState('Following');

  const handleOpenDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const handleBlockUser = async () => {
    try {
      if (followed === undefined) await axios.post(`/users/followees/${user.id}`);
      await axios.put(`/users/followees/${user.id}`, {
        is_active: false,
        is_deleted: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = async () => {
    try {
      if (followed === undefined) await axios.post(`/users/followees/${user.id}`);
      else if (!followed) await axios.put(`/users/followees/${user.id}`, { is_active: true });
      else await axios.put(`/users/followees/${user.id}`, { is_active: false });
      updateUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Long Story Short | Profile</title>
      </Head>

      <Container
        sx={{
          maxWidth: { xl: 1316, lg: 1232, md: 1036, sm: 648, xs: 358 },
          width: '100%',
          paddingInline: '0px !important',
        }}
      >
        {isPrivate && !accepted ? (
          <>
            <StyledInfo>
              <CustomAvatar
                src={user?.avatar_url}
                alt={user?.username}
                name={user?.username}
                sx={{
                  fontWeight: '800',
                  fontSize: '40px',
                  lineHeight: '60px',
                  color: '#475569',
                  backgroundColor: user?.avatar_url ? 'transparent' : '#F1F5F9',
                  width: 140,
                  height: 140,
                  [theme.breakpoints.down('sm')]: {
                    width: 80,
                    height: 80,
                  },
                }}
              />

              <Stack
                spacing="12px"
                sx={{
                  ml: '16px',
                  textAlign: 'left',
                  [theme.breakpoints.up('sm')]: {
                    width: '350px',
                  },
                  color: theme.palette.primary.contrastText,
                  [theme.breakpoints.down('sm')]: {
                    justifyContent: 'center',
                    flex: '1',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    sx={{
                      fontSize: '22px',
                      [theme.breakpoints.down('sm')]: { fontSize: '18px' },
                      fontWeight: '600',
                    }}
                  >
                    {user?.username}
                  </Typography>
                  {isDesktopL || isDesktopN || isTabletL || isTabletP ? (
                    <Box display="flex" gap="12px">
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: '48px',
                          [theme.breakpoints.down('sm')]: {
                            paddingY: '6px',
                            paddingX: '12px',
                          },
                          color: theme.palette.primary.contrastText,
                          borderColor: theme.palette.primary.contrastText,
                        }}
                        onClick={handleBlockUser}
                        disabled={blocked}
                      >
                        <Typography
                          sx={{
                            fontWeight: '500',
                            fontSize: '14px',
                            lineHeight: '21px',
                            [theme.breakpoints.down('sm')]: {
                              fontSize: '12px',
                              lineHeight: '18px',
                            },
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {blocked ? 'Blocked' : 'Block user'}
                        </Typography>
                      </Button>
                      {!blocked && (
                        <Button
                          variant="contained"
                          sx={{
                            borderRadius: '48px',
                            color: theme.palette.primary.light,
                            [theme.breakpoints.down('sm')]: {
                              paddingY: '6px',
                              paddingX: '12px',
                            },
                            borderColor: theme.palette.primary.contrastText,
                            backgroundColor: theme.palette.primary.contrastText,
                            ':hover': {
                              backgroundColor: theme.palette.primary.contrastText,
                            },
                          }}
                          disabled={followed && !accepted}
                          onClick={handleFollow}
                        >
                          <Typography
                            sx={{
                              fontWeight: '500',
                              fontSize: '14px',
                              lineHeight: '21px',
                              [theme.breakpoints.down('sm')]: {
                                fontSize: '12px',
                                lineHeight: '18px',
                              },
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {followed && accepted && 'Unfollow'}
                            {followed && !accepted && 'Pending'}
                            {!followed && 'Follow'}
                          </Typography>
                        </Button>
                      )}
                    </Box>
                  ) : null}
                </Box>

                {isDesktopL || isDesktopN || isTabletL || isTabletP ? (
                  <>
                    <Typography fontSize="14px">
                      Write anything here like status or type of products you like
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '4px',
                          justifyContent: 'start',
                          alignItems: 'center',
                        }}
                      >
                        <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>
                          {user?.likes?.length}
                        </Typography>
                        <Typography fontSize="14px">
                          {user?.likes?.length < 2 ? 'Product' : 'Products'}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: '4px',
                          justifyContent: 'start',
                          alignItems: 'center',
                          cursor: 'pointer',
                          borderBottom: '1px solid #000000',
                        }}
                        onClick={() => {
                          setType('Followers');
                          handleOpenDialog();
                        }}
                      >
                        <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>
                          {myFollowers?.length}
                        </Typography>
                        <Typography fontSize="14px">
                          {myFollowers?.length < 2 ? 'Follower' : 'Followers'}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: '4px',
                          justifyContent: 'start',
                          alignItems: 'center',
                          cursor: 'pointer',
                          borderBottom: '1px solid #000000',
                        }}
                        onClick={() => {
                          setType('Following');
                          handleOpenDialog();
                        }}
                      >
                        <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>
                          {myFollowees?.length}
                        </Typography>
                        <Typography fontSize="14px">
                          {myFollowees?.length < 2 ? 'Following' : 'Followings'}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : null}
              </Stack>
            </StyledInfo>

            {isMobile ? (
              <>
                <Typography fontSize="12px" mb="12px">
                  Write anything here like status or type of products you like
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '48px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      justifyContent: 'start',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>
                      {user?.likes?.length}
                    </Typography>
                    <Typography fontSize="12px">
                      {user?.likes?.length < 2 ? 'Product' : 'Products'}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      justifyContent: 'start',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: '1px solid #000000',
                    }}
                    onClick={() => {
                      setType('Followers');
                      handleOpenDialog();
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>
                      {myFollowers?.length}
                    </Typography>
                    <Typography fontSize="12px">
                      {myFollowers?.length < 2 ? 'Follower' : 'Followers'}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      justifyContent: 'start',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: '1px solid #000000',
                    }}
                    onClick={() => {
                      setType('Following');
                      handleOpenDialog();
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>
                      {myFollowees?.length}
                    </Typography>
                    <Typography fontSize="12px">
                      {myFollowees?.length < 2 ? 'Following' : 'Followings'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: '12px', mb: '24px' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: '48px',
                      [theme.breakpoints.down('sm')]: {
                        paddingY: '8px',
                        paddingX: '51px',
                        width: '100%',
                      },
                      color: theme.palette.primary.contrastText,
                      borderColor: theme.palette.primary.contrastText,
                    }}
                    onClick={handleBlockUser}
                    disabled={blocked}
                  >
                    <Typography
                      sx={{
                        fontWeight: '500',
                        fontSize: '14px',
                        lineHeight: '21px',
                        [theme.breakpoints.down('sm')]: {
                          fontSize: '14px',
                          lineHeight: '21px',
                        },
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {blocked ? 'Blocked' : 'Block user'}
                    </Typography>
                  </Button>
                  {!blocked && (
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: '48px',
                        color: theme.palette.primary.light,
                        [theme.breakpoints.down('sm')]: {
                          paddingY: '8px',
                          paddingX: '64.5px',
                          width: '100%',
                        },
                        borderColor: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.contrastText,
                        ':hover': {
                          backgroundColor: theme.palette.primary.contrastText,
                        },
                      }}
                      disabled={followed && !accepted}
                      onClick={handleFollow}
                    >
                      <Typography
                        sx={{
                          fontWeight: '500',
                          fontSize: '14px',
                          lineHeight: '21px',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {followed && accepted && 'Unfollow'}
                        {followed && !accepted && 'Pending'}
                        {!followed && 'Follow'}
                      </Typography>
                    </Button>
                  )}
                </Box>
              </>
            ) : null}

            <Divider />

            <Box
              sx={{
                mt: '48px',
                border: '1px black solid',
                borderRadius: '24px',
                width: '100%',
                textAlign: 'center',
                height: '139px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: '20px',
                  lineHeight: '30px',
                  letterSpacing: '-0.01em',
                }}
              >
                The Account is set to Private
              </Typography>
            </Box>
          </>
        ) : (
          <Stack spacing={isMobile ? 2 : 6}>
            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
              <CustomAvatar
                src={user?.avatar_url}
                alt={user?.username}
                name={user?.username}
                sx={{
                  fontWeight: '800',
                  fontSize: '40px',
                  lineHeight: '60px',
                  color: '#475569',
                  backgroundColor: user?.avatar_url ? 'transparent' : '#F1F5F9',
                  width: 140,
                  height: 140,
                  [theme.breakpoints.down('sm')]: {
                    width: 80,
                    height: 80,
                  },
                }}
              />
              <Stack
                spacing="12px"
                sx={{
                  ml: '16px',
                  textAlign: 'left',
                  [theme.breakpoints.up('sm')]: {
                    width: '350px',
                  },
                  color: theme.palette.primary.contrastText,
                  [theme.breakpoints.down('sm')]: {
                    justifyContent: 'center',
                    flex: '1',
                  },
                }}
              >
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography
                    sx={{
                      fontSize: '22px',
                      [theme.breakpoints.down('sm')]: { fontSize: '18px' },
                      fontWeight: '600',
                    }}
                  >
                    {user?.username}
                  </Typography>
                  {isDesktopL || isDesktopN || isTabletL || isTabletP ? (
                    <Box display="flex" gap="12px">
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: '48px',
                          [theme.breakpoints.down('sm')]: {
                            paddingY: '6px',
                            paddingX: '12px',
                          },
                          color: theme.palette.primary.contrastText,
                          borderColor: theme.palette.primary.contrastText,
                        }}
                        onClick={handleBlockUser}
                        disabled={blocked}
                      >
                        <Typography
                          sx={{
                            fontWeight: '500',
                            fontSize: '14px',
                            lineHeight: '21px',
                            [theme.breakpoints.down('sm')]: {
                              fontSize: '12px',
                              lineHeight: '18px',
                            },
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {blocked ? 'Blocked' : 'Block user'}
                        </Typography>
                      </Button>
                      {!blocked && (
                        <Button
                          variant="contained"
                          sx={{
                            borderRadius: '48px',
                            color: theme.palette.primary.light,
                            [theme.breakpoints.down('sm')]: {
                              paddingY: '6px',
                              paddingX: '12px',
                            },
                            borderColor: theme.palette.primary.contrastText,
                            backgroundColor: theme.palette.primary.contrastText,
                            ':hover': {
                              backgroundColor: theme.palette.primary.contrastText,
                            },
                          }}
                          disabled={followed && !accepted}
                          onClick={handleFollow}
                        >
                          <Typography
                            sx={{
                              fontWeight: '500',
                              fontSize: '14px',
                              lineHeight: '21px',
                              [theme.breakpoints.down('sm')]: {
                                fontSize: '12px',
                                lineHeight: '18px',
                              },
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {followed && accepted && 'Unfollow'}
                            {followed && !accepted && 'Pending'}
                            {!followed && 'Follow'}
                          </Typography>
                        </Button>
                      )}
                    </Box>
                  ) : null}
                </Box>

                {isDesktopL || isDesktopN || isTabletL || isTabletP ? (
                  <>
                    <Typography fontSize="14px">
                      Write anything here like status or type of products you like
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '4px',
                          justifyContent: 'start',
                          alignItems: 'center',
                        }}
                      >
                        <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>
                          {user?.likes?.length}
                        </Typography>
                        <Typography fontSize="14px">
                          {user?.likes?.length < 2 ? 'Product' : 'Products'}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: '4px',
                          justifyContent: 'start',
                          alignItems: 'center',
                          cursor: 'pointer',
                          borderBottom: '1px solid #000000',
                        }}
                        onClick={() => {
                          setType('Followers');
                          handleOpenDialog();
                        }}
                      >
                        <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>
                          {myFollowers?.length}
                        </Typography>
                        <Typography fontSize="14px">
                          {myFollowers?.length < 2 ? 'Follower' : 'Followers'}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: '4px',
                          justifyContent: 'start',
                          alignItems: 'center',
                          cursor: 'pointer',
                          borderBottom: '1px solid #000000',
                        }}
                        onClick={() => {
                          setType('Following');
                          handleOpenDialog();
                        }}
                      >
                        <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>
                          {myFollowees?.length}
                        </Typography>
                        <Typography fontSize="14px">
                          {myFollowees?.length < 2 ? 'Following' : 'Followings'}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : null}
              </Stack>
            </Stack>

            {isMobile ? (
              <>
                <Typography fontSize="12px" mb="12px">
                  Write anything here like status or type of products you like
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '48px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      justifyContent: 'start',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>
                      {user?.likes?.length}
                    </Typography>
                    <Typography fontSize="12px">
                      {user?.likes?.length < 2 ? 'Product' : 'Products'}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      justifyContent: 'start',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: '1px solid #000000',
                    }}
                    onClick={() => {
                      setType('Followers');
                      handleOpenDialog();
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>
                      {myFollowers?.length}
                    </Typography>
                    <Typography fontSize="12px">
                      {myFollowers?.length < 2 ? 'Follower' : 'Followers'}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      justifyContent: 'start',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: '1px solid #000000',
                    }}
                    onClick={() => {
                      setType('Following');
                      handleOpenDialog();
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>
                      {myFollowees?.length}
                    </Typography>
                    <Typography fontSize="12px">
                      {myFollowees?.length < 2 ? 'Following' : 'Followings'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: '12px', mb: '24px' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: '48px',
                      [theme.breakpoints.down('sm')]: {
                        paddingY: '8px',
                        paddingX: '51px',
                        width: '100%',
                      },

                      color: theme.palette.primary.contrastText,
                      borderColor: theme.palette.primary.contrastText,
                    }}
                    onClick={handleBlockUser}
                    disabled={blocked}
                  >
                    <Typography
                      sx={{
                        fontWeight: '500',
                        fontSize: '14px',
                        lineHeight: '21px',
                        [theme.breakpoints.down('sm')]: {
                          fontSize: '14px',
                          lineHeight: '21px',
                        },
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {blocked ? 'Blocked' : 'Block user'}
                    </Typography>
                  </Button>
                  {!blocked && (
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: '48px',
                        color: theme.palette.primary.light,
                        [theme.breakpoints.down('sm')]: {
                          paddingY: '8px',
                          paddingX: '64.5px',
                          width: '100%',
                        },
                        borderColor: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.contrastText,
                        ':hover': {
                          backgroundColor: theme.palette.primary.contrastText,
                        },
                      }}
                      disabled={followed && !accepted}
                      onClick={handleFollow}
                    >
                      <Typography
                        sx={{
                          fontWeight: '500',
                          fontSize: '14px',
                          lineHeight: '21px',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {followed && accepted && 'Unfollow'}
                        {followed && !accepted && 'Pending'}
                        {!followed && 'Follow'}
                      </Typography>
                    </Button>
                  )}
                </Box>
              </>
            ) : null}

            <Divider />

            {!isEmpty ? (
              <Box
                sx={{
                  rowGap: '55px',
                  columnGap: 'normal',
                  display: 'grid',
                  [theme.breakpoints.up('xl')]: {
                    rowGap: '55px',
                  },
                  [theme.breakpoints.up('lg')]: {
                    rowGap: '42px',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                  },
                  [theme.breakpoints.up('md')]: {
                    rowGap: '45px',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                  },
                  [theme.breakpoints.up('sm')]: {
                    rowGap: '53px',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                  },
                  [theme.breakpoints.up('xs')]: {
                    rowGap: '24px',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                  },
                }}
              >
                {user?.likes.map((row) => {
                  const cover = [...row.variants[0].media].sort((a, b) => a.index - b.index)[0];
                  return (
                    <Link
                      key={row.id}
                      href={PATH_PAGE.productDetails(paramCase(`${row.id}`))}
                      component={NextLink}
                    >
                      <CustomAvatar
                        src={cover.url}
                        alt={row.name}
                        name={row.name}
                        sx={{
                          margin: 'auto',
                          width: 140,
                          height: 140,
                          [theme.breakpoints.down('lg')]: {
                            width: 128,
                            height: 128,
                          },
                          [theme.breakpoints.down('sm')]: {
                            width: 100,
                            height: 100,
                          },
                          backgroundColor: 'transparent',
                          transition: '1s ease',
                          ':hover': {
                            backgroundColor: 'white',
                            border: '1px solid #41464f',
                            outline: '1px dashed #41464f',
                            outlineOffset: '8px',
                            zIndex: 99,
                            WebkitTransform: isMobile ? 'scale(1.2)' : 'scale(1.8)',
                            msTransform: isMobile ? 'scale(1.2)' : 'scale(1.8)',
                            transform: isMobile ? 'scale(1.2)' : 'scale(1.8)',
                            transition: '0.5s ease',
                            boxShadow: '0px 0px 12px #41464f',
                          },
                        }}
                      />
                    </Link>
                  );
                })}
              </Box>
            ) : (
              <EmptyContent
                title={`${user?.username} has no liked Items`}
                description={`Look like ${user?.username} has no items in  ${user?.username}'s liked item.`}
                goto={PATH_PAGE.home.root}
                img="/assets/illustrations/illustration_empty_liked_item.svg"
              />
            )}
          </Stack>
        )}
        <FollowDialog
          isOpenDialog={isOpenDialog}
          handleOpenDialog={handleOpenDialog}
          type={type}
          username={user?.username}
          userFollowingList={type === 'Following' ? myFollowees : myFollowers}
          disableButtons
        />
      </Container>
    </>
  );
}
