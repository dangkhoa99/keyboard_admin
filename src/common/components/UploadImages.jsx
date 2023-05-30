import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import UploadIcon from '@mui/icons-material/Upload'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import ImagePreview from './ImagePreview'

const UploadImages = ({
  disabled = false,
  links = [],
  title = 'Upload Images',
  onChange = undefined,
  onDelete = undefined,
  isSingle = false,
}) => {
  const hasImage = useMemo(() => links.length > 0, [links])
  // console.log('[hasImage]', hasImage)
  // console.log('[links]', links)

  return (
    <Paper
      variant='outlined'
      sx={{
        height: '100%',
        minHeight: '150px',
        borderStyle: 'dashed',
        borderColor: 'grey.500',
        p: 1,
      }}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='start'
        gap={1}
        flexWrap='wrap'
        sx={{ height: '100%' }}>
        {hasImage &&
          links.map((item) => (
            <ImagePreview
              key={`image-preview-${item.id}`}
              disabled={disabled}
              link={item.link}
              onDelete={() => onDelete?.(item.id)}
            />
          ))}

        <label className={`image__upload ${hasImage && 'hasImage'}`}>
          <input
            multiple={!isSingle}
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={onChange}
          />
          {hasImage ? (
            !isSingle &&
            !disabled && (
              <Grid
                container
                justifyContent='center'
                alignItems='center'
                sx={{
                  width: '150px',
                  height: '150px',
                  backgroundColor: 'grey.100',
                  borderRadius: 2,
                }}>
                <AddCircleOutlineIcon color='primary' />
              </Grid>
            )
          ) : (
            <Grid
              container
              flexDirection='column'
              rowGap={1}
              justifyContent='center'
              alignItems='center'
              sx={{ height: '100px' }}>
              <UploadIcon sx={{ color: 'grey.500', fontSize: '24px' }} />

              <Typography
                sx={{
                  color: 'grey.500',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '900',
                }}>
                {title}
              </Typography>

              <Typography
                sx={{
                  color: 'grey.400',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>
                Only JPEG, JPG and PNG file(s) with max size of 500 KB
              </Typography>
            </Grid>
          )}
        </label>
      </Stack>
    </Paper>
  )
}

export default UploadImages
