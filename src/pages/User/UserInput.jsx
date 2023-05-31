import { GenderArr, RoleArr } from '@/common/constants'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Alert,
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material'
import { memo, useCallback, useMemo, useState } from 'react'

const UserInput = ({
  formValue,
  onFormValueChange = undefined,
  isLoading = false,
  isDetail = false,
  isUpdate = false,
  error = undefined,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const toggleShowPassword = useCallback(() => {
    setIsShowPassword(!isShowPassword)
  }, [isShowPassword])

  const currRole = useMemo(
    () => RoleArr.find((item) => item.code === formValue.role) || null,
    [formValue.role],
  )

  const currGender = useMemo(
    () => GenderArr.find((item) => item.code === formValue.gender) || null,
    [formValue.gender],
  )

  return (
    <Box sx={{ width: '75%', m: '0 auto' }}>
      <Grid container spacing={2}>
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>{error}</Alert>
          </Grid>
        )}

        <Grid item xs={4}>
          <TextField
            fullWidth
            disabled={isLoading || isDetail || isUpdate}
            required
            size='medium'
            label='Username'
            placeholder='Enter Username'
            value={formValue.username}
            onChange={(e) => onFormValueChange('username', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            disabled={isLoading || isDetail || isUpdate}
            required
            size='medium'
            type={isShowPassword ? 'text' : 'password'}
            value={formValue.password}
            onChange={(e) => onFormValueChange('password', e.target.value)}
            label='Password'
            placeholder='Enter Password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip
                    title={isShowPassword ? 'Hide password' : 'Show password'}>
                    <span>
                      <IconButton
                        disabled={isLoading || isDetail || isUpdate}
                        onClick={toggleShowPassword}
                        edge='end'>
                        {isShowPassword ? (
                          <VisibilityOff fontSize='medium' />
                        ) : (
                          <Visibility fontSize='medium' />
                        )}
                      </IconButton>
                    </span>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            disabled={isLoading}
            required
            size='medium'
            label='Name'
            placeholder='Enter Name'
            value={formValue.name}
            onChange={(e) => onFormValueChange('name', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            disabled={isDetail}
            fullWidth
            disableClearable={!!currGender}
            value={currGender}
            options={GenderArr}
            onChange={(_, newValue) => {
              onFormValueChange('gender', newValue?.code)
            }}
            isOptionEqualToValue={(option, value) =>
              option.code === value?.code
            }
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} size='medium' label='Gender' />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            disabled={isDetail}
            fullWidth
            disableClearable={!!currRole}
            value={currRole}
            options={RoleArr}
            onChange={(_, newValue) => {
              onFormValueChange('role', newValue?.code)
            }}
            isOptionEqualToValue={(option, value) =>
              option.code === value?.code
            }
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} required size='medium' label='Role' />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            disabled={isLoading}
            size='medium'
            label='Phone Number'
            placeholder='Enter Phone Number'
            value={formValue.phone ?? ''}
            onChange={(e) => onFormValueChange('phone', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            disabled={isLoading}
            size='medium'
            label='Email'
            placeholder='email@example.com'
            value={formValue.email ?? ''}
            onChange={(e) => onFormValueChange('email', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled={isLoading}
            size='medium'
            label='Address'
            placeholder='Enter Address'
            value={formValue.address ?? ''}
            onChange={(e) => onFormValueChange('address', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

const MemorizedUserInput = memo(UserInput, (prev, next) => {
  return (
    prev.formValue === next.formValue &&
    prev.isLoading === next.isLoading &&
    prev.error === next.error
  )
})

export default MemorizedUserInput
