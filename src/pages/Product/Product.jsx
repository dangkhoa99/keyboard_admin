import Table from '@/common/components/Table'
import { RestEndpoints } from '@/common/constants'
import { Box } from '@mui/material'
import { useMemo } from 'react'

const Product = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 160,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 160,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 160,
        filterFn: 'between',
        Cell: ({ cell }) => (
          <Box
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() >= 1000000
                  ? theme.palette.primary.dark
                  : theme.palette.secondary.dark,
              display: 'inline-block',
              borderRadius: 1,
              color: '#fff',
              fontWeight: '900',
              minWidth: '150px',
              p: 1,
            })}>
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
          <Box
            sx={(theme) => ({
              display: 'inline-block',
              backgroundColor:
                cell.getValue() <= 5
                  ? theme.palette.error.dark
                  : theme.palette.success.dark,
              color: '#fff',
              borderRadius: 1,
              minWidth: '50px',
              fontWeight: '900',
              p: 1,
            })}>
            {cell.getValue()?.toLocaleString?.('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 160,
      },
    ],
    [],
  )

  return <Table url={RestEndpoints.PRODUCT} columns={columns} />
}

export default Product
