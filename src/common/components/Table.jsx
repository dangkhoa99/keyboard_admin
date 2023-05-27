import { BASE_URL, TableStyle } from '@/common/constants'
import { loadLS } from '@/common/utils'
import { Delete, Edit } from '@mui/icons-material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Button, Grid, IconButton, Tooltip } from '@mui/material'
import axios from 'axios'
import MaterialReactTable from 'material-react-table'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicModal from './BasicModal'
import { useSnackbar } from 'notistack'

const Table = ({ url = '', columns = [], keyDelete = '_id' }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const token = useMemo(() => loadLS('token'), [])
  const [refetchDataTable, setRefetchDataTable] = useState(0)

  const [data, setData] = useState({
    list: [],
    isLoading: false,
  })

  const handleDeleteItem = useCallback((id) => {
    if (!token) {
      return
    }

    axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${url}/${id}`,
    })
      .then((res) => {
        console.log(`[DELETE] [${url}]: >>`, res.data)
        setRefetchDataTable((prev) => prev + 1)
        enqueueSnackbar('Delete Success', { variant: 'success' })
      })
      .catch((err) => {
        console.error(`[ERROR - DELETE] [${url}]: >>`, err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }

    setData((prev) => ({ ...prev, isLoading: true }))

    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${url}`,
    })
      .then((res) => {
        // console.log(`[GET] [${url}]: >>`, res.data)

        setData({ list: res.data, isLoading: false })
      })
      .catch((err) => {
        console.error(`[ERROR - GET] [${url}]: >>`, err)
      })

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchDataTable])

  return (
    <Grid container justifyContent='center' sx={{ width: '100%' }}>
      <MaterialReactTable
        getRowId={(originalRow, index) => originalRow?._id || index}
        columns={columns}
        data={data.list}
        enableRowSelection
        enableRowActions
        enableColumnFilterModes
        enableColumnOrdering
        enableColumnResizing
        enableColumnFilters
        enableStickyHeader
        enableStickyFooter
        enablePinning
        initialState={{ density: 'comfortable' }}
        state={{ isLoading: data.isLoading }}
        positionToolbarAlertBanner='bottom'
        renderRowActions={({ row, table }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}>
            <Tooltip arrow placement='left' title='Detail'>
              <IconButton onClick={() => navigate(`./${row.id}/show`)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            <Tooltip arrow placement='bottom' title='Edit'>
              <IconButton
                color='primary'
                onClick={() => navigate(`./${row.id}/edit`)}>
                <Edit />
              </IconButton>
            </Tooltip>

            <BasicModal
              modalTitle='Are you sure you want to delete this item?'
              modalContent={`Item: ${row?.original?.[keyDelete]}`}
              modalActionFunc={() => handleDeleteItem(row.id)}
              btnLayout={(props) => (
                <Tooltip arrow placement='right' title='Delete'>
                  <IconButton
                    color='error'
                    onClick={() => {
                      console.log('[CLICK] [DELETE]: >>', row)
                      props?.openModal?.()
                    }}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            />
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}>
            <Button
              disableElevation
              variant='outlined'
              color='primary'
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate('./new')}
              sx={{ fontWeight: '900', minWidth: '100px' }}>
              New
            </Button>

            <Button
              disabled
              disableElevation
              variant='outlined'
              color='error'
              startIcon={<Delete />}
              onClick={() => console.log('[CLICK] [DELETE MANY] : ')}
              sx={{ fontWeight: '900', minWidth: '100px' }}>
              Delete
            </Button>
          </Box>
        )}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            size: 160,
            muiTableHeadCellProps: { align: 'center' },
          },
        }}
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
  )
}

const MemorizedTable = memo(Table)

export default MemorizedTable
