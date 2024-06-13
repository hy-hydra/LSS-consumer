import React from 'react';
import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Button, Box, Divider, Container, Typography, Stack, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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

// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const myFollowees = user?.followees.filter(
    (item) => item.is_active && item.is_accepted && !item.is_deleted
  );
  const myFollowers = user?.followers.filter(
    (item) => item.is_active && item.is_accepted && !item.is_deleted
  );

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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '22px',
                    [theme.breakpoints.down('sm')]: { fontSize: '18px' },
                    fontWeight: '600',
                  }}
                >
                  {user?.username}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '48px',
                    paddingY: '8px',
                    paddingX: '14px',
                    [theme.breakpoints.down('sm')]: {
                      paddingY: '6px',
                      paddingX: '12px',
                    },
                    color: theme.palette.primary.contrastText,
                    borderColor: theme.palette.primary.contrastText,
                  }}
                  onClick={() => router.push(PATH_PAGE.settings.profile)}
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
                    Edit profile
                  </Typography>
                </Button>
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
                  <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>100</Typography>
                  <Typography fontSize="12px">Products</Typography>
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
                    {myFollowees.length}
                  </Typography>
                  <Typography fontSize="12px">
                    {myFollowees.length < 2 ? 'Following' : 'Followings'}
                  </Typography>
                </Box>
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
              {user?.likes &&
                user?.likes.map((row) => {
                  console.log(row);
                  const cover = [...row.product.variants[0].media].sort(
                    (a, b) => a.index - b.index
                  )[0];
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
              title="You have no liked Items"
              description="Look like you have no items in your liked item."
              goto={PATH_PAGE.home.root}
              gotoText="Get your liked items"
              img="/assets/illustrations/illustration_empty_liked_item.svg"
            />
          )}
          <FollowDialog
            isOpenDialog={isOpenDialog}
            handleOpenDialog={handleOpenDialog}
            type={type}
            userFollowingList={type === 'Following' ? myFollowees : myFollowers}
          />
        </Stack>
      </Container>
    </>
  );
}
