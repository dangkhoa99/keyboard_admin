import UploadImages from '@/common/components/UploadImages'
import { BASE_URL, RestEndpoints } from '@/common/constants'
import { loadLS } from '@/utils'
import {
  Alert,
  Autocomplete,
  Box,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { memo, useEffect, useMemo, useState } from 'react'

const ProductInput = ({
  formValue,
  onFormValueChange = undefined,
  isLoading = false,
  isDetail = false,
  isUpdate = false,
  error = undefined,
}) => {
  const [category, setCategory] = useState({
    data: [],
    isLoading: false,
  })

  const currCategory = useMemo(
    () => category.data.find((item) => item._id === formValue.category) || null,
    [formValue.category, category.data],
  )

  useEffect(() => {
    const token = loadLS('token')

    if (!token) {
      return
    }

    setCategory((prev) => ({ ...prev, isLoading: true }))

    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.CATEGORY}`,
    })
      .then((res) => {
        // console.log(`[GET] [category]: >>`, res.data)

        setCategory({ data: res.data, isLoading: false })
      })
      .catch((err) => {
        console.error(`[ERROR - GET] [category]: >>`, err)
      })

    return () => {}
  }, [])

  return (
    <Box sx={{ width: '75%', m: '0 auto' }}>
      <Grid container rowSpacing={2}>
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>{error}</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
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

        <Grid item xs={12}>
          <Autocomplete
            disabled={category.isLoading || isDetail || isLoading}
            fullWidth
            disableClearable={!!currCategory}
            value={currCategory}
            options={category.data}
            onChange={(_, newValue) => {
              onFormValueChange('category', newValue?._id)
            }}
            isOptionEqualToValue={(option, value) => option._id === value?._id}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} required size='medium' label='Category' />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled={isLoading}
            size='medium'
            label='Quantity'
            placeholder='Enter Quantity'
            value={formValue.quantity}
            onChange={(e) => onFormValueChange('quantity', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled={isLoading}
            size='medium'
            label='Price'
            placeholder='Enter Price'
            value={formValue.price}
            onChange={(e) => onFormValueChange('price', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled={isLoading}
            multiline
            minRows={5}
            size='medium'
            label='Description'
            placeholder='Enter Description'
            value={formValue.description}
            onChange={(e) => onFormValueChange('description', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={12}>
          {isDetail && formValue.previewImages.length === 0 ? (
            <Typography
              variant='body1'
              textAlign='start'
              sx={{ color: 'grey.600' }}>
              No Images
            </Typography>
          ) : (
            <UploadImages
              disabled={isLoading || isDetail}
              links={formValue.previewImages}
              onChange={(e) => onFormValueChange('images', e)}
              onDelete={(id) => onFormValueChange('delete', id)}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

const MemorizedProductInput = memo(ProductInput, (prev, next) => {
  return (
    prev.formValue === next.formValue &&
    prev.isLoading === next.isLoading &&
    prev.error === next.error
  )
})

export default MemorizedProductInput
