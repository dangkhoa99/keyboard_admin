import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'

const ImagePreview = ({ link, onDelete, disabled = false }) => {
  return (
    <Box
      sx={{
        borderRadius: '8px',
        width: '150px',
        height: '150px',
        border: '1px solid',
        borderColor: 'grey.300',
        position: 'relative',
      }}>
      {!disabled && (
        <Tooltip title='Remove' placement='bottom'>
          <IconButton
            disabled={disabled}
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={onDelete}>
            <span>
              <RemoveCircleOutlineIcon color='error' fontSize='small' />
            </span>
          </IconButton>
        </Tooltip>
      )}

      <img src={link} className='image__upload--preview' alt='preview' />
    </Box>
  )
}

export default ImagePreview
