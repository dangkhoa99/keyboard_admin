import { BASE_URL, TableStyle } from '@/common/constants'
import { loadLS } from '@/common/utils'
import { Delete, Edit } from '@mui/icons-material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Button, Grid, IconButton, Tooltip } from '@mui/material'
import axios from 'axios'
import MaterialReactTable from 'material-react-table'
import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Table = ({ url = '', columns = [] }) => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    list: [],
    isLoading: false,
  })

  useEffect(() => {
    const token = loadLS('token')

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
        console.log(`[GET] [${url}]: >>`, res.data)

        setData({ list: res.data, isLoading: false })
      })
      .catch((err) => {
        console.error(`[ERROR - GET] [${url}]: >>`, err)
      })

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

            <Tooltip arrow placement='left' title='Edit'>
              <IconButton onClick={() => navigate(`./${row.id}/edit`)}>
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip arrow placement='right' title='Delete'>
              <IconButton
                color='error'
                onClick={() => console.log('[CLICK] [DELETE] : ', row)}>
                <Delete />
              </IconButton>
            </Tooltip>
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
              onClick={() => navigate('./new')}>
              New
            </Button>

            <Button
              disabled
              disableElevation
              variant='outlined'
              color='error'
              startIcon={<Delete />}
              onClick={() => console.log('[CLICK] [DELETE MANY] : ')}>
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