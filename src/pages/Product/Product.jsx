import Table from '@/common/components/Table'
import { RestEndpoints } from '@/common/constants'
import { Box } from '@mui/material'
import { useMemo } from 'react'

const Product = () => {
  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Name', size: 320 },
      { accessorKey: 'description', header: 'Description', size: 320 },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 160,
        filterFn: 'between',
        Cell: ({ cell }) => (
          <Box>
            {cell.getValue()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 160,
        filterFn: 'between',
        Cell: ({ cell }) => (
          <Box>
            {cell.getValue()?.toLocaleString?.('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      { accessorKey: 'category.name', header: 'Category', size: 160 },
    ],
    [],
  )

  return (
    <Table url={RestEndpoints.PRODUCT} columns={columns} keyDelete='name' />
  )
}

export default Product
