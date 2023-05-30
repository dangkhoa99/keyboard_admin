import UploadImages from '@/common/components/UploadImages'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { memo } from 'react'

const CategoryInput = ({
  formValue,
  onFormValueChange = undefined,
  isLoading = false,
  isDetail = false,
  isUpdate = false,
  error = undefined,
}) => {
  return (
    <Box sx={{ width: '75%', m: '0 auto' }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled={isLoading}
            required
            size='medium'
            label='Name'
            placeholder='Enter Name'
            value={formValue.name}
            onChange={(e) => onFormValueChange('name', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled={isLoading}
            multiline
            minRows={5}
            size='medium'
            label='Desciption'
            placeholder='Enter Desciption'
            value={formValue.description}
            onChange={(e) => onFormValueChange('description', e.target.value)}
            InputProps={{ readOnly: isDetail }}
          />
        </Grid>

        <Grid item xs={12}>
          {isDetail && formValue.previewImage.length === 0 ? (
            <Typography
              variant='body1'
              textAlign='start'
              sx={{ color: 'grey.600' }}>
              No Images
            </Typography>
          ) : (
            <UploadImages
              disabled={isLoading || isDetail}
              title='Upload Image'
              isSingle
              links={formValue.previewImage}
              onChange={(e) => onFormValueChange('image', e)}
              onDelete={(id) => onFormValueChange('delete', id)}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

const MemorizedCategoryInput = memo(CategoryInput, (prev, next) => {
  return (
    prev.formValue === next.formValue &&
    prev.isLoading === next.isLoading &&
    prev.error === next.error
  )
})

export default MemorizedCategoryInput
