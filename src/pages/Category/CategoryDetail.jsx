import FormWrapper from '@/common/components/FormWrapper'
import Loading from '@/common/components/Loading'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultCategoryFormValue,
} from '@/common/constants'
import { loadLS } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryInput from './CategoryInput'

const CategoryDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(defaultCategoryFormValue)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = loadLS('token')

    if (!token) {
      return
    }

    setIsLoading(true)

    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.CATEGORY}/${id}`,
    })
      .then((res) => {
        // console.log(`[GET ID] [category]: >>`, res.data)
        setFormValue({
          ...res.data,
          previewImage: res.data?.image
            ? [
                {
                  ...res.data.image,
                  id: res.data.image._id,
                },
              ]
            : [],
        })
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(`[ERROR - GET ID] [category]: >>`, err)
      })

    return () => {}
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FormWrapper
      actionTxt='Edit'
      handleAction={() => navigate(`/${Routes.CATEGORY}/${id}/edit`)}
      handleCancel={() => navigate(`/${Routes.CATEGORY}`)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            Detail Category
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <CategoryInput isDetail formValue={formValue} isLoading={isLoading} />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}

export default CategoryDetail
