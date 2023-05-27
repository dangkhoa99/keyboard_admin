import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import { BASE_URL, RestEndpoints, Routes } from '@/common/constants'
import axios from 'axios'
import { loadLS } from '@/common/utils'
import { useSnackbar } from 'notistack'

const defaultProductFormValue = {
  name: '',
  category: '',
  quantity: 0,
  price: 0,
  description: '',
}

const ProductCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [category, setCategory] = useState({
    data: [],
    isLoading: false,
  })

  const [createLoading, setCreateLoading] = useState(false)

  const [formValue, setFormValue] = useState(defaultProductFormValue)

  const onFormValueChange = useCallback((key, value) => {
    switch (key) {
      default:
        setFormValue((prev) => ({
          ...prev,
          [key]: value,
        }))
        break
    }
  }, [])

  const clearFormValue = useCallback(() => {
    setFormValue(defaultProductFormValue)
  }, [])

  const handleSubmit = () => {
    // Validation form

    console.log('[Submit] Product: >>', formValue)

    const token = loadLS('token')

    if (!token) {
      return
    }

    setCreateLoading(true)

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.PRODUCT}`,
      data: formValue,
    })
      .then((res) => {
        console.log(`[CREATE] [product]: >>`, res.data)

        setCreateLoading(false)
        enqueueSnackbar('Create Product Success', { variant: 'success' })
        clearFormValue()
        navigate(`/${Routes.PRODUCT}`)
      })
      .catch((err) => {
        console.error(`[ERROR - CREATE] [product]: >>`, err)
      })
  }

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
    <Grid container rowSpacing={2}>
      <Grid
        item
        xs={12}
        container
        alignItems='center'
        justifyContent='space-between'>
        <Button
          disableElevation
          variant='outlined'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/${Routes.PRODUCT}`)}>
          Back
        </Button>

        <Button
          disableElevation
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleSubmit}>
          Create
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant='h4'
          fontWeight='600'
          sx={{ textTransform: 'uppercase' }}>
          New Product
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ width: '75%', m: '0 auto' }}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={createLoading}
                required
                size='medium'
                label='Name'
                placeholder='Enter Name'
                value={formValue.name}
                onChange={(e) => onFormValueChange('name', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                disabled={category.isLoading}
                fullWidth
                disableClearable={!!currCategory}
                value={currCategory}
                options={category.data}
                onChange={(_, newValue) => {
                  onFormValueChange('category', newValue?._id)
                }}
                isOptionEqualToValue={(option, value) =>
                  option._id === value?._id
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    size='medium'
                    label='Category'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={createLoading}
                size='medium'
                label='Quantity'
                placeholder='Enter Quantity'
                value={formValue.quantity}
                onChange={(e) => onFormValueChange('quantity', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={createLoading}
                size='medium'
                label='Price'
                placeholder='Enter Price'
                value={formValue.price}
                onChange={(e) => onFormValueChange('price', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={createLoading}
                multiline
                minRows={5}
                size='medium'
                label='Desciption'
                placeholder='Enter Desciption'
                value={formValue.description}
                onChange={(e) =>
                  onFormValueChange('description', e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth disabled size='medium' label='Images' />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProductCreate
