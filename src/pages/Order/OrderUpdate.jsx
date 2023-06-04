import BasicModal from '@/common/components/BasicModal'
import FormWrapper from '@/common/components/FormWrapper'
import Loading from '@/common/components/Loading'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  Statuses,
  defaultOrderFormValue,
} from '@/common/constants'
import { loadLS } from '@/utils'
import { Button, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OrderInput from './OrderInput'

const OrderUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()
  const navigate = useNavigate()
  const token = useMemo(() => loadLS('token'), [])

  const [formValue, setFormValue] = useState(defaultOrderFormValue)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const onFormValueChange = useCallback((key, value) => {
    setError(undefined)
    switch (key) {
      default:
        setFormValue((prev) => ({
          ...prev,
          [key]: value,
        }))
        break
    }
  }, [])

  const handleChangeStatusOrder = (status) => {
    if (!token) {
      return
    }

    setIsLoading(true)

    axios({
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.ORDER}/${id}/change-status`,
      data: { status: status },
    })
      .then(() => {
        // console.log(`[UPDATE STATUS] [order]: >>`, res.data)

        enqueueSnackbar(`Update Status Order: ${status}`, {
          variant: 'success',
        })
        navigate(`/${Routes.ORDER}`)
      })
      .catch((err) => {
        console.error(`[ERROR - UPDATE STATUS] [order]: >>`, err)
        setError(err?.response?.data?.message)
      })
    setIsLoading(false)
  }

  useEffect(() => {
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
      url: `${BASE_URL}/${RestEndpoints.ORDER}/${id}`,
    })
      .then((res) => {
        // console.log(`[GET ID] [order]: >>`, res.data)
        setFormValue(res.data)
      })
      .catch((err) => {
        console.error(`[ERROR - GET ID] [order]: >>`, err)
      })
    setIsLoading(false)

    return () => {}
  }, [id, token])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FormWrapper
      showActionBtn={false}
      handleAction={() => {}}
      handleCancel={() => navigate(`/${Routes.ORDER}`)}
      disabledBtn={isLoading}>
      <Grid container rowSpacing={2}>
        {formValue.status !== Statuses.CANCELLED &&
          formValue.status !== Statuses.COMPLETED && (
            <Grid
              item
              xs={12}
              container
              columnGap={2}
              justifyContent='end'
              sx={{
                flex: 0,
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'grey.300',
              }}>
              {formValue.status === Statuses.PENDING && (
                <Fragment>
                  <BasicModal
                    modalTitle='Are you sure you want CANCELLED this order?'
                    modalActionFunc={() =>
                      handleChangeStatusOrder(Statuses.CANCELLED)
                    }
                    btnLayout={(props) => (
                      <Button
                        disableElevation
                        variant='contained'
                        color={'error'}
                        onClick={() => props?.openModal?.()}
                        sx={{ minWidth: '120px', fontWeight: '900' }}>
                        {Statuses.CANCELLED}
                      </Button>
                    )}
                  />

                  <BasicModal
                    modalTitle='Are you sure you want APPROVED this order?'
                    modalActionFunc={() =>
                      handleChangeStatusOrder(Statuses.APPROVED)
                    }
                    btnLayout={(props) => (
                      <Button
                        disableElevation
                        variant='contained'
                        color={'warning'}
                        onClick={() => props?.openModal?.()}
                        sx={{
                          minWidth: '120px',
                          fontWeight: '900',
                          textDecoration: 'underline',
                          textDecorationThickness: 2,
                          '&:hover': {
                            textDecoration: 'underline',
                            textDecorationThickness: 2,
                          },
                        }}>
                        {Statuses.APPROVED}
                      </Button>
                    )}
                  />
                </Fragment>
              )}

              {formValue.status === Statuses.APPROVED && (
                <BasicModal
                  modalTitle='Are you sure you want COMPLETED this order?'
                  modalActionFunc={() =>
                    handleChangeStatusOrder(Statuses.COMPLETED)
                  }
                  btnLayout={(props) => (
                    <Button
                      disableElevation
                      variant='contained'
                      color={'success'}
                      onClick={() => props?.openModal?.()}
                      sx={{ minWidth: '120px', fontWeight: '900' }}>
                      {Statuses.COMPLETED}
                    </Button>
                  )}
                />
              )}
            </Grid>
          )}

        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            Edit Order
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <OrderInput
            isUpdate
            formValue={formValue}
            onFormValueChange={onFormValueChange}
            isLoading={isLoading}
            error={error}
          />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}

export default OrderUpdate
