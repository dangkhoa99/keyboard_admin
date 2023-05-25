import Table from '@/common/components/Table'
import { RestEndpoints } from '@/common/constants'
import { useMemo } from 'react'

const Category = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        size: 160,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 160,
      },
    ],
    [],
  )

  return <Table url={RestEndpoints.CATEGORY} columns={columns} />
}

export default Category
