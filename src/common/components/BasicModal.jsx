import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material'
import { useCallback, useState } from 'react'

const BasicModal = ({
  btnLayout = undefined,
  modalTitle = '',
  modalContent = '',
  modalContentArr = [],
  modalActionTxt = 'Yes',
  modalCancelTxt = 'No',
  modalActionFunc = undefined,
  modalCancelFunc = undefined,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <div>
      {btnLayout?.({
        openModal: handleOpen,
      })}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#fff',
            borderRadius: 7,
            p: '32px 56px',
            width: '35%',
            minWidth: '500px',
          }}>
          <Grid
            container
            flexDirection='column'
            flexWrap='nowrap'
            rowSpacing={2}
            sx={{ width: '100%', maxHeight: '90vh', overflow: 'hidden' }}>
            <Grid item xs sx={{ flex: '0 !important' }}>
              <Typography
                id='modal-modal-title'
                variant='h5'
                fontWeight='900'
                textAlign='center'>
                {modalTitle}
              </Typography>
            </Grid>

            <Grid item xs sx={{ flex: '0 !important' }}>
              <Typography
                id='modal-modal-description'
                variant='h6'
                fontWeight='500'
                textAlign='center'>
                {modalContent}
              </Typography>
            </Grid>

            <Grid
              item
              xs
              sx={{
                flex: '1 !important',
                height: '100%',
                overflow: 'overlay',
              }}>
              {modalContentArr.map((item, index) => (
                <Typography
                  key={`${item}-${index}`}
                  id='modal-modal-description'
                  variant='subtitle1'
                  fontWeight='500'
                  textAlign='start'>
                  {`- ${item}`}
                </Typography>
              ))}
            </Grid>

            <Grid
              item
              xs
              container
              columnSpacing={2}
              sx={{ flex: '0 !important' }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  disableElevation
                  size='medium'
                  variant='outlined'
                  onClick={() => {
                    modalCancelFunc?.()
                    handleClose()
                  }}
                  sx={{ borderRadius: 2, fontWeight: 900, fontSize: '16px' }}>
                  {modalCancelTxt}
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  disableElevation
                  size='medium'
                  variant='contained'
                  onClick={() => {
                    modalActionFunc?.()
                    handleClose()
                  }}
                  sx={{ borderRadius: 2, fontWeight: 900, fontSize: '16px' }}>
                  {modalActionTxt}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default BasicModal
