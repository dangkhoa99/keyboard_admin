import {
  BASE_URL,
  RestEndpoints,
  StatusesColor,
  TableStyle,
} from '@/common/constants'
import { loadLS } from '@/utils'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import {
  Alert,
  Autocomplete,
  Box,
  Chip,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import axios from 'axios'
import MaterialReactTable from 'material-react-table'
import { Fragment, memo, useEffect, useMemo, useState } from 'react'

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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'product.name',
        header: 'Name',
        size: 500,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 160,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 160,
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
    ],
    [],
  )

  useEffect(() => {
    const token = loadLS('token')

    if (!token || isDetail || isUpdate) {
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
        // console.log(`[GET] [product]: >>`, res.data)

        setProductList({ data: res.data, isLoading: false })
      })
      .catch((err) => {
        console.error(`[ERROR - GET] [product]: >>`, err)
      })

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ width: '75%', m: '0 auto' }}>
      <Grid container rowSpacing={2}>
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>{error}</Alert>
          </Grid>
        )}

        {(isDetail || isUpdate) && (
          <Fragment>
            <Grid item xs={12} container alignItems='center'>
              <Grid item xs={1}>
                <Typography variant='h6' textAlign='start' fontWeight='600'>
                  Status:
                </Typography>
              </Grid>

              <Grid item xs={11} sx={{ textAlign: 'start' }}>
                <Chip
                  label={formValue?.status}
                  size='medium'
                  sx={{ fontWeight: '900', minWidth: '100px' }}
                  color={
                    formValue?.status
                      ? StatusesColor[formValue.status]
                      : 'default'
                  }
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container rowSpacing={1}>
              <Grid item xs={12}>
                <Typography variant='h6' textAlign='start' fontWeight='600'>
                  User Information:
                </Typography>
              </Grid>

              <Grid item xs={12} container>
                <Grid item xs={1}>
                  <Typography
                    variant='body1'
                    textAlign='start'
                    fontWeight='500'>
                    Name:
                  </Typography>
                </Grid>

                <Grid item xs={11}>
                  <Typography
                    variant='body1'
                    textAlign='start'
                    fontWeight='600'>
                    {formValue?.user?.name}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} container>
                <Grid item xs={1}>
                  <Typography
                    variant='body1'
                    textAlign='start'
                    fontWeight='500'>
                    Email:
                  </Typography>
                </Grid>

                <Grid item xs={11}>
                  <Typography
                    variant='body1'
                    textAlign='start'
                    fontWeight='600'>
                    {formValue?.user?.email}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} container>
                <Grid item xs={1}>
                  <Typography
                    variant='body1'
                    textAlign='start'
                    fontWeight='500'>
                    Phone:
                  </Typography>
                </Grid>

                <Grid item xs={11}>
                  <Typography
                    variant='body1'
                    textAlign='start'
                    fontWeight='600'>
                    {formValue?.user?.phone}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} container>
                <Grid item xs={1}>
                  <Typography
                    variant='body1'
                    textAlign='start'
                    fontWeight='500'>
                    Address:
                  </Typography>
                </Grid>

                <Grid item xs={11}>
                  <Typography
                    variant='body1'
                    textAlign='start'
                    fontWeight='600'>
                    {formValue?.user?.address}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        )}

        <Grid item xs={12} container>
          <Grid item xs={1}>
            <Typography variant='h6' textAlign='start' fontWeight='600'>
              Total:
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <Typography variant='h6' textAlign='start' fontWeight='600'>
              {formValue.total?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' textAlign='start' fontWeight='600'>
            Products:
            {!isDetail && !isUpdate && (
              <Tooltip title='Add' placement='right'>
                <IconButton
                  aria-label='new'
                  size='medium'
                  onClick={(e) => onFormValueChange('add', e)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
        </Grid>

        {isDetail || isUpdate ? (
          <Grid item xs={12}>
            <MaterialReactTable
              enableColumnActions={false}
              enableColumnFilters={false}
              enablePagination={false}
              enableSorting={false}
              enableBottomToolbar={false}
              enableTopToolbar={false}
              muiTableBodyRowProps={{ hover: false }}
              data={formValue.products}
              columns={columns}
              muiTableHeadRowProps={TableStyle.muiTableHeadRowProps}
              muiTableHeadCellProps={TableStyle.muiTableHeadCellProps}
              muiTableBodyCellProps={TableStyle.muiTableBodyCellProps}
              muiTablePaperProps={{
                variant: 'outlined',
                elevation: 0,
                sx: {
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden !important',
                  display: 'flex',
                  flexDirection: 'column',
                },
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={12} container spacing={2} alignItems='center'>
            {formValue.products?.map((item, index) => {
              const { product, quantity } = item
              return (
                <Fragment key={`product-${index}`}>
                  <Grid item xs={9}>
                    <Autocomplete
                      disabled={productList.isLoading || isDetail || isUpdate}
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
                      disabled={isDetail || isUpdate}
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

                  {!isDetail && !isUpdate && (
                    <Grid item xs={1} sx={{ textAlign: 'right' }}>
                      <Tooltip title='Remove'>
                        <IconButton
                          size='medium'
                          onClick={() =>
                            onFormValueChange('remove', { index })
                          }>
                          <RemoveCircleOutlineIcon color='error' />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  )}
                </Fragment>
              )
            })}
          </Grid>
        )}
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
