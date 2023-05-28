import Table from '@/common/components/Table'
import { RestEndpoints, StatusesColor } from '@/common/constants'
import { Box, Chip, Typography } from '@mui/material'
import { useMemo } from 'react'

const Order = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'user.name',
        header: 'Name',
        size: 160,
      },
      {
        accessorKey: 'user.email',
        header: 'Email',
        size: 160,
        enableClickToCopy: true,
      },
      {
        accessorKey: 'user.phone',
        header: 'Phone',
        size: 160,
        enableClickToCopy: true,
      },
      {
        accessorKey: 'user.address',
        header: 'Address',
        size: 320,
        Cell: ({ cell }) => (
          <Typography noWrap variant='inherit'>
            {cell.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: 'total',
        header: 'Total Price',
        size: 160,
        filterFn: 'between',
        Cell: ({ cell }) => (
          <Box>
            {cell.getValue()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 160,
        Cell: ({ cell }) => {
          const value = cell.getValue()

          return (
            <Chip
              label={value}
              size='small'
              color={value ? StatusesColor[value] : 'default'}
              sx={{ fontWeight: '900', minWidth: '100px' }}
            />
          )
        },
      },
    ],
    [],
  )

  return <Table url={RestEndpoints.ORDER} columns={columns} disabledDelete />
}

export default Order
