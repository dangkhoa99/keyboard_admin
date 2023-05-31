import Table from '@/common/components/Table'
import { RestEndpoints } from '@/common/constants'
import { useMemo } from 'react'

const Category = () => {
  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Name', size: 160 },
      { accessorKey: 'description', header: 'Description', size: 320 },
    ],
    [],
  )

  return (
    <Table url={RestEndpoints.CATEGORY} columns={columns} keyDelete='name' />
  )
}

export default Category
