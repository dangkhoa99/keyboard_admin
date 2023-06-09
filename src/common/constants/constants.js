export const BASE_URL = 'http://localhost:5000/api'

export const MAX_FILE_SIZE = 512 // 500 KB

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
  CHANGE_PASSWORD: 'users/changePassword',
  PRODUCT: 'products',
  CATEGORY: 'categories',
  ORDER: 'orders',
  IMAGE: 'images',
  UPLOAD_IMAGE: 'images/uploadImage',
  UPLOAD_IMAGES: 'images/uploadImages',
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

export const StatusesColor = {
  PENDING: 'info',
  CANCELLED: 'error',
  APPROVED: 'warning',
  COMPLETED: 'success',
}

export const Roles = {
  SUPER_ADMIN: '99-super-admin',
  ADMIN: '98-admin',
  USER: '01-user',
}

export const RolesColor = {
  SUPER_ADMIN: 'info',
  ADMIN: 'success',
  USER: 'warning',
}

export const RoleArr = [
  // {code: Roles.SUPER_ADMIN, name: 'Super Admin'},
  { code: Roles.ADMIN, name: 'Admin' },
  { code: Roles.USER, name: 'User' },
]

export const Genders = {
  MALE: '01-male',
  FEMALE: '02-female',
  OTHER: '03-other',
}

export const GenderArr = [
  { code: Genders.MALE, name: 'Male' },
  { code: Genders.FEMALE, name: 'Female' },
  { code: Genders.OTHER, name: 'Other' },
]

export const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
