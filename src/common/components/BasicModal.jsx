import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { useCallback, useState } from 'react'

const BasicModal = ({
  btnLayout = undefined,
  modalTitle = '',
  modalContent = '',
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
            p: '32px 64px',
            width: '30%',
            minWidth: '500px',
          }}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            fontWeight='900'
            textAlign='center'>
            {modalTitle}
          </Typography>

          <Typography
            id='modal-modal-description'
            variant='h6'
            fontWeight='500'
            textAlign='center'
            sx={{ mt: 4, mb: 6 }}>
            {modalContent}
          </Typography>

          <Stack gap={2} flexDirection='row-reverse'>
            <Button
              fullWidth
              disableElevation
              size='medium'
              variant='contained'
              onClick={() => {
                modalActionFunc?.()
                handleClose()
              }}
              sx={{
                borderRadius: 2,
                fontWeight: 900,
                fontSize: '16px',
              }}>
              {modalActionTxt}
            </Button>

            <Button
              fullWidth
              disableElevation
              size='medium'
              variant='outlined'
              onClick={() => {
                modalCancelFunc?.()
                handleClose()
              }}
              sx={{
                borderRadius: 2,
                fontWeight: 900,
                fontSize: '16px',
              }}>
              {modalCancelTxt}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default BasicModal
