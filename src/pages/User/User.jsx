import Table from '@/common/components/Table'
import { RestEndpoints, RolesColor } from '@/common/constants'
import { Chip, Typography } from '@mui/material'
import { useMemo } from 'react'

const User = () => {
  const columns = useMemo(
    () => [
      { accessorKey: 'username', header: 'Username', size: 160 },
      { accessorKey: 'name', header: 'Name', size: 160 },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 160,
        enableClickToCopy: true,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
        Cell: ({ cell }) => (
          <Typography noWrap variant='inherit'>
            {cell.getValue()}
          </Typography>
        ),
      },

      {
        accessorKey: 'role',
        header: 'Role',
        size: 160,
        Cell: ({ cell }) => {
          const value = cell.getValue()?.split('-')[1]?.toUpperCase() ?? ''

          return (
            <Chip
              label={value}
              size='small'
              color={value ? RolesColor[value] : 'default'}
              sx={{ fontWeight: '900', minWidth: '80px' }}
            />
          )
        },
      },
    ],
    [],
  )

  return (
    <Table url={RestEndpoints.USER} columns={columns} keyDelete='username' />
  )
}

export default User
