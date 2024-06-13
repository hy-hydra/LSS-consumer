import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/system';
import { Typography, Divider, Card, CardHeader, Pagination, CardContent } from '@mui/material';
// layouts
import useResponsive from '../../../hooks/useResponsive';
import DashboardLayout from '../../../layouts/dashboard';
import BlockedUserList from '../../../components/blocked-user-list/BlockedUserList';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

BlockedUsers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

BlockedUsers.propTypes = {
  handleAddSponsor: PropTypes.func,
};

export default function BlockedUsers({ handleAddSponsor }) {
  const { user } = useAuthContext();

  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const blockedUserList = user.followees.filter((item) => item.is_deleted);
    let newPage = page;
    if (blockedUserList) {
      const totalPage = Math.ceil(blockedUserList.length / 6);
      if (newPage > totalPage) {
        newPage = totalPage;
        setPage(totalPage);
      }
    }
    setDataList(blockedUserList?.slice((newPage - 1) * 6, (newPage - 1) * 6 + 6));
  }, [user, page]);

  const isMobile = useResponsive('down', 'sm');

  return (
    <Card
      sx={{
        boxShadow: 'none',
        maxWidth: { xl: '876px', lg: '876px', md: '100%', sm: '696px', xs: '100%' },
      }}
    >
      <CardHeader
        title={
          <Typography sx={{ fontWeight: '600', fontSize: '20px' }}>
            People that you have blocked
          </Typography>
        }
        sx={{
          padding: '0px',
          pb: '24px',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      />

      <Divider />

      <CardContent sx={{ padding: '0px', pt: '24px' }}>
        {dataList.length === 0 ? (
          <Typography sx={{ fontWeight: '400', fontSize: '16px', textAlign: 'center' }}>
            New beneficiaries that you sponsor will be displayed here.
          </Typography>
        ) : (
          <>
            <Stack>
              {dataList.map((row) => (
                <BlockedUserList key={row.id} row={row} />
              ))}
            </Stack>
            <Pagination
              shape="rounded"
              count={user.followees.length / 6}
              page={page}
              variant="outlined"
              siblingCount={isMobile ? 0 : 1}
              onChange={(event, p) => setPage(p)}
              sx={{ '& .MuiPagination-ul': { justifyContent: 'center' } }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------
