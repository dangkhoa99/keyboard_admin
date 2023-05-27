export const BASE_URL = 'http://localhost:5000/api'

export const Routes = {
  LOGIN: 'login',
  USER: 'users',
  PRODUCT: 'products',
  CATEGORY: 'categories',
  ORDER: 'orders',
}

export const RestEndpoints = {
  AUTH: 'auth',
  LOGIN: 'auth/signIn',
  WHO_AM_I: 'auth/whoAmI',
  USER: 'users',
  PRODUCT: 'products',
  CATEGORY: 'categories',
  ORDER: 'orders',
}

export const Statuses = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  APPROVED: 'APPROVED',
  COMPLETED: 'COMPLETED',
}

export const Roles = {
  SUPER_ADMIN: '99-super-admin',
  ADMIN: '98-admin',
  USER: '01-user',
}

export const TableStyle = {
  muiTablePaperProps: {
    variant: 'outlined',
    elevation: 0,
    sx: {
      width: '100%',
      height: '100%',
      overflow: 'hidden !important',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  muiTableHeadRowProps: {
    sx: { backgroundColor: 'grey.300' },
  },
  muiTableHeadCellProps: {
    sx: {
      '.Mui-TableHeadCell-Content': {
        textAlign: 'center',
        justifyContent: 'center',
        color: 'black',
        '.Mui-TableHeadCell-Content-Labels': {
          '& > span': {
            position: 'unset',
          },
          '.MuiTableSortLabel-root': {
            position: 'absolute',
            top: '0',
            bottom: '0',
          },
        },
        '.Mui-TableHeadCell-Content-Actions': {
          position: 'absolute',
          left: '1px',
        },
      },
    },
  },
  muiTableBodyCellProps: {
    sx: {
      textAlign: 'center',
      border: '1px solid',
      borderColor: 'grey.100',
    },
  },
}
