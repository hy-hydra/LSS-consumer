import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Button,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material/styles';
// components
import { CustomAvatar } from '../custom-avatar';
import BaseDialog from './BaseDialog';
import EmptyContent from '../empty-content';
// hook
import useResponsive from '../../hooks/useResponsive';
import { useAuthContext } from '../../auth/useAuthContext';
// axios
import axios from '../../utils/axios';

export default function FollowDialog({
  isOpenDialog,
  handleOpenDialog,
  userFollowingList,
  username = 'You',
  type,
  disableButtons = false,
}) {
  const theme = useTheme();
  const { updateUser } = useAuthContext();
  const isMobile = useResponsive('down', 'sm');
  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState(userFollowingList?.slice(0, 6));

  useEffect(() => {
    if (isOpenDialog) setPage(1);
  }, [isOpenDialog]);

  const fetchCnt = useCallback(async () => {
    let newPage = page;
    if (userFollowingList) {
      const totalPage = Math.ceil(userFollowingList.length / 6);
      if (newPage > totalPage) {
        newPage = totalPage;
        setPage(totalPage);
      }
    }
    const data = userFollowingList?.slice((newPage - 1) * 6, (newPage - 1) * 6 + 6);
    const newData =
      data &&
      (await Promise.all(
        data.map(async (item) => {
          const { data: fuser } = await axios.get(
            `/users/${type === 'Following' ? item.followee.id : item.follower.id}`
          );
          let followed = true;
          let isActive;
          let isAccepted = true;
          followed = Boolean(
            fuser.followers.filter((follow) => {
              if (follow.follower.id === item.followee.id) {
                isActive = follow.is_active;
                isAccepted = follow.is_accepted;
              }
              if (type !== 'Following')
                return follow.follower.id === item.followee.id && follow.is_active;
              return true;
            })[0]
          );
          return {
            ...item,
            followers_total_count: fuser.followers.filter((row) => row.is_active && row.is_accepted)
              .length,
            followees_total_count: fuser.followees.filter((row) => row.is_active && row.is_accepted)
              .length,
            isActive,
            followed,
            isAccepted,
          };
        })
      ));
    setDataList(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type, userFollowingList]);

  useEffect(() => {
    fetchCnt();
  }, [fetchCnt]);

  const handleFollow = async (row) => {
    const { followed } = row;
    const data = type === 'Following' ? row.followee : row.follower;
    const { isActive } = row;
    try {
      if (!followed && isActive === undefined) await axios.post(`/users/followees/${data.id}`);
      else if (!followed) await axios.put(`/users/followees/${data.id}`, { is_active: true });
      else await axios.put(`/users/followees/${data.id}`, { is_active: false });
      updateUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseDialog
      isOpenDialog={isOpenDialog}
      handleOpenDialog={handleOpenDialog}
      width={!isMobile ? '520px' : '100%'}
      radius={0}
      height="745px"
    >
      <DialogTitle
        sx={{
          paddingTop: '32px',
          paddingX: '32px',
          paddingBottom: '24px',
          fontWeight: '600',
          fontSize: '24px',
          lineHeight: '36px',
          color: theme.palette.primary.contrastText,
        }}
      >
        {type}
        <Typography
          sx={{ fontSize: '14px', lineHeight: '21px', fontWeigh: '15px', letterSpacing: '-0.01em' }}
        >
          {type === 'Following'
            ? `The people ${username} follow`
            : `The people following ${username}`}
        </Typography>
        <CloseIcon
          onClick={handleOpenDialog}
          sx={{
            width: '29px',
            height: '29px',
            position: 'absolute',
            right: 32,
            top: 32,
            borderRadius: '50%',
            padding: '5px',
            cursor: 'pointer',
            color: theme.palette.primary.contrastText,
            ':hover': {
              backgroundColor: 'rgba(71, 85, 105, 0.08)',
            },
            transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        />
      </DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: '32px',
          paddingX: '32px',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap="24px">
          <TextField
            variant="filled"
            autoCapitalize="none"
            fullWidth
            label="Search"
            sx={{
              height: '56px',
              '& .MuiInputBase-root': {
                borderRadius: '16px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {userFollowingList && dataList.length ? (
            <>
              <Stack gap="8px" minHeight="464px">
                {dataList.map((row, index) => {
                  const displayData = type === 'Following' ? row.followee : row.follower;
                  return (
                    <Box
                      key={`list-${index}`}
                      sx={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CustomAvatar
                        src={displayData.avatar_url}
                        alt={displayData.username}
                        name={displayData.username}
                        sx={{
                          boxShadow: displayData.avatar_url
                            ? '0 4px 8px rgb(0 0 0 / 15%)'
                            : '0 4px 8px 0px rgb(0 0 0 / 15%)',
                          border: displayData.avatar_url ? '1.5px solid white' : '3px solid white',
                          backgroundColor: displayData.avatar_url ? 'white' : '#232323',
                          color: displayData.avatar_url
                            ? theme.palette.primary.contrastText
                            : 'white',
                          width: 64,
                          height: 64,
                        }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          py: '9.5px',
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}>
                          <Typography
                            noWrap
                            sx={{
                              fontSize: '18px',
                              fontWeight: '600',
                              maxWidth: { xs: 130, sm: 200, md: 220, lg: 260, xl: 260 },
                            }}
                          >
                            {displayData.username}
                          </Typography>
                          <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ fontSize: '12px', fontWeight: '700' }}>
                              {row.followers_total_count}
                            </Typography>
                            &nbsp;
                            <Typography
                              sx={{ fontSize: '12px', fontWeight: '500', color: '#475569' }}
                            >
                              {row.followers_total_count < 2 ? 'followers' : 'follower'}
                            </Typography>
                          </Box>
                        </Box>
                        {!disableButtons &&
                          (type === 'Following' || row.followed ? (
                            <Button
                              variant="outlined"
                              sx={{
                                borderRadius: '48px',
                                paddingY: '10px',
                                paddingX: '18px',
                                color: theme.palette.primary.light,
                                borderColor: theme.palette.primary.contrastText,
                                backgroundColor: row.isAccepted
                                  ? theme.palette.primary.contrastText
                                  : 'white',
                                ':hover': {
                                  backgroundColor: theme.palette.primary.contrastText,
                                },
                              }}
                              onClick={() => handleFollow(row)}
                              disabled={!row.isAccepted}
                            >
                              <Typography
                                sx={{
                                  fontWeight: '400',
                                  fontSize: '14px',
                                  lineHeight: '21px',
                                  letterSpacing: '-0.02em',
                                }}
                              >
                                {row.isAccepted ? 'Unfollow' : 'Pending'}
                              </Typography>
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              sx={{
                                borderRadius: '48px',
                                paddingY: '10px',
                                paddingX: '18px',
                                color: theme.palette.primary.contrastText,
                                borderColor: theme.palette.primary.contrastText,
                              }}
                              onClick={() => handleFollow(row)}
                            >
                              <Typography
                                sx={{
                                  fontWeight: '400',
                                  fontSize: '14px',
                                  lineHeight: '21px',
                                  letterSpacing: '-0.02em',
                                }}
                              >
                                Follow
                              </Typography>
                            </Button>
                          ))}
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
              <Pagination
                shape="rounded"
                page={page}
                count={userFollowingList && Math.ceil(userFollowingList.length / 6)}
                variant="outlined"
                siblingCount={isMobile ? 0 : 1}
                sx={{ marginX: 'auto' }}
                onChange={(e, p) => {
                  setPage(p);
                }}
              />
            </>
          ) : (
            <EmptyContent
              title={`${username} has no ${type === 'Following' ? 'followings' : 'followers'}`}
              description={`Look like ${username} has no ${
                type === 'Following' ? 'followings' : 'followers'
              }.`}
              img="/assets/illustrations/illustration_empty_liked_item.svg"
            />
          )}
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

FollowDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  userFollowingList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  username: PropTypes.string,
  disableButtons: PropTypes.bool,
};
