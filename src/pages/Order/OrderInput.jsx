import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Fragment, memo, useEffect, useMemo, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { loadLS } from '@/utils'
import axios from 'axios'
import { BASE_URL, RestEndpoints } from '@/common/constants'

const OrderInput = ({
  formValue,
  onFormValueChange = undefined,
  isLoading = false,
  isDetail = false,
  isUpdate = false,
  error = undefined,
}) => {
  const [productList, setProductList] = useState({
    data: [],
    isLoading: false,
  })

  useEffect(() => {
    const token = loadLS('token')

    if (!token) {
      return
    }

    setProductList((prev) => ({ ...prev, isLoading: true }))

    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.PRODUCT}`,
    })
      .then((res) => {
        console.log(`[GET] [product]: >>`, res.data)

        setProductList({ data: res.data, isLoading: false })
      })
      .catch((err) => {
        console.error(`[ERROR - GET] [product]: >>`, err)
      })

    return () => {}
  }, [])

  return (
    <Box sx={{ width: '75%', m: '0 auto' }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' textAlign='start' fontWeight='600'>
            Total:{' '}
            {formValue.total?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' textAlign='start' fontWeight='600'>
            Products:
            <Tooltip title='Add' placement='right'>
              <IconButton
                aria-label='new'
                size='medium'
                onClick={(e) => onFormValueChange('add', e)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>

        <Grid item xs={12} container spacing={2} alignItems='center'>
          {formValue.products?.map((item, index) => {
            const { product, quantity } = item
            return (
              <Fragment key={`product-${index}`}>
                <Grid item xs={9}>
                  <Autocomplete
                    disabled={productList.isLoading || isDetail}
                    fullWidth
                    disableClearable
                    value={
                      productList.data.find((p) => p._id === product) || null
                    }
                    options={productList.data}
                    onChange={(_, newValue) => {
                      onFormValueChange('product', {
                        e: { target: { value: newValue } },
                        index,
                      })
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value?._id
                    }
                    getOptionLabel={(option) =>
                      `${option.name} (${option.quantity})`
                    }
                    getOptionDisabled={(option) =>
                      option.quantity === 0 ||
                      formValue.products
                        .map(({ product }) => product)
                        .includes(option._id)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        size='medium'
                        label={`Product ${index + 1}`}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    size='medium'
                    label='Quantity'
                    type='number'
                    value={quantity}
                    onChange={(e) =>
                      onFormValueChange('quantity', {
                        e,
                        index,
                        max:
                          productList.data.find((p) => p._id === product)
                            ?.quantity ?? 1,
                      })
                    }
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max:
                          productList.data.find((p) => p._id === product)
                            ?.quantity ?? 1,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={1} sx={{ textAlign: 'right' }}>
                  <Tooltip title='Remove'>
                    <IconButton
                      size='medium'
                      onClick={() => onFormValueChange('remove', { index })}>
                      <RemoveCircleOutlineIcon color='error' />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Fragment>
            )
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

const MemorizedOrderInput = memo(OrderInput, (prev, next) => {
  return (
    prev.formValue === next.formValue &&
    prev.isLoading === next.isLoading &&
    prev.error === next.error
  )
})

export default MemorizedOrderInput
